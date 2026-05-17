import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useJourney } from "@/contexts/JourneyContext";

// FUTA Rada — track the FUTA shuttle bus heading to pick the user up.
// The screen has three parts:
//   1. A stylized radar circle (the iconic FUTA Rada UI) showing the shuttle closing in.
//   2. A real Google Maps embed (free, no API key) centered on the shuttle's current
//      simulated position so the user can correlate the radar with a real map.
//   3. Distance/ETA chip + call/message action buttons.
//
// The shuttle "moves" via a simulated approach — distance ticks down every ~1.2s.
// In production this would be replaced with the actual driver's GPS feed.

// Demo coordinates: user is in Q.2 (Thảo Điền), shuttle starts ~800m away in Q.1.
// Bearings calculated so the shuttle visibly moves along a real road toward the user.
const USER_COORDS = { lat: 10.8024, lng: 106.7361 }; // Vincom Thảo Điền area
const SHUTTLE_START = { lat: 10.7975, lng: 106.7298 };

// Convert a degree of latitude to meters (rough approximation, fine for this distance).
const distMeters = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(x)));
};

export const FutaRada = () => {
  const navigate = useNavigate();
  const { activeJourney, setPhase } = useJourney();

  // Linear progress from 0 (shuttle at SHUTTLE_START) to 1 (shuttle reaches USER_COORDS).
  // Ticks every 1.2s. At progress=1 we mark the shuttle as arrived.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 1) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(1, p + 0.06);
        if (next >= 1) {
          toast.success("🚐 Xe trung chuyển đã đến!", {
            description: "Tài xế đang chờ bạn tại điểm đón",
          });
        } else if (Math.abs(next - 0.75) < 0.06) {
          toast("📍 Xe cách bạn ~200m", { description: "Vui lòng ra điểm đón" });
        }
        return next;
      });
    }, 1200);
    return () => clearInterval(id);
  }, [progress]);

  const shuttleCoords = useMemo(
    () => ({
      lat: SHUTTLE_START.lat + (USER_COORDS.lat - SHUTTLE_START.lat) * progress,
      lng: SHUTTLE_START.lng + (USER_COORDS.lng - SHUTTLE_START.lng) * progress,
    }),
    [progress],
  );

  const distance = distMeters(USER_COORDS, shuttleCoords);
  const arrived = distance <= 5;
  const etaMinutes = Math.max(1, Math.round(distance / 60));

  // Radar marker position is purely visual — we map the shuttle's progress to a
  // diagonal vector from the radar edge to the center.
  const radius = 130;
  const remainingRatio = 1 - progress;
  const angle = -Math.PI / 4;
  const radarBx = Math.cos(angle) * radius * remainingRatio;
  const radarBy = Math.sin(angle) * radius * remainingRatio;

  // Center the Google Maps embed midway between user and shuttle so we always see both.
  // Update the key only when the shuttle has moved enough to warrant a refresh —
  // otherwise the iframe re-renders every tick which causes flicker.
  const mapCenter = useMemo(
    () => ({
      lat: (USER_COORDS.lat + shuttleCoords.lat) / 2,
      lng: (USER_COORDS.lng + shuttleCoords.lng) / 2,
    }),
    [shuttleCoords],
  );
  // Quantize progress to 0.25 steps for the iframe key so we only refresh 4 times during the trip.
  const mapKey = Math.round(progress * 4);
  const mapSrc = `https://maps.google.com/maps?q=${shuttleCoords.lat},${shuttleCoords.lng}&z=16&output=embed&hl=vi`;

  const handleDone = () => {
    setPhase("shuttle_onboard");
    toast.success("Đã lên xe trung chuyển");
    navigate("/trip-progress");
  };

  if (!activeJourney) {
    // Defensive: this screen is only meaningful during an active shuttle phase.
    navigate("/", { replace: true });
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-12">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center">
          <button
            onClick={() => navigate("/trip-progress")}
            className="flex items-center gap-2 text-slate-700 hover:text-orange-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Quay lại</span>
          </button>
          <span className="ml-3 text-base font-semibold text-slate-900">FUTA Rada</span>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Radar card — the signature FUTA Rada UI. */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-400 text-xl">📡</span>
            <div className="font-semibold">FUTA Rada</div>
            <div className="ml-auto text-xs opacity-70">Live GPS</div>
          </div>
          <p className="text-xs opacity-70 mt-1">Theo dõi xe trung chuyển đang tới đón bạn</p>

          <div className="relative w-[280px] h-[280px] mx-auto my-6">
            {/* Radar rings */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute inset-0 m-auto rounded-full border border-emerald-500/40"
                style={{
                  width: i * 90,
                  height: i * 90,
                  left: `calc(50% - ${i * 45}px)`,
                  top: `calc(50% - ${i * 45}px)`,
                }}
              />
            ))}
            {/* Sweep — pulses every 3s; uses CSS conic-gradient and `pulse-ring` from index.css. */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(16,185,129,0.35) 60deg, transparent 90deg)",
                animation: "spin 3s linear infinite",
              }}
            />
            {/* You marker (center) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
              <div className="text-[10px] mt-2 text-center opacity-80">Bạn</div>
            </div>
            {/* Shuttle marker — moves toward center as progress increases */}
            {!arrived && (
              <div
                className="absolute left-1/2 top-1/2 transition-transform duration-1000"
                style={{ transform: `translate(${radarBx - 12}px, ${radarBy - 12}px)` }}
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 grid place-items-center border-2 border-white text-white text-[10px]">
                  🚐
                </div>
              </div>
            )}
          </div>

          {/* Distance/ETA chip */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
            <div className="text-xs opacity-70">Khoảng cách</div>
            <div className="text-3xl font-bold">{arrived ? "Đã đến!" : `${distance}m`}</div>
            <div className="text-xs opacity-70 mt-1">
              {arrived
                ? "Tài xế đang chờ bạn"
                : `Còn ~${etaMinutes} phút · Xe Toyota Hiace 51B-12345`}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={() => toast.info("Đang gọi tài xế xe trung chuyển... (demo)")}
              className="py-2 rounded-lg bg-white/10 text-sm flex items-center justify-center gap-1 hover:bg-white/20"
            >
              📞 Gọi tài xế
            </button>
            <button
              onClick={() => toast.info("Mở chat (demo)")}
              className="py-2 rounded-lg bg-white/10 text-sm flex items-center justify-center gap-1 hover:bg-white/20"
            >
              💬 Nhắn tin
            </button>
          </div>
        </div>

        {/* Real Google Maps embed — anchored on the shuttle's current GPS position.
            Key based on quantized progress so the iframe only reloads at 25% intervals
            (avoids constant flicker on every tick). */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="font-semibold text-sm text-slate-900">Bản đồ thực tế</div>
            <div className="text-[11px] text-slate-500">
              {shuttleCoords.lat.toFixed(4)}, {shuttleCoords.lng.toFixed(4)}
            </div>
          </div>
          <iframe
            key={mapKey}
            title="FUTA Rada — vị trí xe trung chuyển"
            src={mapSrc}
            width="100%"
            height="280"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            data-center={`${mapCenter.lat},${mapCenter.lng}`}
          />
          <div className="px-4 py-2.5 text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            Vị trí xe đang cập nhật mỗi vài giây.
          </div>
        </div>

        <button
          onClick={handleDone}
          disabled={!arrived}
          className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold disabled:bg-orange-200 hover:bg-orange-600"
        >
          {arrived ? "Hoàn tất — Đã lên xe" : "Đang chờ xe trung chuyển..."}
        </button>
        <button onClick={handleDone} className="w-full text-xs text-slate-500 underline">
          [Demo] Bỏ qua &amp; lên xe ngay
        </button>
      </div>
    </main>
  );
};
