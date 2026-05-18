import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useJourney } from "@/contexts/JourneyContext";
import { getTerminalByName, type TerminalLocation } from "@/data/terminals";
import { PageShell } from "@/components/PageShell";
import {
  buildPathProfile,
  haversineMeters,
  interpolateAlongPath,
  formatMeters,
  type LatLng,
} from "@/lib/mapsHelpers";

// Static image wayfinding for the in-bến "find your bus" experience.
//
// Architecture:
//   • Uses a static satellite image (western-bus-station.png) since Google Maps
//     doesn't have direction data inside the station.
//   • SVG overlay draws the walking path with animation.
//   • A pedestrian marker animates from entrance to bus over ~25s.
//   • The path is normalized to image coordinates (0-1000 x 0-1000)
//     for responsive SVG overlay.

// Distance (meters) at which we let the user tap "Đã tìm thấy xe".
const ARRIVED_THRESHOLD_M = 30;

// Wall-clock duration of the simulated walk from gate to bus.
const WALK_DURATION_MS = 25_000;

// Map image dimensions (viewBox)
const VIEWBOX_W = 1000;
const VIEWBOX_H = 600;

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
  // Precompute the path profile once.
  const profile = useMemo(() => buildPathProfile(terminal.walkingPath), [terminal]);
  const busLoc: LatLng = profile.points[profile.points.length - 1];

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

  const userLoc = useMemo(() => interpolateAlongPath(profile, progress), [profile, progress]);
  const distanceToBus = useMemo(() => haversineMeters(userLoc, busLoc), [userLoc, busLoc]);
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

  const totalDistance = profile.totalMeters;
  const remainingSeconds = ((1 - progress) * totalDistance) / 1.4;

  // Convert lat/lng path to SVG viewBox coordinates.
  // We normalize the path to fit within VIEWBOX_W x VIEWBOX_H.
  const pathBounds = useMemo(() => {
    const lats = terminal.walkingPath.map((p) => p.lat);
    const lngs = terminal.walkingPath.map((p) => p.lng);
    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [terminal.walkingPath]);

  const latLngToSvg = (loc: LatLng) => {
    const { minLat, maxLat, minLng, maxLng } = pathBounds;
    const padding = 50; // Padding around the path
    const x = padding + ((loc.lng - minLng) / (maxLng - minLng)) * (VIEWBOX_W - 2 * padding);
    const y = VIEWBOX_H - (padding + ((loc.lat - minLat) / (maxLat - minLat)) * (VIEWBOX_H - 2 * padding));
    return { x, y };
  };

  // Build SVG path string from walking path.
  const svgPathD = useMemo(() => {
    if (terminal.walkingPath.length === 0) return "";
    const points = terminal.walkingPath.map(latLngToSvg);
    return `M ${points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")}`;
  }, [terminal.walkingPath]);

  // User position in SVG coords.
  const userSvg = latLngToSvg(userLoc);
  const busSvg = latLngToSvg(busLoc);

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

        <div className="relative h-[340px] bg-slate-100 overflow-hidden">
          {/* Static satellite image */}
          <img
            src="/western-bus-station.png"
            alt="Bến xe Miền Tây"
            className="w-full h-full object-cover"
          />

          {/* SVG Overlay with walking path */}
          <svg
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Walking path polyline */}
            <path
              d={svgPathD}
              fill="none"
              stroke="#f97316"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />

            {/* Path shadow for better visibility */}
            <path
              d={svgPathD}
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />

            {/* Bus marker (destination) */}
            <g transform={`translate(${busSvg.x}, ${busSvg.y})`}>
              <circle r="18" fill="#f97316" opacity="0.3">
                <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="12" fill="#f97316" stroke="white" strokeWidth="2" />
              <text y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">🚌</text>
            </g>

            {/* User marker (animated position) */}
            <g transform={`translate(${userSvg.x}, ${userSvg.y})`}>
              <circle r="14" fill="#10b981" stroke="white" strokeWidth="2" />
              <text y="4" textAnchor="middle" fill="white" fontSize="12">👤</text>
            </g>

            {/* Entrance marker (start point) */}
            {terminal.walkingPath.length > 0 && (() => {
              const start = latLngToSvg(terminal.walkingPath[0]);
              return (
                <g transform={`translate(${start.x}, ${start.y})`}>
                  <circle r="8" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <text y="-12" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Cổng vào</text>
                </g>
              );
            })()}
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
