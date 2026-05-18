import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useJourney } from "@/contexts/JourneyContext";
import { PageShell } from "@/components/PageShell";
import {
  buildPathProfile,
  formatDuration,
  formatMeters,
  googlePathToLatLng,
  haversineMeters,
  interpolateAlongPath,
  type LatLng,
  type PathProfile,
} from "@/lib/mapsHelpers";

// FUTA Rada — track the FUTA shuttle bus heading to pick the user up.
//
// Architecture (rewritten 2026-05):
//   • Real Google Maps satellite + roads view (no more iframe stub).
//   • The shuttle's office is fixed: Bến Xe Ngã Tư Ga on QL1A in Q.12 — a
//     real FUTA dispatch hub. Coordinates are seeded but also re-verified by
//     the Geocoder so the marker lands on the actual office building.
//   • The user's pickup defaults to UEH Campus B (279 Nguyễn Tri Phương,
//     Q.10) and can be changed via a booking-style picker sheet that
//     combines curated suggestions + Places Autocomplete.
//   • DirectionsService computes a real DRIVING route. The shuttle marker
//     interpolates along the route's overview_path at constant ground speed
//     using the shared mapsHelpers utilities.
//   • The pickup-info card mirrors the booking page's "Thông tin đón trả"
//     UI so the rider sees the same chrome they're used to.
//   • The iconic radar circle stays as a compact branded chip — it's part
//     of the FUTA Rada identity even though the live map is now the source
//     of truth for "where is my shuttle".

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

// Total wall-clock animation from origin → user, in milliseconds. A real
// shuttle on this corridor takes 20–40 minutes; we collapse to ~50s so the
// demo feels lively without skipping the "I can see it approaching" beat.
const ANIMATION_DURATION_MS = 50_000;

// Mark the shuttle as "arrived" once it's within this many meters of the
// pickup pin. Generous because Google's snap-to-road can produce 10-15m
// drift between the marker and the actual destination.
const ARRIVED_THRESHOLD_M = 35;

// ──────────────────────────────────────────────────────────────────────────
// Static data: the dispatch hub + the curated pickup suggestions.
// ──────────────────────────────────────────────────────────────────────────

interface PickupLocation {
  // Full address — used as the geocoder seed and shown as the secondary line.
  address: string;
  // Big bold name — the part the user actually recognizes ("UEH Campus B").
  shortLabel: string;
  // Secondary line in the picker UI — usually the district/landmark.
  description: string;
  // Hardcoded fallback coordinates. When real geocoding succeeds we replace
  // these with the verified result; if it fails (network down, quota), the
  // fallback keeps the demo working.
  fallbackCoord: LatLng;
}

// Bến Xe Ngã Tư Ga — the shuttle dispatch office on QL1A in Q.12. This is
// where the FUTA shuttle bus actually starts its run before going to fetch
// the rider. Coordinates from satellite imagery of the bus depot.
const SHUTTLE_OFFICE = {
  name: "Bến Xe Ngã Tư Ga",
  address: "Bến Xe Ngã Tư Ga, Quốc lộ 1A, Thạnh Lộc, Quận 12, Hồ Chí Minh, Vietnam",
  fallbackCoord: { lat: 10.86879, lng: 106.66437 },
};

// Default rider pickup — UEH Campus B per the user's spec.
const DEFAULT_PICKUP: PickupLocation = {
  address: "279 Nguyễn Tri Phương, Phường 5, Quận 10, Hồ Chí Minh, Vietnam",
  shortLabel: "UEH Campus B",
  description: "279 Nguyễn Tri Phương, Phường 5, Quận 10",
  fallbackCoord: { lat: 10.7596, lng: 106.6627 },
};

// Curated suggestions in the picker. Mirrors the booking flow's "Tìm kiếm
// gần đây" pattern — the rider can pick a familiar landmark without typing.
const SUGGESTED_PICKUPS: PickupLocation[] = [
  DEFAULT_PICKUP,
  {
    address: "72 Lê Thánh Tôn, Bến Nghé, Quận 1, Hồ Chí Minh, Vietnam",
    shortLabel: "Vincom Đồng Khởi",
    description: "72 Lê Thánh Tôn, Q.1",
    fallbackCoord: { lat: 10.77758, lng: 106.7012 },
  },
  {
    address: "Sân bay Tân Sơn Nhất, Trường Sơn, Tân Bình, Hồ Chí Minh, Vietnam",
    shortLabel: "Sân bay Tân Sơn Nhất",
    description: "Ga đến quốc nội, Tân Bình",
    fallbackCoord: { lat: 10.81883, lng: 106.65186 },
  },
  {
    address: "101 Tôn Dật Tiên, Tân Phú, Quận 7, Hồ Chí Minh, Vietnam",
    shortLabel: "Crescent Mall",
    description: "Q.7 — Phú Mỹ Hưng",
    fallbackCoord: { lat: 10.72917, lng: 106.7186 },
  },
];

// ──────────────────────────────────────────────────────────────────────────
// Top-level page shell — handles env-key fallback + APIProvider boundary.
// ──────────────────────────────────────────────────────────────────────────

export const FutaRada = () => {
  const navigate = useNavigate();
  const { activeJourney, setPhase } = useJourney();

  useEffect(() => {
    if (!activeJourney) navigate("/", { replace: true });
  }, [activeJourney, navigate]);

  if (!activeJourney) return null;

  const handleArrived = () => {
    setPhase("shuttle_onboard");
    toast.success("Đã lên xe trung chuyển");
    navigate("/trip-progress");
  };

  if (!API_KEY) {
    return (
      <PageShell title="FUTA Rada" backTo="/trip-progress" width="wide">
        <div className="max-w-md mx-auto space-y-4">
          <NoApiKeyNotice />
          <button
            onClick={handleArrived}
            className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
          >
            [Demo] Đã lên xe trung chuyển
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="FUTA Rada" backTo="/trip-progress" width="wide">
      <div className="max-w-md mx-auto space-y-4">
        <APIProvider
          apiKey={API_KEY}
          libraries={["routes", "marker", "places", "geocoding"]}
          language="vi"
          region="VN"
        >
          <RadaExperience onArrived={handleArrived} />
        </APIProvider>
      </div>
    </PageShell>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Main experience: pickup picker, geocoding, directions, animated bus.
// ──────────────────────────────────────────────────────────────────────────

const RadaExperience = ({ onArrived }: { onArrived: () => void }) => {
  const [pickup, setPickup] = useState<PickupLocation>(DEFAULT_PICKUP);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Geocoded coordinates — start with the hardcoded fallbacks so the map
  // never renders empty, then upgrade once the Geocoder responds.
  const [originLoc, setOriginLoc] = useState<LatLng>(SHUTTLE_OFFICE.fallbackCoord);
  const [pickupLoc, setPickupLoc] = useState<LatLng>(DEFAULT_PICKUP.fallbackCoord);
  const [pathProfile, setPathProfile] = useState<PathProfile | null>(null);

  const [progress, setProgress] = useState(0);
  const [arrivedToastShown, setArrivedToastShown] = useState(false);

  // Bus position derived from progress + route. Falls back to origin while
  // directions are still loading so the bus pin doesn't disappear mid-render.
  const busLoc = useMemo<LatLng>(() => {
    if (!pathProfile) return originLoc;
    return interpolateAlongPath(pathProfile, progress);
  }, [pathProfile, progress, originLoc]);

  const distanceMeters = useMemo(
    () => haversineMeters(busLoc, pickupLoc),
    [busLoc, pickupLoc],
  );

  // Live ETA: remaining route distance / average speed (where avg = total /
  // animation duration in m/s). Stays consistent with the visible motion.
  const etaSeconds = useMemo(() => {
    if (!pathProfile || pathProfile.totalMeters === 0) return 0;
    const remaining = pathProfile.totalMeters * (1 - progress);
    const avgMps = pathProfile.totalMeters / (ANIMATION_DURATION_MS / 1000);
    return avgMps > 0 ? remaining / avgMps : 0;
  }, [pathProfile, progress]);

  const arrived = pathProfile !== null && distanceMeters <= ARRIVED_THRESHOLD_M;

  // Drive the animation. requestAnimationFrame loop ticks `progress` 0→1
  // over ANIMATION_DURATION_MS, then stops naturally at p=1.
  useEffect(() => {
    if (!pathProfile) return;
    let raf = 0;
    let start = 0;
    setProgress(0);
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / ANIMATION_DURATION_MS);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathProfile]);

  // Helpful narrative toasts at milestones — keeps the wait feeling active.
  useEffect(() => {
    if (arrived && !arrivedToastShown) {
      setArrivedToastShown(true);
      toast.success("🚐 Xe trung chuyển đã đến!", {
        description: "Tài xế đang chờ bạn tại điểm đón",
      });
    }
  }, [arrived, arrivedToastShown]);

  const handlePickupChange = (next: PickupLocation) => {
    setPickup(next);
    setPickerOpen(false);
    // Reset everything that depends on the pickup point so the new route
    // animates fresh from the office instead of resuming mid-way.
    setPickupLoc(next.fallbackCoord);
    setPathProfile(null);
    setProgress(0);
    setArrivedToastShown(false);
  };

  return (
    <>
      {/* Pickup info card — visual style mirrors the booking page's
          "Thông tin đón trả" so the rider sees familiar chrome. */}
      <PickupInfoCard pickup={pickup} onEdit={() => setPickerOpen(true)} />

      {/* Compact branded radar — the FUTA Rada signature mark. */}
      <CompactRadar progress={progress} arrived={arrived} />

      {/* Real Google Maps — satellite/hybrid with shuttle animation. */}
      <div className="relative bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-semibold text-sm text-slate-900">Vị trí xe trung chuyển</div>
            <div className="text-[11px] text-slate-500 truncate">
              {SHUTTLE_OFFICE.name} → {pickup.shortLabel}
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live GPS
          </span>
        </div>

        <div className="relative h-[440px] bg-slate-100">
          <RadaMap
            originLoc={originLoc}
            pickupLoc={pickupLoc}
            busLoc={busLoc}
            originAddress={SHUTTLE_OFFICE.address}
            pickupAddress={pickup.address}
            onOriginGeocoded={setOriginLoc}
            onPickupGeocoded={setPickupLoc}
            onPathReady={setPathProfile}
          />
        </div>

        <div className="px-4 py-3 border-t border-zinc-200 bg-orange-50/50 grid grid-cols-3 gap-2">
          <Stat label="Khoảng cách" value={pathProfile ? formatMeters(distanceMeters) : "—"} />
          <Stat label="ETA" value={pathProfile ? formatDuration(etaSeconds) : "—"} muted={arrived} />
          <Stat label="Biển số" value="51B-128.45" mono />
        </div>
      </div>

      {/* Quick actions — call/SMS the shuttle driver. */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => toast.info("Đang gọi tài xế xe trung chuyển... (demo)")}
          className="py-2.5 rounded-full bg-white border border-zinc-200 text-sm font-medium hover:bg-slate-50"
        >
          📞 Gọi tài xế
        </button>
        <button
          onClick={() => toast.info("Mở chat (demo)")}
          className="py-2.5 rounded-full bg-white border border-zinc-200 text-sm font-medium hover:bg-slate-50"
        >
          💬 Nhắn tin
        </button>
      </div>

      <button
        onClick={onArrived}
        disabled={!arrived}
        className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold disabled:bg-orange-200 hover:bg-orange-600 transition"
      >
        {arrived ? "✓ Hoàn tất — Đã lên xe trung chuyển" : "Đang chờ xe trung chuyển..."}
      </button>
      <button onClick={onArrived} className="w-full text-xs text-slate-500 underline">
        [Demo] Bỏ qua &amp; lên xe ngay
      </button>

      {pickerOpen && (
        <PickupPickerSheet
          current={pickup}
          onPick={handlePickupChange}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Pickup info card — booking-page chrome (radio + address + auto-office).
// ──────────────────────────────────────────────────────────────────────────

const PickupInfoCard = ({
  pickup,
  onEdit,
}: {
  pickup: PickupLocation;
  onEdit: () => void;
}) => {
  // The shuttle phase always implies "Trung chuyển" pickup — riders going
  // direct to the bến never end up on FUTA Rada. Both radio buttons are
  // shown for visual fidelity with the booking page, but Trung chuyển is
  // pinned as active.
  const arrivalDeadline = useMemo(() => {
    // Show "có mặt trước" 15 minutes from now — feels live without needing
    // real booking timestamps wired in here.
    const d = new Date(Date.now() + 15 * 60 * 1000);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const MM = String(d.getMonth() + 1).padStart(2, "0");
    return `${hh}:${mm} ${dd}/${MM}/${d.getFullYear()}`;
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-sm text-slate-900">
          Thông tin đón trả
          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <button onClick={onEdit} className="text-orange-500 text-sm font-medium hover:text-orange-600">
          Đổi điểm đón
        </button>
      </div>

      <div className="px-4 py-3 space-y-3">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
            ĐIỂM ĐÓN
          </div>

          {/* Radio row — matches booking page's pill-style with active orange. */}
          <div className="flex items-center gap-4 mb-3">
            <RadioPill label="Bến xe/VP" active={false} disabled />
            <RadioPill label="Trung chuyển" active />
            <span className="text-xs text-emerald-600 font-medium ml-auto">Hợp lệ</span>
          </div>

          {/* Address — looks like the read-only text field from the screenshot. */}
          <button
            onClick={onEdit}
            className="w-full text-left border border-zinc-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 hover:border-orange-400 transition flex items-center gap-2"
          >
            <span className="text-orange-500 shrink-0">📍</span>
            <span className="truncate flex-1">{pickup.description}</span>
            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="mt-2 text-[12px] text-slate-600 space-y-0.5">
            <div>
              Văn phòng trung chuyển: <span className="font-semibold text-slate-900">{SHUTTLE_OFFICE.name}</span>
            </div>
            <div>
              Vui lòng có mặt trước:{" "}
              <span className="font-semibold text-emerald-700">{arrivalDeadline}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RadioPill = ({
  label,
  active,
  disabled,
}: {
  label: string;
  active: boolean;
  disabled?: boolean;
}) => (
  <label className={`flex items-center gap-1.5 text-sm ${disabled ? "opacity-60" : "cursor-pointer"}`}>
    <span
      className={`w-4 h-4 rounded-full border-2 grid place-items-center ${
        active ? "border-orange-500" : "border-slate-300"
      }`}
    >
      {active && <span className="w-2 h-2 rounded-full bg-orange-500" />}
    </span>
    <span className={active ? "text-orange-600 font-medium" : "text-slate-600"}>{label}</span>
  </label>
);

// ──────────────────────────────────────────────────────────────────────────
// Live map: geocodes office + pickup, fetches route, renders polyline,
// shows the animated bus marker + stationary user pin + office marker.
// ──────────────────────────────────────────────────────────────────────────

const RadaMap = ({
  originLoc,
  pickupLoc,
  busLoc,
  originAddress,
  pickupAddress,
  onOriginGeocoded,
  onPickupGeocoded,
  onPathReady,
}: {
  originLoc: LatLng;
  pickupLoc: LatLng;
  busLoc: LatLng;
  originAddress: string;
  pickupAddress: string;
  onOriginGeocoded: (l: LatLng) => void;
  onPickupGeocoded: (l: LatLng) => void;
  onPathReady: (p: PathProfile) => void;
}) => {
  // Default center: midway between origin and pickup so both pins show in
  // the initial frame. FitBounds takes over once the map mounts.
  const center = useMemo<LatLng>(
    () => ({
      lat: (originLoc.lat + pickupLoc.lat) / 2,
      lng: (originLoc.lng + pickupLoc.lng) / 2,
    }),
    [originLoc, pickupLoc],
  );

  return (
    <Map
      mapId={MAP_ID}
      defaultCenter={center}
      defaultZoom={12}
      mapTypeId="hybrid"
      tilt={0}
      gestureHandling="greedy"
      disableDefaultUI
      zoomControl
    >
      <Geocode address={originAddress} onResolved={onOriginGeocoded} />
      <Geocode address={pickupAddress} onResolved={onPickupGeocoded} />
      <FitBounds origin={originLoc} pickup={pickupLoc} />
      <DrivingDirections origin={originLoc} dest={pickupLoc} onPathReady={onPathReady} />
      <AdvancedMarker position={pickupLoc} title="Điểm đón của bạn">
        <UserPin />
      </AdvancedMarker>
      <AdvancedMarker position={originLoc} title={SHUTTLE_OFFICE.name}>
        <Pin background="#0ea5e9" borderColor="#075985" glyphColor="#ffffff" glyph="🏢" />
      </AdvancedMarker>
      <AdvancedMarker position={busLoc} title="Xe trung chuyển">
        <Pin background="#f97316" borderColor="#9a3412" glyphColor="#ffffff" glyph="🚐" />
      </AdvancedMarker>
    </Map>
  );
};

// One-shot geocoder. Re-runs only when the address string actually changes.
const Geocode = ({
  address,
  onResolved,
}: {
  address: string;
  onResolved: (l: LatLng) => void;
}) => {
  const geocodingLib = useMapsLibrary("geocoding");
  const lastAddressRef = useRef<string | null>(null);

  useEffect(() => {
    if (!geocodingLib || lastAddressRef.current === address) return;
    lastAddressRef.current = address;
    const geocoder = new geocodingLib.Geocoder();
    geocoder
      .geocode({ address, region: "VN" })
      .then((resp) => {
        const result = resp.results[0];
        if (!result) return;
        const loc = result.geometry.location;
        onResolved({ lat: loc.lat(), lng: loc.lng() });
      })
      .catch((err) => {
        // Fail soft — the page already has fallback coords seeded.
        console.warn("[FutaRada] geocoding failed:", address, err);
      });
  }, [geocodingLib, address, onResolved]);

  return null;
};

// Camera autofit: includes both pins with comfortable padding.
const FitBounds = ({ origin, pickup }: { origin: LatLng; pickup: LatLng }) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(origin);
    bounds.extend(pickup);
    map.fitBounds(bounds, 80);
  }, [map, origin, pickup]);
  return null;
};

// Run DirectionsService for DRIVING mode and render the polyline. The
// overview_path is also exposed via onPathReady so the parent can animate
// the shuttle marker along it.
const DrivingDirections = ({
  origin,
  dest,
  onPathReady,
}: {
  origin: LatLng;
  dest: LatLng;
  onPathReady: (p: PathProfile) => void;
}) => {
  const map = useMap();
  const routesLib = useMapsLibrary("routes");
  const rendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!routesLib || !map) return;
    rendererRef.current = new routesLib.DirectionsRenderer({
      map,
      suppressMarkers: true,
      preserveViewport: true,
      polylineOptions: {
        strokeColor: "#f97316",
        strokeOpacity: 0.95,
        strokeWeight: 5,
      },
    });
    return () => {
      rendererRef.current?.setMap(null);
      rendererRef.current = null;
    };
  }, [routesLib, map]);

  useEffect(() => {
    if (!routesLib || !rendererRef.current) return;
    const service = new routesLib.DirectionsService();
    let cancelled = false;
    service
      .route({
        origin,
        destination: dest,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((resp) => {
        if (cancelled) return;
        rendererRef.current?.setDirections(resp);
        const path = googlePathToLatLng(resp.routes[0]?.overview_path);
        if (path.length > 1) onPathReady(buildPathProfile(path));
      })
      .catch((err) => {
        console.warn("[FutaRada] directions failed:", err);
      });
    return () => {
      cancelled = true;
    };
  }, [routesLib, origin, dest, onPathReady]);

  return null;
};

// ──────────────────────────────────────────────────────────────────────────
// Pickup picker sheet — bottom-sheet modal with suggestions + Places search.
// ──────────────────────────────────────────────────────────────────────────

const PickupPickerSheet = ({
  current,
  onPick,
  onClose,
}: {
  current: PickupLocation;
  onPick: (p: PickupLocation) => void;
  onClose: () => void;
}) => {
  const placesLib = useMapsLibrary("places");
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  // Fresh session token per sheet open — Google bills autocomplete in
  // sessions of 1 search → 1 details lookup.
  useEffect(() => {
    if (!placesLib) return;
    sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
  }, [placesLib]);

  // Debounced predictions; skip queries shorter than 2 chars.
  useEffect(() => {
    if (!placesLib || query.trim().length < 2) {
      setPredictions([]);
      return;
    }
    const handle = setTimeout(() => {
      const service = new placesLib.AutocompleteService();
      service.getPlacePredictions(
        {
          input: query,
          sessionToken: sessionTokenRef.current ?? undefined,
          componentRestrictions: { country: "vn" },
          language: "vi",
        },
        (results) => {
          setPredictions(results ?? []);
        },
      );
    }, 250);
    return () => clearTimeout(handle);
  }, [placesLib, query]);

  // When the user picks a Places result, geocode it to coords. We use the
  // Geocoder here (not Place Details) because we only need lat/lng — saves
  // a billed API call.
  const handlePredictionPick = async (pred: google.maps.places.AutocompletePrediction) => {
    if (!placesLib) return;
    const geocoder = new google.maps.Geocoder();
    try {
      const resp = await geocoder.geocode({ placeId: pred.place_id });
      const result = resp.results[0];
      if (!result) return;
      const loc = result.geometry.location;
      onPick({
        address: pred.description,
        shortLabel: pred.structured_formatting.main_text,
        description: pred.structured_formatting.secondary_text ?? pred.description,
        fallbackCoord: { lat: loc.lat(), lng: loc.lng() },
      });
    } catch (err) {
      console.warn("[FutaRada] place-id geocode failed:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-4 pb-3 border-b border-zinc-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Chọn điểm đón</h3>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-900 text-xl leading-none">
              ×
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm địa điểm — toà nhà, đường, mốc..."
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {predictions.length > 0 ? (
            <ul className="divide-y divide-zinc-100">
              {predictions.map((p) => (
                <li key={p.place_id}>
                  <button
                    onClick={() => handlePredictionPick(p)}
                    className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-start gap-3"
                  >
                    <span className="text-orange-500 text-lg shrink-0 mt-0.5">📍</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-900 truncate">
                        {p.structured_formatting.main_text}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {p.structured_formatting.secondary_text}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <div className="px-5 py-3 text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
                Gợi ý
              </div>
              <ul className="divide-y divide-zinc-100">
                {SUGGESTED_PICKUPS.map((s) => {
                  const isCurrent = s.address === current.address;
                  return (
                    <li key={s.address}>
                      <button
                        onClick={() => onPick(s)}
                        className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-start gap-3"
                      >
                        <span className="text-orange-500 text-lg shrink-0 mt-0.5">📍</span>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-slate-900 truncate">
                            {s.shortLabel}
                            {isCurrent && (
                              <span className="ml-2 text-[10px] text-orange-600">đang chọn</span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 truncate">{s.description}</div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Small UI primitives.
// ──────────────────────────────────────────────────────────────────────────

const CompactRadar = ({ progress, arrived }: { progress: number; arrived: boolean }) => {
  // The shuttle dot starts at the radar edge and converges to the center.
  const radius = 80;
  const remaining = Math.max(0, 1 - progress);
  const angle = -Math.PI / 4;
  const x = Math.cos(angle) * radius * remaining;
  const y = Math.sin(angle) * radius * remaining;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-emerald-900 rounded-2xl px-4 py-4 text-white relative overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-emerald-400">📡</span>
        <div className="font-semibold">FUTA Rada</div>
        <div className="ml-auto text-[10px] opacity-70 uppercase tracking-wide">
          {arrived ? "Đã đến" : "Đang theo dõi"}
        </div>
      </div>

      <div className="relative w-[180px] h-[180px] mx-auto my-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-emerald-500/40"
            style={{
              width: i * 60,
              height: i * 60,
              left: `calc(50% - ${i * 30}px)`,
              top: `calc(50% - ${i * 30}px)`,
            }}
          />
        ))}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(16,185,129,0.35) 60deg, transparent 90deg)",
            animation: "spin 3s linear infinite",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
        </div>
        {!arrived && (
          <div
            className="absolute left-1/2 top-1/2 transition-transform duration-1000"
            style={{ transform: `translate(${x - 10}px, ${y - 10}px)` }}
          >
            <div className="w-5 h-5 rounded-full bg-orange-500 grid place-items-center border-2 border-white text-[9px]">
              🚐
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Stat = ({
  label,
  value,
  muted,
  mono,
}: {
  label: string;
  value: string;
  muted?: boolean;
  mono?: boolean;
}) => (
  <div>
    <div className="text-[11px] text-slate-500">{label}</div>
    <div
      className={`font-bold ${muted ? "text-slate-400" : "text-slate-900"} ${
        mono ? "font-mono text-sm" : ""
      }`}
    >
      {value}
    </div>
  </div>
);

const UserPin = () => (
  <div className="relative w-5 h-5">
    <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-70" />
    <span className="absolute inset-0 rounded-full bg-blue-500 border-2 border-white shadow-md" />
  </div>
);

const NoApiKeyNotice = () => (
  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-900 leading-relaxed">
    ⚙️ FUTA Rada cần{" "}
    <code className="px-1 bg-white border border-amber-200 rounded">VITE_GOOGLE_MAPS_API_KEY</code>{" "}
    trong{" "}
    <code className="px-1 bg-white border border-amber-200 rounded">.env.local</code>{" "}
    để hiển thị bản đồ thời gian thực và animation xe trung chuyển.
  </div>
);
