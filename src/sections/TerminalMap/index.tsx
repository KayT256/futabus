import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useJourney } from "@/contexts/JourneyContext";

// Terminal Map — at-bến indoor wayfinding to help the user find their specific bus.
// Two layers:
//   1. Stylized "indoor map" overlay (buildings + path + markers) so the UX feels
//      like a real wayfinding app even though FUTA doesn't have indoor maps publicly.
//   2. Real Google Maps embed of the bến below for context — confirms the user is
//      at the right terminal.
//
// Three-stage progression: locating → routing → arrived.
// Each stage updates the overlay and the CTA copy.

// Rough coordinates for each terminal — used to point the Google Maps embed.
const TERMINAL_COORDS: Record<string, { lat: number; lng: number }> = {
  "Bến xe Miền Tây": { lat: 10.7472, lng: 106.6309 },
  "Bến xe An Sương": { lat: 10.8497, lng: 106.6213 },
  "Bến xe Miền Đông Mới": { lat: 10.8338, lng: 106.8033 },
};
const DEFAULT_TERMINAL = TERMINAL_COORDS["Bến xe Miền Tây"];

type Step = "locating" | "routing" | "arrived";

export const TerminalMap = () => {
  const navigate = useNavigate();
  const { activeJourney, setFoundBusAtTerminal } = useJourney();

  const [step, setStep] = useState<Step>("locating");

  // Simulated GPS-locking + route-drawing animation.
  useEffect(() => {
    const t1 = setTimeout(() => setStep("routing"), 1500);
    const t2 = setTimeout(() => setStep("arrived"), 5500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!activeJourney) {
      navigate("/", { replace: true });
    }
  }, [activeJourney, navigate]);

  if (!activeJourney) return null;
  const { trip } = activeJourney.booking;
  const terminalName = trip.pickupTerminal;
  const coords = TERMINAL_COORDS[terminalName] ?? DEFAULT_TERMINAL;
  const mapSrc = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=17&output=embed&hl=vi`;

  const handleDone = () => {
    setFoundBusAtTerminal(true);
    toast.success("Đã tìm thấy xe của bạn", {
      description: "Đưa mã QR vé cho nhân viên kiểm tra",
    });
    navigate("/trip-progress");
  };

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
          <span className="ml-3 text-base font-semibold text-slate-900">Tìm xe tại bến</span>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Stylized indoor map overlay — keeps the prototype's "wayfinding" feel */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 flex items-center gap-2">
            <span className="text-orange-500 text-xl">🗺️</span>
            <div>
              <div className="font-semibold text-slate-900">Sơ đồ bến xe</div>
              <div className="text-[11px] text-slate-500">{terminalName}</div>
            </div>
          </div>

          {/* Faux indoor grid */}
          <div
            className="relative h-[360px] bg-emerald-50/60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          >
            <div className="absolute top-8 left-6 w-28 h-16 bg-white/90 border border-slate-200 rounded text-[10px] grid place-items-center text-slate-700">
              Khu chờ A
            </div>
            <div className="absolute top-8 right-6 w-28 h-14 bg-white/90 border border-slate-200 rounded text-[10px] grid place-items-center text-slate-700">
              Quầy vé
            </div>
            <div className="absolute bottom-8 left-6 w-32 h-16 bg-white/90 border border-slate-200 rounded text-[10px] grid place-items-center text-slate-700">
              Bãi đỗ Limousine
            </div>
            <div className="absolute bottom-8 right-10 w-20 h-14 bg-white/90 border border-slate-200 rounded text-[10px] grid place-items-center text-slate-700">
              WC
            </div>

            {/* Walking path — only shows once we've moved past "locating" */}
            {step !== "locating" && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 70 80 Q 180 110 180 250 Q 180 310 130 340"
                  stroke="#f97316"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                  fill="none"
                />
              </svg>
            )}

            {/* User marker */}
            <div className="absolute top-[60px] left-[60px]">
              <div className="relative w-4 h-4">
                <div className="pulse-ring" />
                <div className="absolute inset-0 rounded-full bg-blue-500 border-2 border-white" />
              </div>
              <div className="text-[10px] font-medium mt-1 text-slate-700">Bạn</div>
            </div>

            {/* Bus marker */}
            <div className="absolute bottom-[40px] left-[110px]">
              <div className="w-9 h-9 rounded-full bg-orange-500 grid place-items-center border-2 border-white text-white shadow text-sm">
                🚌
              </div>
              <div className="text-[10px] font-medium mt-1 text-center text-slate-700">Xe {trip.licensePlate}</div>
            </div>

            {/* Locating overlay covers the map while GPS is "locking" */}
            {step === "locating" && (
              <div className="absolute inset-0 bg-black/30 grid place-items-center text-white text-sm font-medium">
                📡 Đang xác định vị trí của bạn...
              </div>
            )}
          </div>

          {/* Directions card under the overlay */}
          <div className="p-4 space-y-1.5">
            <div className="text-sm font-semibold text-slate-900">
              {step === "arrived" ? "Bạn đã đến xe!" : "Đi bộ tới Bãi đỗ Limousine"}
            </div>
            <div className="text-xs text-slate-500">
              Khoảng cách: {step === "arrived" ? "0m" : "~120m · 2 phút đi bộ"}
            </div>
            <div className="text-xs text-emerald-700 flex items-center gap-1">
              🧭 Đi thẳng → rẽ phải tại cột số 3 → xe đỗ ở vị trí B12
            </div>
          </div>
        </div>

        {/* Real Google Maps view of the terminal */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="font-semibold text-sm text-slate-900">Bản đồ thực tế quanh bến</div>
            <div className="text-[11px] text-slate-500">
              {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
            </div>
          </div>
          <iframe
            title="Bản đồ bến xe"
            src={mapSrc}
            width="100%"
            height="240"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <button
          onClick={handleDone}
          disabled={step !== "arrived"}
          className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold disabled:bg-orange-200 hover:bg-orange-600"
        >
          {step === "arrived" ? "Hoàn tất — Đã tìm thấy xe" : "Đang dẫn đường..."}
        </button>
        <button onClick={handleDone} className="w-full text-xs text-slate-500 underline">
          [Demo] Bỏ qua &amp; đã tìm thấy
        </button>
      </div>
    </main>
  );
};
