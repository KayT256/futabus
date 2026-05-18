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
  formatDuration,
  type LatLng,
} from "@/lib/mapsHelpers";

// Hybrid Google Maps wayfinding for the in-bến "find your bus" experience.
//
// Architecture:
//   1. REAL GOOGLE DIRECTIONS (where feasible):
//      • Walking directions from user's simulated location (near terminal)
//        TO the terminal entrance via public streets.
//      • This segment uses the actual Google Directions API with travelMode: WALKING
//        and produces real turn-by-turn steps with street names.
//
//   2. ENHANCED IN-TERMINAL SIMULATION (where Google fails):
//      • Inside the terminal, Google treats it as a closed property and routes
//        AROUND it on public streets, producing absurd "walk 4 blocks for an 80m
//        trip" results. We use a hand-crafted path sampled from satellite imagery
//        of the bến's painted parking lanes (see src/data/terminals.ts).
//      • The path is enhanced with Google-Maps-style turn instructions and
//        visual polish so it looks like a seamless continuation of real directions.
//
//   3. Unified animation and turn-by-turn list that blends both segments.
//
//   4. Two view modes:
//       2D — vector satellite + polylines, zoomed to lane-level (z=19)
//       3D — photorealistic 3D tiles (gmp-map-3d) for an immersive look
//
//   5. No-API-key fallback shows a polished iframe + setup banner.

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

// Hardcoded per user spec: Simulated user location (near terminal entrance).
// This represents where the user "arrived" by taxi/grab before walking.
const SIMULATED_USER_LOCATION: LatLng = { lat: 10.74045, lng: 106.62012 }; // ~100m from Bến xe Miền Tây entrance

type DirectionsStep = {
  instruction: string;
  distance: string;
  duration: string;
  isRealGoogle: boolean;
};

type RouteSegment = {
  path: LatLng[];
  steps: DirectionsStep[];
  distanceMeters: number;
  durationSeconds: number;
  isRealGoogle: boolean;
  color: string;
};

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
        <APIProvider apiKey={API_KEY} libraries={["marker", "routes"]} language="vi" region="VN">
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
// Hybrid wayfinding: Real Google Directions (approach) + Enhanced simulation (in-terminal)
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
  const routesLib = useMapsLibrary("routes");

  // ── Real Google Directions: from simulated user location to terminal entrance ──
  const [approachSegment, setApproachSegment] = useState<RouteSegment | null>(null);
  const [isLoadingDirections, setIsLoadingDirections] = useState(true);

  const entranceLoc = terminal.walkingPath[0];
  const busLoc = terminal.walkingPath[terminal.walkingPath.length - 1];

  // Fetch real walking directions from user location to terminal entrance
  useEffect(() => {
    if (!routesLib) return;

    const directionsService = new routesLib.DirectionsService();

    directionsService.route(
      {
        origin: SIMULATED_USER_LOCATION,
        destination: entranceLoc,
        travelMode: google.maps.TravelMode.WALKING,
        language: "vi",
        region: "VN",
      },
      (result, status) => {
        setIsLoadingDirections(false);

        if (status === google.maps.DirectionsStatus.OK && result?.routes[0]) {
          const route = result.routes[0];
          const leg = route.legs[0];

          // Extract path from polyline
          const path: LatLng[] = [];
          if (route.overview_path) {
            route.overview_path.forEach((point) => {
              path.push({ lat: point.lat(), lng: point.lng() });
            });
          }

          // Build Google-Maps-style steps
          const steps: DirectionsStep[] = leg.steps.map((step) => ({
            instruction: step.instructions.replace(/<[^>]+>/g, ""), // Strip HTML tags
            distance: step.distance?.text || "",
            duration: step.duration?.text || "",
            isRealGoogle: true,
          }));

          setApproachSegment({
            path,
            steps,
            distanceMeters: leg.distance?.value || 0,
            durationSeconds: leg.duration?.value || 0,
            isRealGoogle: true,
            color: "#4285F4", // Google Maps blue
          });
        } else {
          // Fallback: straight line if directions fail
          setApproachSegment({
            path: [SIMULATED_USER_LOCATION, entranceLoc],
            steps: [{
              instruction: `Đi bộ đến ${terminal.name}`,
              distance: formatMeters(haversineMeters(SIMULATED_USER_LOCATION, entranceLoc)),
              duration: "~2 phút",
              isRealGoogle: false,
            }],
            distanceMeters: haversineMeters(SIMULATED_USER_LOCATION, entranceLoc),
            durationSeconds: 120,
            isRealGoogle: false,
            color: "#4285F4",
          });
        }
      }
    );
  }, [routesLib, entranceLoc, terminal.name]);

  // ── In-terminal segment (hand-crafted, enhanced to look like real directions) ──
  const inTerminalSegment: RouteSegment = useMemo(() => {
    // Build enhanced steps that look like Google Maps directions
    const steps: DirectionsStep[] = terminal.walkingSteps.map((step, i) => {
      const isLast = i === terminal.walkingSteps.length - 1;
      return {
        instruction: isLast
          ? `🚌 ${step.instruction}`
          : step.instruction,
        distance: step.distance,
        duration: "~" + Math.max(10, Math.round(parseInt(step.distance) / 1.4)) + " giây",
        isRealGoogle: false,
      };
    });

    return {
      path: terminal.walkingPath,
      steps,
      distanceMeters: buildPathProfile(terminal.walkingPath).totalMeters,
      durationSeconds: Math.round(buildPathProfile(terminal.walkingPath).totalMeters / 1.4),
      isRealGoogle: false,
      color: "#f97316", // FUTA orange
    };
  }, [terminal]);

  // ── Combined route for animation ──
  const combinedPath = useMemo(() => {
    if (!approachSegment) return terminal.walkingPath;
    // Avoid duplicating the entrance point
    return [...approachSegment.path, ...terminal.walkingPath.slice(1)];
  }, [approachSegment, terminal.walkingPath]);

  const combinedProfile = useMemo(() => buildPathProfile(combinedPath), [combinedPath]);

  // ── Animation state ──
  const [progress, setProgress] = useState(0);
  const [arrivedToastShown, setArrivedToastShown] = useState(false);

  // Total duration scales with total distance (approx 1.4 m/s walking speed, compressed)
  const totalDistance = combinedProfile.totalMeters;
  const totalDurationMs = Math.max(WALK_DURATION_MS, (totalDistance / 1.4) * 300); // Compressed time

  useEffect(() => {
    if (viewMode !== "2d" || !approachSegment) return;
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t - progress * totalDurationMs;
      const p = Math.min(1, (t - start) / totalDurationMs);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, combinedProfile, approachSegment]);

  const userLoc = useMemo(() => interpolateAlongPath(combinedProfile, progress), [combinedProfile, progress]);
  const distanceToBus = useMemo(() => haversineMeters(userLoc, busLoc), [userLoc, busLoc]);
  const canFinish = distanceToBus < ARRIVED_THRESHOLD_M;

  // Which segment is the user currently on?
  const approachRatio = approachSegment ? approachSegment.distanceMeters / totalDistance : 0.3;
  const isOnApproach = progress < approachRatio;
  const currentSegment = isOnApproach ? approachSegment : inTerminalSegment;

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

  const remainingDistance = (1 - progress) * totalDistance;
  const remainingSeconds = remainingDistance / 1.4;

  // Build unified step list from both segments
  const unifiedSteps = useMemo(() => {
    const approach = approachSegment?.steps || [];
    const terminal = inTerminalSegment.steps || [];
    return [
      ...approach.map((s, i) => ({ ...s, globalIndex: i, segment: "approach" as const })),
      ...terminal.map((s, i) => ({ ...s, globalIndex: approach.length + i, segment: "terminal" as const })),
    ];
  }, [approachSegment, inTerminalSegment]);

  return (
    <>
      <div className="relative bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-semibold text-sm text-slate-900 truncate">{terminal.name}</div>
            <div className="text-[11px] text-slate-500 truncate" title={terminal.address}>
              {isLoadingDirections ? "Đang tải chỉ đường..." : `${terminal.address} • ${formatMeters(totalDistance)}`}
            </div>
          </div>
          <ViewModeToggle value={viewMode} onChange={setViewMode} />
        </div>

        <div className="relative h-[440px] bg-slate-100">
          {viewMode === "2d" ? (
            <Map2DSatellite
              terminal={terminal}
              userLoc={userLoc}
              busLoc={busLoc}
              startLoc={SIMULATED_USER_LOCATION}
              approachSegment={approachSegment}
              inTerminalSegment={inTerminalSegment}
            />
          ) : (
            <Map3DSatellite terminal={terminal} busLoc={busLoc} />
          )}

          {/* Loading overlay */}
          {isLoadingDirections && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm grid place-items-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <div className="text-sm text-slate-600">Đang tính toán đường đi...</div>
                <div className="text-[10px] text-slate-400 mt-1">Google Maps Directions API</div>
              </div>
            </div>
          )}

          {/* Live "you are walking" indicator overlay */}
          {viewMode === "2d" && !isLoadingDirections && progress < 1 && (
            <div className="absolute top-3 left-3 max-w-[80%] rounded-full bg-emerald-500/95 backdrop-blur px-3 py-1.5 text-[11px] text-white shadow-md font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {isOnApproach ? "Đang đến bến" : "Trong bến"} · {Math.round(remainingDistance)}m
              {currentSegment?.isRealGoogle && <span className="ml-1 text-[9px] opacity-80">• Google Maps</span>}
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

      {/* Unified turn-by-turn directions list — combines real Google + in-terminal */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
          <div className="font-semibold text-sm text-slate-900">🧭 Hướng dẫn đi bộ</div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#4285F4]" /> Google Maps</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f97316]" /> Trong bến</span>
          </div>
        </div>
        <ol className="divide-y divide-zinc-100 max-h-[280px] overflow-y-auto">
          {unifiedSteps.map((step, idx) => {
            const totalSteps = unifiedSteps.length;
            const stepProgress = (idx + 1) / totalSteps;
            const isDone = progress >= stepProgress;
            const isActive = progress < stepProgress && progress >= idx / totalSteps;
            const isCurrent = isActive || (idx === 0 && progress === 0);

            return (
              <li key={idx} className={`px-4 py-3 flex gap-3 items-start ${isActive ? "bg-blue-50/50" : ""}`}>
                <div
                  className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold shrink-0 mt-0.5 ${
                    isDone
                      ? step.isRealGoogle ? "bg-[#4285F4] text-white" : "bg-emerald-500 text-white"
                      : isActive
                        ? step.isRealGoogle ? "bg-[#4285F4] text-white ring-2 ring-blue-200" : "bg-orange-500 text-white ring-2 ring-orange-200"
                        : step.isRealGoogle ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {isDone ? "✓" : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm leading-snug ${isDone ? "text-slate-400 line-through" : "text-slate-800"}`}>
                    {step.instruction}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-slate-500">{step.distance}</span>
                    <span className="text-[10px] text-slate-400">• {step.duration}</span>
                    {step.isRealGoogle && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">Google</span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="px-4 py-3 border-t border-zinc-100 text-[11px] text-slate-500">
          {approachSegment?.isRealGoogle
            ? `🗺️ Đoạn 1-${approachSegment.steps.length}: Chỉ đường từ Google Maps • Đoạn ${approachSegment.steps.length + 1}+: Trong bến xe`
            : `🚌 Đi qua ${terminal.pillarLandmark} → xe đỗ ở vị trí ${terminal.parkingSpot}`}
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
// 2D vector satellite map with hybrid route segments (real Google + in-terminal).
// ──────────────────────────────────────────────────────────────────────────
const Map2DSatellite = ({
  terminal,
  userLoc,
  busLoc,
  startLoc,
  approachSegment,
  inTerminalSegment,
}: {
  terminal: TerminalLocation;
  userLoc: LatLng;
  busLoc: LatLng;
  startLoc: LatLng;
  approachSegment: RouteSegment | null;
  inTerminalSegment: RouteSegment;
}) => {
  // Combined path for bounds fitting
  const combinedPath = approachSegment
    ? [...approachSegment.path, ...inTerminalSegment.path.slice(1)]
    : inTerminalSegment.path;

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
      <FitWalkingPath path={combinedPath} />

      {/* Real Google Directions segment (approach to terminal) — Blue */}
      {approachSegment && (
        <Polyline
          path={approachSegment.path}
          strokeColor={approachSegment.color}
          strokeOpacity={0.9}
          strokeWeight={6}
        />
      )}

      {/* In-terminal segment — Orange */}
      <Polyline
        path={inTerminalSegment.path}
        strokeColor={inTerminalSegment.color}
        strokeOpacity={0.95}
        strokeWeight={5}
      />

      {/* Start location marker (where user began walking) */}
      <AdvancedMarker position={startLoc} title="Vị trí bắt đầu của bạn">
        <Pin background="#4285F4" borderColor="#1a73e8" glyphColor="#ffffff" glyph="📍" />
      </AdvancedMarker>

      {/* User marker — animated along the combined path */}
      <AdvancedMarker position={userLoc} title="Bạn đang ở đây">
        <UserPulsePin />
      </AdvancedMarker>

      {/* Bus marker */}
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
