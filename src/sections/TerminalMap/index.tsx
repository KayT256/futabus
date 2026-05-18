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
import { getTerminalByName, type TerminalLocation } from "@/data/terminals";
import { PageShell } from "@/components/PageShell";

// Real Google Maps wayfinding for the in-bến "find your bus" experience.
// Two view modes the rider can flip between:
//   • 2D: vector satellite + walking polyline drawn by Directions API
//   • 3D: photorealistic 3D tiles (gmp-map-3d custom element) for an
//         immersive "look around the bến" view of the parking spot
//
// Geolocation is requested on mount; if the user denies, we fall back to a
// believable simulated position ~80m from the bus parking spot so the demo
// still works end-to-end.

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// DEMO_MAP_ID is Google's public sandbox vector mapId — fine for prototyping,
// rate-limited in production. Riders should set their own via env.
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

// Distance (meters) at which we let the user tap "Đã tìm thấy xe". Generous
// enough to allow some GPS drift while still requiring they actually walked
// over to the parking spot.
const ARRIVED_THRESHOLD_M = 30;

type ViewMode = "2d" | "3d";

interface DirectionsState {
  distanceMeters: number;
  durationSeconds: number;
  steps: { instructionsHtml: string; distanceText: string }[];
}

export const TerminalMap = () => {
  const navigate = useNavigate();
  const { activeJourney, setFoundBusAtTerminal } = useJourney();

  // Defensive redirect — this view only makes sense mid-journey at-bến.
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

  // Without an API key we can't load Maps JS. Render a polished placeholder
  // with setup instructions and the existing iframe-embed fallback so the page
  // remains functional for stakeholders previewing without a key.
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
        {/* language="vi" + region="VN" forces the Directions API to return
            Vietnamese step instructions ("Đi về phía đông trên Đ. Hậu Giang")
            instead of mixing English + Vietnamese street names. */}
        <APIProvider apiKey={API_KEY} libraries={["routes", "marker"]} language="vi" region="VN">
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
// Main experience — orchestrates geolocation, view mode, directions, CTA.
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
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [directions, setDirections] = useState<DirectionsState | null>(null);

  // Ask the browser for geolocation once on mount. If denied / unavailable,
  // place the user ~80m from the bus parking spot so the rest of the demo
  // still renders meaningfully.
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLoc(simulatedUserNear(terminal));
      setUsingFallback(true);
      return;
    }
    const t = setTimeout(() => {
      // Browser is taking too long — likely behind a permission prompt the
      // user is ignoring. Fall back so the page doesn't feel broken.
      setUserLoc((prev) => prev ?? simulatedUserNear(terminal));
      setUsingFallback((prev) => prev || true);
    }, 4000);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(t);
        // If the user is far from the terminal (likely they're not actually at
        // the bến yet — they're previewing), simulate a position near the bus
        // so the directions are useful.
        const distFromTerminal = haversine(
          { lat: pos.coords.latitude, lng: pos.coords.longitude },
          terminal.entrance,
        );
        if (distFromTerminal > 2000) {
          setUserLoc(simulatedUserNear(terminal));
          setUsingFallback(true);
        } else {
          setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        }
      },
      () => {
        clearTimeout(t);
        setUserLoc(simulatedUserNear(terminal));
        setUsingFallback(true);
      },
      { enableHighAccuracy: true, timeout: 4000 },
    );
    return () => clearTimeout(t);
  }, [terminal]);

  const distanceFromBus = useMemo(() => {
    if (!userLoc) return Infinity;
    return haversine(userLoc, terminal.busParking);
  }, [userLoc, terminal.busParking]);

  const canFinish = distanceFromBus < ARRIVED_THRESHOLD_M;

  return (
    <>
      {/* Map container with overlaid view-mode toggle */}
      <div className="relative bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-semibold text-sm text-slate-900 truncate">{terminal.name}</div>
            <div className="text-[11px] text-slate-500 truncate">
              Đi tới xe {licensePlate} · vị trí {terminal.parkingSpot}
            </div>
          </div>
          <ViewModeToggle value={viewMode} onChange={setViewMode} />
        </div>

        <div className="relative h-[420px] bg-slate-100">
          {viewMode === "2d" ? (
            <Map2DSatellite
              terminal={terminal}
              userLoc={userLoc}
              onDirections={setDirections}
            />
          ) : (
            <Map3DSatellite terminal={terminal} userLoc={userLoc} />
          )}

          {usingFallback && (
            <div className="absolute top-3 left-3 max-w-[78%] rounded-lg bg-white/90 backdrop-blur px-3 py-2 text-[11px] text-slate-700 shadow-sm border border-zinc-200">
              📍 Đang dùng vị trí giả lập để demo (cho phép truy cập GPS để dùng vị trí thật).
            </div>
          )}
        </div>

        {/* Distance + ETA bar — shown over the bottom of the map for at-a-glance status */}
        <div className="px-4 py-3 border-t border-zinc-200 flex items-center justify-between bg-orange-50/50">
          <div>
            <div className="text-[11px] text-slate-500">Khoảng cách</div>
            <div className="font-bold text-slate-900">
              {userLoc ? `${formatMeters(distanceFromBus)}` : "Đang xác định..."}
            </div>
          </div>
          {directions && (
            <div className="text-right">
              <div className="text-[11px] text-slate-500">Đi bộ</div>
              <div className="font-bold text-slate-900">{formatDuration(directions.durationSeconds)}</div>
            </div>
          )}
          <div className="text-right">
            <div className="text-[11px] text-slate-500">Vị trí xe</div>
            <div className="font-bold text-orange-600">{terminal.parkingSpot}</div>
          </div>
        </div>
      </div>

      {/* Turn-by-turn step list rendered from the Directions API result. */}
      {directions && directions.steps.length > 0 && (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-zinc-200 font-semibold text-sm text-slate-900">
            🧭 Hướng dẫn đi bộ
          </div>
          <ol className="divide-y divide-zinc-100">
            {directions.steps.slice(0, 6).map((step, i) => (
              <li key={i} className="px-4 py-3 flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 grid place-items-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  {/* Directions API returns instructions as HTML — Google's
                      official samples render via dangerouslySetInnerHTML. The
                      content is generated by Google so it's safe. */}
                  <div
                    className="text-sm text-slate-800 leading-snug"
                    dangerouslySetInnerHTML={{ __html: step.instructionsHtml }}
                  />
                  <div className="text-[11px] text-slate-500 mt-0.5">{step.distanceText}</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="px-4 py-3 border-t border-zinc-100 text-[11px] text-slate-500">
            Đi qua {terminal.pillarLandmark} → xe đỗ ở vị trí <b>{terminal.parkingSpot}</b>
          </div>
        </div>
      )}

      <button
        onClick={onArrived}
        disabled={!canFinish}
        className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold disabled:bg-orange-200 hover:bg-orange-600 transition"
      >
        {canFinish
          ? "✓ Đã tìm thấy xe — Lên xe"
          : userLoc
            ? `Còn ${formatMeters(distanceFromBus)} nữa...`
            : "Đang xác định vị trí..."}
      </button>
      <button onClick={onArrived} className="w-full text-xs text-slate-500 underline">
        [Demo] Bỏ qua &amp; đã tìm thấy
      </button>
    </>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// 2D vector satellite map with walking polyline + advanced markers.
// ──────────────────────────────────────────────────────────────────────────
const Map2DSatellite = ({
  terminal,
  userLoc,
  onDirections,
}: {
  terminal: TerminalLocation;
  userLoc: { lat: number; lng: number } | null;
  onDirections: (d: DirectionsState | null) => void;
}) => {
  // Center the camera between user and bus so both fit by default.
  const center = useMemo(() => {
    if (!userLoc) return terminal.busParking;
    return {
      lat: (userLoc.lat + terminal.busParking.lat) / 2,
      lng: (userLoc.lng + terminal.busParking.lng) / 2,
    };
  }, [userLoc, terminal.busParking]);

  return (
    <Map
      mapId={MAP_ID}
      defaultCenter={center}
      defaultZoom={19}
      mapTypeId="satellite"
      tilt={0}
      gestureHandling="greedy"
      disableDefaultUI
      zoomControl
      // Re-center when geolocation arrives so the user actually sees both pins.
      center={undefined}
    >
      <DirectionsLayer userLoc={userLoc} busLoc={terminal.busParking} onResult={onDirections} />
      {userLoc && (
        <AdvancedMarker position={userLoc} title="Vị trí của bạn">
          <UserPulsePin />
        </AdvancedMarker>
      )}
      <AdvancedMarker position={terminal.busParking} title={`Xe đỗ tại ${terminal.parkingSpot}`}>
        <Pin background="#f97316" borderColor="#9a3412" glyphColor="#ffffff" glyph="🚌" />
      </AdvancedMarker>
    </Map>
  );
};

// Listen for the routes library, fire a walking DirectionsService request,
// render the polyline via DirectionsRenderer (suppressing default A/B markers
// so our custom AdvancedMarkers stay the only pins).
const DirectionsLayer = ({
  userLoc,
  busLoc,
  onResult,
}: {
  userLoc: { lat: number; lng: number } | null;
  busLoc: { lat: number; lng: number };
  onResult: (d: DirectionsState | null) => void;
}) => {
  const map = useMap();
  const routesLib = useMapsLibrary("routes");
  const rendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  // Lazy-init the renderer once the library + map are ready.
  useEffect(() => {
    if (!routesLib || !map) return;
    rendererRef.current = new routesLib.DirectionsRenderer({
      map,
      suppressMarkers: true,
      preserveViewport: false,
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

  // Re-route whenever the user's position changes.
  useEffect(() => {
    if (!routesLib || !map || !rendererRef.current || !userLoc) return;
    const service = new routesLib.DirectionsService();
    let cancelled = false;
    service
      .route({
        origin: userLoc,
        destination: busLoc,
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((resp) => {
        if (cancelled) return;
        rendererRef.current?.setDirections(resp);
        const leg = resp.routes[0]?.legs[0];
        if (!leg) {
          onResult(null);
          return;
        }
        onResult({
          distanceMeters: leg.distance?.value ?? 0,
          durationSeconds: leg.duration?.value ?? 0,
          steps: (leg.steps ?? []).map((s) => ({
            instructionsHtml: s.instructions ?? "",
            distanceText: s.distance?.text ?? "",
          })),
        });
      })
      .catch(() => {
        if (!cancelled) onResult(null);
      });
    return () => {
      cancelled = true;
    };
  }, [routesLib, map, userLoc, busLoc, onResult]);

  return null;
};

// ──────────────────────────────────────────────────────────────────────────
// 3D photorealistic satellite — uses the gmp-map-3d custom element.
// We load the maps3d library, then render the element imperatively because
// React doesn't know about Google's custom-element props.
// ──────────────────────────────────────────────────────────────────────────
const Map3DSatellite = ({
  terminal,
  userLoc,
}: {
  terminal: TerminalLocation;
  userLoc: { lat: number; lng: number } | null;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const maps3dLib = useMapsLibrary("maps3d");
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (!maps3dLib || !containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    try {
      // The Map3DElement custom element is registered by the maps3d library.
      // Build it directly so we get full type-safety without requiring TS
      // declarations for the JSX intrinsic.
      const el = document.createElement("gmp-map-3d") as HTMLElement & {
        center: { lat: number; lng: number; altitude?: number };
        range: number;
        tilt: number;
        heading: number;
        mode: string;
      };
      el.center = { ...terminal.busParking, altitude: 0 };
      el.range = 220;
      el.tilt = 60;
      el.heading = 30;
      el.mode = "SATELLITE";
      el.setAttribute("style", "width: 100%; height: 100%; display: block;");
      container.appendChild(el);

      // Slow auto-orbit around the parking spot so the rider can appreciate
      // the building geometry without dragging.
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
  }, [maps3dLib, terminal.busParking]);

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
      {/* Tiny userLoc indicator — Map3D markers are more involved; the 3D view
          is mainly to "preview" the destination, not navigate. */}
      {userLoc && (
        <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 backdrop-blur px-3 py-1.5 text-[11px] text-slate-700 shadow-sm border border-zinc-200">
          🧭 Đang xoay quanh vị trí <b>{terminal.parkingSpot}</b>
        </div>
      )}
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

const UserPulsePin = () => (
  <div className="relative w-4 h-4">
    <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-60" />
    <span className="absolute inset-0 rounded-full bg-blue-500 border-2 border-white shadow" />
  </div>
);

// ──────────────────────────────────────────────────────────────────────────
// Fallback shown when no API key is configured. Uses the public iframe embed
// so the page still gives the rider some context.
// ──────────────────────────────────────────────────────────────────────────
const NoApiKeyNotice = ({
  terminal,
  licensePlate,
}: {
  terminal: TerminalLocation;
  licensePlate: string;
}) => {
  const mapSrc = `https://maps.google.com/maps?q=${terminal.busParking.lat},${terminal.busParking.lng}&z=18&output=embed&hl=vi`;
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-zinc-200">
        <div className="font-semibold text-sm text-slate-900">{terminal.name}</div>
        <div className="text-[11px] text-slate-500">Tới xe {licensePlate} · vị trí {terminal.parkingSpot}</div>
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
        <code className="mx-1 px-1.5 py-0.5 rounded bg-white border border-amber-200 text-amber-900">VITE_GOOGLE_MAPS_API_KEY</code>
        trong file <code className="mx-1 px-1.5 py-0.5 rounded bg-white border border-amber-200 text-amber-900">.env.local</code> rồi khởi động lại dev server.
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Math helpers.
// ──────────────────────────────────────────────────────────────────────────

// Place the simulated user ~80m NW of the bus so directions render meaningfully.
const simulatedUserNear = (t: TerminalLocation) => ({
  lat: t.busParking.lat + 0.0007,
  lng: t.busParking.lng - 0.00075,
});

// Distance in meters between two LatLng pairs (Haversine, great-circle).
const haversine = (
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number => {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sa =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(sa));
};

const formatMeters = (m: number) => (m < 1000 ? `${Math.round(m)}m` : `${(m / 1000).toFixed(1)}km`);

const formatDuration = (s: number) => {
  if (s < 60) return `${Math.round(s)}s`;
  const mins = Math.round(s / 60);
  return `${mins} phút`;
};

