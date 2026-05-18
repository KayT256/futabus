import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useJourney } from "@/contexts/JourneyContext";
import { getTerminalByName, type TerminalLocation } from "@/data/terminals";
import { PageShell } from "@/components/PageShell";
import { formatMeters } from "@/lib/mapsHelpers";

// Static image wayfinding for the in-bến "find your bus" experience.
//
// Architecture:
//   • Uses a static satellite image (western-bus-station.png) since Google Maps
//     doesn't have direction data inside the station.
//   • Hand-crafted waypoints in image pixel coordinates that follow the actual
//     asphalt aisles between bus rows (sampled visually from the satellite image).
//   • SVG overlay draws the walking path with animation.
//   • A pedestrian marker animates from entrance to bus over ~25s.

// Distance (meters) at which we let the user tap "Đã tìm thấy xe".
const ARRIVED_THRESHOLD_M = 30;

// Wall-clock duration of the simulated walk from gate to bus.
const WALK_DURATION_MS = 25_000;

// Map image natural dimensions (used as SVG viewBox so coords map 1:1 to pixels).
const IMG_W = 1874;
const IMG_H = 1236;

// Hand-crafted walking path through Bến xe Miền Tây.
// Coordinates are in image pixel space (0..IMG_W, 0..IMG_H) and follow visible
// asphalt aisles between bus rows. Each waypoint corresponds (in order) to a
// step in terminal.walkingSteps so the textual list animates in sync.
//
// Path narrative:
//   1. Enter at "P" gate on Đ. Kinh Dương Vương (west entrance)
//   2. Walk south along the west sidewalk (avoiding the office building roof)
//   3. Round the SW corner of the office building into the parking apron
//   4. Walk east across the apron toward the central aisle
//   5. Reach the central vertical aisle between bus rows
//   6. Walk south down the central aisle
//   7. Continue south past mid-lot
//   8. Turn east into a horizontal aisle between bus rows
//   9. Walk east past several rows of parked buses
//  10. Arrive at the destination parking spot (B12)
const STATIC_WAYPOINTS: { x: number; y: number }[] = [
  { x: 310, y: 360 },   // 1. Entrance "P" gate on Kinh Dương Vương
  { x: 305, y: 470 },   // 2. South along west sidewalk
  { x: 320, y: 580 },   // 3. SW corner of office building
  { x: 460, y: 615 },   // 4. East across the parking apron
  { x: 640, y: 630 },   // 5. Approach central aisle
  { x: 770, y: 660 },   // 6. Enter central vertical aisle
  { x: 780, y: 820 },   // 7. South through mid-lot
  { x: 800, y: 940 },   // 8. Turn point — south end of central aisle
  { x: 980, y: 945 },   // 9. East into horizontal row-aisle
  { x: 1160, y: 920 },  // 10. East past bus rows
  { x: 1240, y: 870 },  // 11. Arrive at parking spot
];

// Compute total path length in pixels for progress interpolation.
function buildPixelPathProfile(waypoints: { x: number; y: number }[]) {
  const segs: { from: { x: number; y: number }; to: { x: number; y: number }; len: number }[] = [];
  let total = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    const dx = waypoints[i + 1].x - waypoints[i].x;
    const dy = waypoints[i + 1].y - waypoints[i].y;
    const len = Math.hypot(dx, dy);
    segs.push({ from: waypoints[i], to: waypoints[i + 1], len });
    total += len;
  }
  return { segs, total };
}

// Interpolate a point along the pixel path at progress 0..1.
function interpolatePixelPath(
  profile: ReturnType<typeof buildPixelPathProfile>,
  progress: number,
): { x: number; y: number } {
  const target = Math.max(0, Math.min(1, progress)) * profile.total;
  let cumulative = 0;
  for (const seg of profile.segs) {
    if (cumulative + seg.len >= target) {
      const localT = (target - cumulative) / seg.len;
      return {
        x: seg.from.x + (seg.to.x - seg.from.x) * localT,
        y: seg.from.y + (seg.to.y - seg.from.y) * localT,
      };
    }
    cumulative += seg.len;
  }
  return profile.segs[profile.segs.length - 1].to;
}

export const TerminalMap = () => {
  const navigate = useNavigate();
  const { activeJourney, setFoundBusAtTerminal } = useJourney();

  useEffect(() => {
    if (!activeJourney) navigate("/", { replace: true });
  }, [activeJourney, navigate]);

  if (!activeJourney) return null;
  const terminal = getTerminalByName(activeJourney.booking.trip.pickupTerminal);
  const { trip } = activeJourney.booking;

  const handleArrived = () => {
    setFoundBusAtTerminal(true);
    toast.success("Đã tìm thấy xe của bạn", {
      description: "Đưa mã QR vé cho nhân viên kiểm tra",
    });
    navigate("/trip-progress");
  };

  return (
    <PageShell title="Tìm xe tại bến" backTo="/trip-progress" width="wide">
      <div className="max-w-md mx-auto space-y-4">
        <StaticWayfindingExperience
          terminal={terminal}
          licensePlate={trip.licensePlate}
          onArrived={handleArrived}
        />
      </div>
    </PageShell>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Static image wayfinding with SVG overlay.
// ──────────────────────────────────────────────────────────────────────────
const StaticWayfindingExperience = ({
  terminal,
  licensePlate,
  onArrived,
}: {
  terminal: TerminalLocation;
  licensePlate: string;
  onArrived: () => void;
}) => {
  // Pixel-based path profile sampled from the static satellite image.
  const profile = useMemo(() => buildPixelPathProfile(STATIC_WAYPOINTS), []);
  const busPos = STATIC_WAYPOINTS[STATIC_WAYPOINTS.length - 1];
  const startPos = STATIC_WAYPOINTS[0];

  const [progress, setProgress] = useState(0);
  const [arrivedToastShown, setArrivedToastShown] = useState(false);

  // Drive the walk animation with requestAnimationFrame.
  useEffect(() => {
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t - progress * WALK_DURATION_MS;
      const p = Math.min(1, (t - start) / WALK_DURATION_MS);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  // Approximate scale: the bến is ~200m wide; image is 1874px → ~0.11 m/px.
  // We use this to convert pixel distances to meters for the user-facing UI.
  const PX_PER_METER = 9;
  const userPos = useMemo(() => interpolatePixelPath(profile, progress), [profile, progress]);
  const pixelToBus = Math.hypot(userPos.x - busPos.x, userPos.y - busPos.y);
  const distanceToBus = pixelToBus / PX_PER_METER;
  const canFinish = distanceToBus < ARRIVED_THRESHOLD_M;

  // Toast on arrival.
  useEffect(() => {
    if (canFinish && !arrivedToastShown) {
      setArrivedToastShown(true);
      toast("🚌 Bạn đang đứng cạnh xe", {
        description: `Xe ${licensePlate} ở vị trí ${terminal.parkingSpot}`,
      });
    }
  }, [canFinish, arrivedToastShown, licensePlate, terminal.parkingSpot]);

  const totalDistance = profile.total / PX_PER_METER;
  const remainingSeconds = ((1 - progress) * totalDistance) / 1.4;

  // Build SVG path string directly from pixel waypoints.
  const svgPathD = useMemo(
    () => `M ${STATIC_WAYPOINTS.map((p) => `${p.x} ${p.y}`).join(" L ")}`,
    [],
  );

  return (
    <>
      <div className="relative bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-semibold text-sm text-slate-900 truncate">{terminal.name}</div>
            <div className="text-[11px] text-slate-500 truncate" title={terminal.address}>
              {terminal.address}
            </div>
          </div>
          <div className="text-[10px] bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
            Bản đồ tĩnh
          </div>
        </div>

        <div className="relative h-[440px] bg-slate-100 overflow-hidden">
          {/* Static satellite image */}
          <img
            src="/western-bus-station.png"
            alt="Bến xe Miền Tây"
            className="w-full h-full object-cover"
          />

          {/* SVG Overlay with walking path. ViewBox matches the natural image
              dimensions so our pixel-coordinate waypoints map 1:1. */}
          <svg
            viewBox={`0 0 ${IMG_W} ${IMG_H}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* White outer halo for path readability over satellite imagery */}
            <path
              d={svgPathD}
              fill="none"
              stroke="white"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
            />
            {/* Remaining path (light orange, dashed, the part user hasn't walked yet) */}
            <path
              d={svgPathD}
              fill="none"
              stroke="#fdba74"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="14 12"
              opacity="0.95"
            />
            {/* Walked portion of the path (solid orange) — drawn using
                stroke-dasharray trick to reveal up to current progress. */}
            <path
              d={svgPathD}
              fill="none"
              stroke="#f97316"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${progress * profile.total} ${profile.total}`}
            />

            {/* Waypoint dots at each turn so the user can see the route logic */}
            {STATIC_WAYPOINTS.map((wp, i) => (
              <circle
                key={i}
                cx={wp.x}
                cy={wp.y}
                r="6"
                fill="#fff"
                stroke="#f97316"
                strokeWidth="2"
              />
            ))}

            {/* Bus marker (destination) */}
            <g transform={`translate(${busPos.x}, ${busPos.y})`}>
              <circle r="36" fill="#f97316" opacity="0.3">
                <animate attributeName="r" values="36;48;36" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="22" fill="#f97316" stroke="white" strokeWidth="3" />
              <text y="8" textAnchor="middle" fontSize="24">🚌</text>
            </g>

            {/* User marker (animated position) */}
            <g transform={`translate(${userPos.x}, ${userPos.y})`}>
              <circle r="28" fill="#10b981" opacity="0.25">
                <animate attributeName="r" values="28;36;28" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle r="18" fill="#10b981" stroke="white" strokeWidth="3" />
              <text y="6" textAnchor="middle" fontSize="20">👤</text>
            </g>

            {/* Entrance marker (start point) */}
            <g transform={`translate(${startPos.x}, ${startPos.y})`}>
              <circle r="14" fill="#3b82f6" stroke="white" strokeWidth="3" />
              <text y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">P</text>
              <rect x="-40" y="-46" width="80" height="22" rx="4" fill="#1e40af" opacity="0.9" />
              <text y="-30" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Cổng vào</text>
            </g>
          </svg>

          {/* Walking indicator overlay */}
          {progress < 1 && (
            <div className="absolute top-3 left-3 max-w-[80%] rounded-full bg-emerald-500/95 backdrop-blur px-3 py-1.5 text-[11px] text-white shadow-md font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Đang đi tới xe · {Math.round((1 - progress) * totalDistance)}m
            </div>
          )}
          {progress >= 1 && (
            <div className="absolute top-3 left-3 max-w-[80%] rounded-full bg-orange-500/95 backdrop-blur px-3 py-1.5 text-[11px] text-white shadow-md font-medium flex items-center gap-2">
              ✓ Đã đến vị trí xe {licensePlate}
            </div>
          )}

          {/* Legend overlay */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur rounded-lg px-3 py-2 shadow-md text-[10px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-1 bg-orange-500 rounded"></span>
              <span>Đường đi</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>Bạn</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span>Xe {licensePlate}</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-zinc-200 flex items-center justify-between bg-orange-50/50">
          <Stat label="Khoảng cách" value={formatMeters(distanceToBus)} />
          <Stat label="Đi bộ" value={canFinish ? "Đã đến" : `~${Math.max(1, Math.round(remainingSeconds))}s`} />
          <Stat label="Vị trí xe" value={terminal.parkingSpot} accent />
        </div>
      </div>

      {/* Hand-crafted turn list — rendered straight from terminals.ts so the
          steps stay in sync with the polyline waypoints. */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-zinc-200 font-semibold text-sm text-slate-900">
          🧭 Hướng dẫn đi bộ trong bến
        </div>
        <ol className="divide-y divide-zinc-100">
          {terminal.walkingSteps.map((step, i) => {
            // Highlight the step the user is currently on, so the textual list
            // animates in sync with the marker on the map.
            const stepFraction = (i + 1) / terminal.walkingSteps.length;
            const isActive = progress < stepFraction && progress >= i / terminal.walkingSteps.length;
            const isDone = progress >= stepFraction;
            return (
              <li key={i} className={`px-4 py-3 flex gap-3 items-start ${isActive ? "bg-orange-50" : ""}`}>
                <div
                  className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold shrink-0 mt-0.5 ${
                    isDone
                      ? "bg-emerald-500 text-white"
                      : isActive
                        ? "bg-orange-500 text-white"
                        : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {isDone ? "✓" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm leading-snug ${isDone ? "text-slate-400 line-through" : "text-slate-800"}`}>
                    {step.instruction}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{step.distance}</div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="px-4 py-3 border-t border-zinc-100 text-[11px] text-slate-500">
          Đi qua {terminal.pillarLandmark} → xe đỗ ở vị trí <b>{terminal.parkingSpot}</b>
        </div>
      </div>

      <button
        onClick={onArrived}
        disabled={!canFinish}
        className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold disabled:bg-orange-200 hover:bg-orange-600 transition"
      >
        {canFinish ? "✓ Đã tìm thấy xe — Lên xe" : `Còn ${formatMeters(distanceToBus)} nữa...`}
      </button>
      <button onClick={onArrived} className="w-full text-xs text-slate-500 underline">
        [Demo] Bỏ qua &amp; đã tìm thấy
      </button>
    </>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Small UI primitives.
// ──────────────────────────────────────────────────────────────────────────
const Stat = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div>
    <div className="text-[11px] text-slate-500">{label}</div>
    <div className={`font-bold ${accent ? "text-orange-600" : "text-slate-900"}`}>{value}</div>
  </div>
);
