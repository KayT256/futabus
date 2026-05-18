import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  Polyline,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
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

// Real Google Maps wayfinding for the in-bến "find your bus" experience.
//
// Architecture:
//   • The polyline through the bến is hand-crafted (sampled from satellite
//     imagery of the bến's painted parking lanes — see src/data/terminals.ts).
//     We deliberately don't use Walking Directions API here because Google
//     treats the bến as a closed property and routes around it on public
//     streets, which produced absurd "walk 4 blocks for an 80m trip" routes.
//   • A pedestrian marker animates from the entrance to the bus over ~25s,
//     using interpolateAlongPath so the marker follows the polyline lane-by-
//     lane instead of cutting straight across the lot.
//   • Two view modes the rider can flip between:
//       2D — vector satellite + polyline, zoomed to lane-level (z=19)
//       3D — photorealistic 3D tiles (gmp-map-3d) for an immersive look
//   • No-API-key fallback shows a polished iframe + setup banner.

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

// Distance (meters) at which we let the user tap "Đã tìm thấy xe". Generous
// enough to allow some GPS drift while still requiring they actually walked
// over to the parking spot.
const ARRIVED_THRESHOLD_M = 30;

// Wall-clock duration of the simulated walk from gate to bus. Real walks at
// 1.4m/s would take ~70s for a 100m path; we collapse to 25s so demos feel
// lively without skipping the "I'm following along" beat.
const WALK_DURATION_MS = 25_000;

type ViewMode = "2d" | "3d";

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

  if (!API_KEY) {
    return (
      <PageShell title="Tìm xe tại bến" backTo="/trip-progress" width="wide">
        <div className="max-w-md mx-auto space-y-4">
          <NoApiKeyNotice terminal={terminal} licensePlate={trip.licensePlate} />
          <button
            onClick={handleArrived}
            className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
          >
            [Demo] Đã tìm thấy xe
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Tìm xe tại bến" backTo="/trip-progress" width="wide">
      <div className="max-w-md mx-auto space-y-4">
        <APIProvider apiKey={API_KEY} libraries={["marker"]} language="vi" region="VN">
          <WayfindingExperience
            terminal={terminal}
            licensePlate={trip.licensePlate}
            onArrived={handleArrived}
          />
        </APIProvider>
      </div>
    </PageShell>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Main experience: animates a pedestrian marker along the static walkingPath,
// keeps live distance-to-bus, gates the "đã đến" CTA on proximity.
// ──────────────────────────────────────────────────────────────────────────
const WayfindingExperience = ({
  terminal,
  licensePlate,
  onArrived,
}: {
  terminal: TerminalLocation;
  licensePlate: string;
  onArrived: () => void;
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("2d");

  // Precompute the path profile once. Keyed by terminal so a different bến
  // re-derives correctly (rarely needed at runtime, but cheap and correct).
  const profile = useMemo(() => buildPathProfile(terminal.walkingPath), [terminal]);
  const busLoc: LatLng = profile.points[profile.points.length - 1];

  const [progress, setProgress] = useState(0);
  const [arrivedToastShown, setArrivedToastShown] = useState(false);

  // Drive the walk animation. requestAnimationFrame gives smooth 60fps motion;
  // pausing while the page is in 3D view (the user is sightseeing, not
  // walking) keeps the animation visible only when they'd benefit from it.
  useEffect(() => {
    if (viewMode !== "2d") return;
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
    // We intentionally don't depend on `progress` — that would restart the
    // RAF on every frame. Resuming from the persisted `progress` is handled
    // by the start offset on first tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, profile]);

  const userLoc = useMemo(() => interpolateAlongPath(profile, progress), [profile, progress]);

  const distanceToBus = useMemo(() => haversineMeters(userLoc, busLoc), [userLoc, busLoc]);
  const canFinish = distanceToBus < ARRIVED_THRESHOLD_M;

  // Surface a toast the moment the rider visually "arrives" so the page feels
  // alive even if they don't tap the CTA immediately.
  useEffect(() => {
    if (canFinish && !arrivedToastShown) {
      setArrivedToastShown(true);
      toast("🚌 Bạn đang đứng cạnh xe", {
        description: `Xe ${licensePlate} ở vị trí ${terminal.parkingSpot}`,
      });
    }
  }, [canFinish, arrivedToastShown, licensePlate, terminal.parkingSpot]);

  const totalDistance = profile.totalMeters;
  // A typical adult walks ~1.4 m/s; ETA = remaining meters / pace.
  const remainingSeconds = ((1 - progress) * totalDistance) / 1.4;

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
          <ViewModeToggle value={viewMode} onChange={setViewMode} />
        </div>

        <div className="relative h-[440px] bg-slate-100">
          {viewMode === "2d" ? (
            <Map2DSatellite terminal={terminal} userLoc={userLoc} busLoc={busLoc} />
          ) : (
            <Map3DSatellite terminal={terminal} busLoc={busLoc} />
          )}

          {/* Live "you are walking" indicator overlay */}
          {viewMode === "2d" && progress < 1 && (
            <div className="absolute top-3 left-3 max-w-[80%] rounded-full bg-emerald-500/95 backdrop-blur px-3 py-1.5 text-[11px] text-white shadow-md font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Đang đi tới xe · {Math.round((1 - progress) * totalDistance)}m
            </div>
          )}
          {viewMode === "2d" && progress >= 1 && (
            <div className="absolute top-3 left-3 max-w-[80%] rounded-full bg-orange-500/95 backdrop-blur px-3 py-1.5 text-[11px] text-white shadow-md font-medium flex items-center gap-2">
              ✓ Đã đến vị trí xe {licensePlate}
            </div>
          )}
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
// 2D vector satellite map with the static walking polyline + animated user.
// ──────────────────────────────────────────────────────────────────────────
const Map2DSatellite = ({
  terminal,
  userLoc,
  busLoc,
}: {
  terminal: TerminalLocation;
  userLoc: LatLng;
  busLoc: LatLng;
}) => {
  // Center the camera on the bus end so the rider can see where they're heading.
  // Zoom 19 reveals individual painted parking spaces in the satellite tiles.
  return (
    <Map
      mapId={MAP_ID}
      defaultCenter={busLoc}
      defaultZoom={19}
      mapTypeId="satellite"
      tilt={0}
      gestureHandling="greedy"
      disableDefaultUI
      zoomControl
    >
      <FitWalkingPath path={terminal.walkingPath} />
      {/* Polyline tracing the hand-crafted in-bến walking lanes */}
      <Polyline
        path={terminal.walkingPath}
        strokeColor="#f97316"
        strokeOpacity={0.95}
        strokeWeight={5}
      />
      {/* User marker — animated; uses a pulse so motion is obvious even when
          the underlying lat/lng update is sub-pixel between frames */}
      <AdvancedMarker position={userLoc} title="Bạn đang ở đây">
        <UserPulsePin />
      </AdvancedMarker>
      <AdvancedMarker position={busLoc} title={`Xe đỗ tại ${terminal.parkingSpot}`}>
        <Pin background="#f97316" borderColor="#9a3412" glyphColor="#ffffff" glyph="🚌" />
      </AdvancedMarker>
    </Map>
  );
};

// Once the map is ready, fit it to show the entire walking path with comfy
// padding — guarantees both the entrance and bus pin are framed regardless
// of how long the path is.
const FitWalkingPath = ({ path }: { path: LatLng[] }) => {
  const map = useMap();
  useEffect(() => {
    if (!map || path.length < 2) return;
    const bounds = new google.maps.LatLngBounds();
    path.forEach((p) => bounds.extend(p));
    map.fitBounds(bounds, 60);
  }, [map, path]);
  return null;
};

// ──────────────────────────────────────────────────────────────────────────
// 3D photorealistic satellite — gmp-map-3d custom element with auto-orbit.
// ──────────────────────────────────────────────────────────────────────────
const Map3DSatellite = ({
  terminal,
  busLoc,
}: {
  terminal: TerminalLocation;
  busLoc: LatLng;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const maps3dLib = useMapsLibrary("maps3d");
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (!maps3dLib || !containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    try {
      const el = document.createElement("gmp-map-3d") as HTMLElement & {
        center: { lat: number; lng: number; altitude?: number };
        range: number;
        tilt: number;
        heading: number;
        mode: string;
      };
      el.center = { ...busLoc, altitude: 0 };
      el.range = 220;
      el.tilt = 60;
      el.heading = 30;
      el.mode = "SATELLITE";
      el.setAttribute("style", "width: 100%; height: 100%; display: block;");
      container.appendChild(el);

      // Slow auto-orbit so riders can appreciate the 3D building geometry of
      // the bến without dragging.
      let raf = 0;
      let heading = 30;
      const tick = () => {
        heading = (heading + 0.15) % 360;
        el.heading = heading;
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(raf);
        container.innerHTML = "";
      };
    } catch {
      setErrored(true);
    }
  }, [maps3dLib, busLoc]);

  if (errored) {
    return (
      <div className="absolute inset-0 grid place-items-center text-center p-6">
        <div className="max-w-xs">
          <div className="text-3xl mb-2">⚠️</div>
          <div className="text-sm font-semibold text-slate-900">Không tải được bản đồ 3D</div>
          <div className="text-xs text-slate-500 mt-1 leading-relaxed">
            Kiểm tra Map Tiles API + thanh toán đã được kích hoạt cho khóa Google Maps của bạn.
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={containerRef} className="absolute inset-0" />
      {!maps3dLib && (
        <div className="absolute inset-0 grid place-items-center text-sm text-slate-500">
          Đang tải bản đồ 3D...
        </div>
      )}
      <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 backdrop-blur px-3 py-1.5 text-[11px] text-slate-700 shadow-sm border border-zinc-200">
        🧭 Đang xoay quanh vị trí <b>{terminal.parkingSpot}</b>
      </div>
    </>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Small UI primitives.
// ──────────────────────────────────────────────────────────────────────────
const ViewModeToggle = ({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) => (
  <div className="inline-flex items-center bg-slate-100 rounded-full p-0.5 text-xs font-semibold shrink-0">
    {(["2d", "3d"] as const).map((m) => (
      <button
        key={m}
        onClick={() => onChange(m)}
        className={`px-3 py-1.5 rounded-full transition ${
          value === m ? "bg-orange-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
        }`}
        aria-pressed={value === m}
      >
        {m === "2d" ? "2D" : "3D"}
      </button>
    ))}
  </div>
);

const Stat = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div>
    <div className="text-[11px] text-slate-500">{label}</div>
    <div className={`font-bold ${accent ? "text-orange-600" : "text-slate-900"}`}>{value}</div>
  </div>
);

const UserPulsePin = () => (
  <div className="relative w-4 h-4">
    <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-70" />
    <span className="absolute inset-0 rounded-full bg-blue-500 border-2 border-white shadow-md" />
  </div>
);

// ──────────────────────────────────────────────────────────────────────────
// No-API-key fallback — the page still gives the rider a usable map (free
// iframe embed) plus clear setup guidance.
// ──────────────────────────────────────────────────────────────────────────
const NoApiKeyNotice = ({
  terminal,
  licensePlate,
}: {
  terminal: TerminalLocation;
  licensePlate: string;
}) => {
  const bus = terminal.walkingPath[terminal.walkingPath.length - 1];
  const mapSrc = `https://maps.google.com/maps?q=${bus.lat},${bus.lng}&z=18&output=embed&hl=vi`;
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-zinc-200">
        <div className="font-semibold text-sm text-slate-900">{terminal.name}</div>
        <div className="text-[11px] text-slate-500">
          Tới xe {licensePlate} · vị trí {terminal.parkingSpot}
        </div>
      </div>
      <iframe
        title="Bản đồ bến xe"
        src={mapSrc}
        width="100%"
        height="320"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="px-4 py-3 text-[11px] text-amber-700 bg-amber-50 border-t border-amber-200 leading-relaxed">
        ⚙️ Để hiện bản đồ Google Maps tương tác (chỉ đường + 3D), hãy đặt
        <code className="mx-1 px-1.5 py-0.5 rounded bg-white border border-amber-200 text-amber-900">
          VITE_GOOGLE_MAPS_API_KEY
        </code>
        trong file{" "}
        <code className="mx-1 px-1.5 py-0.5 rounded bg-white border border-amber-200 text-amber-900">
          .env.local
        </code>
        rồi khởi động lại dev server.
      </div>
    </div>
  );
};
