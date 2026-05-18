import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useJourney,
  PHASE_ORDER,
  PHASE_INFO,
  PHASE_DURATIONS_SEC,
  type JourneyPhase,
} from "@/contexts/JourneyContext";
import { madaguiRestStop } from "@/data/restStop";
import { PageShell } from "@/components/PageShell";

// Re-render every second so any time-derived UI (countdowns, elapsed bars,
// distance ETAs) stays current.
function useTick(intervalMs = 1000): number {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

// Format seconds as mm:ss (or hh:mm when > 1 hour, to keep ETA badges readable).
function formatDuration(totalSec: number): string {
  if (!isFinite(totalSec) || totalSec < 0) return "--:--";
  const s = Math.max(0, Math.floor(totalSec));
  if (s >= 3600) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// Journey Tracker — the user's home base while a journey is active.
// 9 phases drive what the screen shows. The button labels change to reflect
// where the user is, and phase-specific CTAs link to FUTA Rada / Terminal Map /
// Quick Report / Smart Stop. The "[Demo] Bỏ qua" buttons are intentional — this is
// a prototype and we need a way for stakeholders to step through phases without
// waiting on real GPS / time elapses.

export const TripProgress = () => {
  const navigate = useNavigate();
  const {
    activeJourney,
    advancePhase,
    endJourney,
    startAutoSimulation,
    stopAutoSimulation,
    setSimulationSpeed,
  } = useJourney();

  // Tick once per second so countdowns refresh visually.
  const now = useTick(1000);

  // Compute the per-phase countdown in seconds. Two modes:
  //   • Auto-sim ON  → countdown is the simulated time remaining in the current
  //                    phase (so 1x = real seconds, 5x = 5× faster). Stays in
  //                    sync with the auto-advance timer in JourneyContext.
  //   • Auto-sim OFF → countdown is the wall-clock time until the absolute
  //                    target (shuttle arrival / bus departure / ETA), which is
  //                    what real riders would actually see in production.
  const phase = activeJourney?.phase;
  const phaseStart = activeJourney?.phaseStartedAt;
  const speed = activeJourney?.simulationSpeed || 1;
  const isSimulating = !!activeJourney?.autoSimulation;

  const phaseRemainingSec = (() => {
    if (!phase || !phaseStart) return 0;
    const baseSec = PHASE_DURATIONS_SEC[phase];
    const realElapsed = (now - phaseStart) / 1000;
    const virtualElapsed = realElapsed * speed;
    return Math.max(0, baseSec - virtualElapsed);
  })();

  const wallClockRemaining = (iso: string | undefined): number => {
    if (!iso) return 0;
    return Math.max(0, (new Date(iso).getTime() - now) / 1000);
  };

  const shuttleSec = isSimulating ? phaseRemainingSec : wallClockRemaining(activeJourney?.shuttleArrivalTime);
  const departureSec = isSimulating ? phaseRemainingSec : wallClockRemaining(activeJourney?.busDepartureTime);
  const etaSec = isSimulating ? phaseRemainingSec : wallClockRemaining(activeJourney?.estimatedArrivalTime);

  // If the user lands here without an active journey (refresh after journey ended, shared URL, etc),
  // send them home with a friendly toast instead of rendering a blank shell.
  useEffect(() => {
    if (!activeJourney) {
      toast.info("Bạn chưa có chuyến đang hoạt động");
      navigate("/", { replace: true });
    }
  }, [activeJourney, navigate]);

  // Show smart, context-aware toasts when entering certain phases.
  // useEffect with phase dependency means it only fires once per phase transition.
  useEffect(() => {
    if (!activeJourney) return;
    if (activeJourney.phase === "waiting_shuttle") {
      const t = setTimeout(
        () =>
          toast.info("Xe trung chuyển đã được điều phối", {
            description: "Tài xế xe trung chuyển sẽ đến trong ~8 phút",
          }),
        800,
      );
      return () => clearTimeout(t);
    }
    if (activeJourney.phase === "near_rest") {
      toast("🍽️ Sắp đến trạm dừng Madagui", {
        description: "Đặt đồ ăn trước để pickup nhanh khi xe dừng!",
        duration: 6000,
      });
    }
    if (activeJourney.phase === "arrived") {
      toast.success("Chuyến đi đã hoàn thành 🎉", {
        description: "Hãy chia sẻ trải nghiệm với FUTA nhé",
      });
    }
  }, [activeJourney?.phase, activeJourney]);

  if (!activeJourney || !phase) return null;

  const { booking, cart, pickedUp, foundBusAtTerminal } = activeJourney;
  const { trip, seats } = booking;
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const phaseIdx = PHASE_ORDER.indexOf(phase);
  const info = PHASE_INFO[phase as JourneyPhase];

  return (
    <PageShell title="Hành trình của bạn" backTo="/" width="wide">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Trip header card with phase strip */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-500">MÃ VÉ</div>
              <div className="font-semibold tracking-wide">FUTA{trip.id}</div>
            </div>
            <div className="text-right text-sm">
              <div className="text-slate-500 text-xs">{trip.route}</div>
              <div className="font-semibold">
                {trip.departureTime} · {trip.date} · Ghế {seats.join(", ")}
              </div>
            </div>
          </div>

          {/* Phase progress strip — 9 dots, completed ones in green, current in orange. */}
          <div className="mt-5">
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {PHASE_ORDER.map((p, i) => (
                <div key={p} className="flex items-center gap-1 shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full grid place-items-center text-[10px] font-semibold transition-colors ${
                      i < phaseIdx
                        ? "bg-emerald-600 text-white"
                        : i === phaseIdx
                          ? "bg-orange-500 text-white"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {i < phaseIdx ? "✓" : i + 1}
                  </div>
                  {i < PHASE_ORDER.length - 1 && (
                    <div className={`w-6 h-0.5 ${i < phaseIdx ? "bg-emerald-600" : "bg-slate-100"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{info.emoji}</div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{info.label}</div>
                  <div className="text-xs text-slate-500">{info.sub}</div>
                </div>
                {/* Countdown Timer */}
                <div className="text-right">
                  {phase === "waiting_shuttle" && (
                    <div className="bg-white rounded-lg px-3 py-2 border border-orange-200 shadow-sm">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">
                        {isSimulating ? "Còn lại (mô phỏng)" : "Xe đến sau"}
                      </div>
                      <div className={`text-xl font-mono font-bold ${shuttleSec <= 0 ? "text-red-500" : "text-orange-600"}`}>
                        {formatDuration(shuttleSec)}
                      </div>
                    </div>
                  )}
                  {phase === "at_terminal" && (
                    <div className="bg-white rounded-lg px-3 py-2 border border-orange-200 shadow-sm">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">
                        {isSimulating ? "Còn lại (mô phỏng)" : "Xe khởi hành"}
                      </div>
                      <div className={`text-xl font-mono font-bold ${departureSec <= 0 ? "text-red-500" : "text-orange-600"}`}>
                        {formatDuration(departureSec)}
                      </div>
                    </div>
                  )}
                  {(phase === "in_transit" || phase === "near_rest" || phase === "at_rest" || phase === "resuming" || phase === "shuttle_onboard" || phase === "boarded") && (
                    <div className="bg-white rounded-lg px-3 py-2 border border-orange-200 shadow-sm">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">
                        {isSimulating ? "Còn lại (mô phỏng)" : "Còn lại"}
                      </div>
                      <div className="text-xl font-mono font-bold text-orange-600">
                        {formatDuration(etaSec)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Driver + Crew quick chips with call buttons. */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { person: trip.driver, label: "Tài xế", rating: trip.driver.crewScore },
              { person: trip.crew, label: "Phụ xe", rating: trip.crew.rating },
            ].map(({ person, label, rating }) => (
              <div key={person.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-200 shrink-0">
                  <img src={person.photo} alt={label} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-slate-500">{label}</div>
                  <div className="font-medium text-sm truncate text-slate-900">{person.name}</div>
                  <div className="text-[11px] text-orange-600 flex items-center gap-1">⭐ {rating}</div>
                </div>
                <button
                  onClick={() => toast.info(`Đang gọi ${label.toLowerCase()}... (demo)`)}
                  className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center hover:bg-emerald-100"
                  aria-label={`Gọi ${label}`}
                >
                  📞
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Phase-specific actions ─────────────────────────────────────── */}
        <section className="space-y-3">
          {phase === "waiting_shuttle" && (
            <>
              <ActionBtn
                icon="📡"
                title="Theo dõi vị trí xe trung chuyển"
                desc="Mở FUTA Rada — xem xe đến gần bạn"
                onClick={() => navigate("/futa-rada")}
                primary
              />
              <button onClick={advancePhase} className="text-xs text-slate-400 underline">
                [Demo] Bỏ qua bước này
              </button>
            </>
          )}

          {phase === "shuttle_onboard" && (
            <>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700">
                ✅ Bạn đang trên xe trung chuyển. Dự kiến tới bến trong 12 phút.
              </div>
              <button
                onClick={advancePhase}
                className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
              >
                Đã đến bến
              </button>
            </>
          )}

          {phase === "at_terminal" && !foundBusAtTerminal && (
            <>
              <ActionBtn
                icon="🗺️"
                title="Tìm xe của tôi tại bến"
                desc="Bản đồ chỉ đường tới đúng vị trí xe Limousine"
                onClick={() => navigate("/terminal-map")}
                primary
              />
              <button onClick={advancePhase} className="text-xs text-slate-400 underline">
                [Demo] Đã tự tìm thấy
              </button>
            </>
          )}

          {phase === "at_terminal" && foundBusAtTerminal && (
            <>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700">
                ✅ Đã tìm thấy xe của bạn tại bãi đỗ. Bước tiếp theo: đưa mã QR vé cho nhân viên.
              </div>
              <ActionBtn
                icon="🎫"
                title="Xem thông tin chi tiết vé"
                desc="Hiện mã QR để nhân viên quét — xác nhận lên xe"
                onClick={() => navigate("/ticket", { state: { from: "journey" } })}
                primary
              />
              <button
                onClick={advancePhase}
                className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
              >
                ✓ Lên xe thành công
              </button>
            </>
          )}

          {phase === "boarded" && (
            <>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700">
                ✅ Đã lên xe {trip.busType} — ghế {seats.join(", ")}. Chúc bạn hành trình vui vẻ!
              </div>
              <button
                onClick={advancePhase}
                className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
              >
                Xe đã khởi hành
              </button>
            </>
          )}

          {phase === "in_transit" && (
            <>
              <RouteVisual progress={0.35} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ActionBtn
                  icon="⚠️"
                  title="Quick Report"
                  desc="Báo cáo vấn đề trên xe"
                  onClick={() => navigate("/quick-report")}
                  compact
                />
                <ActionBtn
                  icon="📞"
                  title="Gọi hotline"
                  desc="1900 6067 hỗ trợ 24/7"
                  onClick={() => toast.info("Đang kết nối hotline 1900 6067")}
                  compact
                />
              </div>
              <button
                onClick={advancePhase}
                className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
              >
                Sắp đến trạm dừng (demo)
              </button>
            </>
          )}

          {phase === "near_rest" && (
            <>
              <RouteVisual progress={0.55} highlightRest />
              <ActionBtn
                icon="🍽️"
                title="Đặt món tại trạm dừng"
                desc="Smart Stop — pickup bằng QR khi xe dừng"
                onClick={() => navigate("/smart-stop")}
                badge={cartCount > 0 ? `${cartCount} món` : undefined}
                primary
              />
              <ActionBtn
                icon="⚠️"
                title="Quick Report"
                desc="Báo cáo vấn đề trên xe"
                onClick={() => navigate("/quick-report")}
                compact
              />
              <button
                onClick={advancePhase}
                className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
              >
                Đã đến {madaguiRestStop.name}
              </button>
            </>
          )}

          {phase === "at_rest" && (
            <>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
                ⏰ Xe dừng tại Madagui trong <b>{madaguiRestStop.durationMinutes} phút</b>. Hãy pickup đơn hàng của
                bạn!
              </div>
              {cartCount > 0 ? (
                <ActionBtn
                  icon="🎫"
                  title={pickedUp ? "Đã pickup đơn ✓" : "Mở QR pickup đơn hàng"}
                  desc={pickedUp ? "Chúc bạn ăn ngon miệng!" : "Quẹt mã tại quầy Smart Stop"}
                  onClick={() => navigate("/smart-stop")}
                  primary
                />
              ) : (
                <ActionBtn
                  icon="🍽️"
                  title="Đặt món nhanh"
                  desc="Vẫn còn thời gian — đặt và pickup tại quầy"
                  onClick={() => navigate("/smart-stop")}
                  primary
                />
              )}
              <button
                onClick={advancePhase}
                className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
              >
                Xe tiếp tục khởi hành
              </button>
            </>
          )}

          {phase === "resuming" && (
            <>
              <RouteVisual progress={0.78} />
              <ActionBtn
                icon="⚠️"
                title="Quick Report"
                desc="Báo cáo vấn đề trên xe"
                onClick={() => navigate("/quick-report")}
                compact
              />
              <button
                onClick={advancePhase}
                className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
              >
                Đã đến Đà Lạt
              </button>
            </>
          )}

          {phase === "arrived" && (
            <>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-4xl mb-1">🎉</div>
                <div className="font-semibold text-slate-900">Chuyến đi đã hoàn thành!</div>
                <div className="text-xs text-slate-500 mt-1">
                  Hy vọng bạn có một hành trình tuyệt vời cùng FUTA Bus Lines
                </div>
              </div>
              <ActionBtn
                icon="⭐"
                title="Đánh giá chuyến đi"
                desc="Chia sẻ trải nghiệm với tài xế & phụ xe"
                onClick={() => navigate("/post-trip-feedback", { state: { trip } })}
                primary
              />
              <button
                onClick={() => {
                  endJourney();
                  navigate("/");
                  toast.success("Đã kết thúc hành trình");
                }}
                className="w-full py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
              >
                Đóng hành trình
              </button>
            </>
          )}
        </section>

        {/* Auto-simulation controls */}
        <section className="border-t border-slate-200 pt-4">
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎮</span>
                <span className="font-semibold text-sm text-slate-900">Mô phỏng tự động</span>
              </div>
              {activeJourney.autoSimulation && (
                <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-full animate-pulse">
                  Đang chạy {activeJourney.simulationSpeed || 1}x
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Tự động chuyển qua các giai đoạn mà không cần tương tác. Hữu ích cho demo.
            </p>
            <div className="flex flex-wrap gap-2">
              {!activeJourney.autoSimulation ? (
                <>
                  <button
                    onClick={() => startAutoSimulation(1)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  >
                    ▶️ Chạy 1x
                  </button>
                  <button
                    onClick={() => startAutoSimulation(2)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  >
                    ⏩ Chạy 2x
                  </button>
                  <button
                    onClick={() => startAutoSimulation(5)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  >
                    ⏩⏩ Chạy 5x
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={stopAutoSimulation}
                    className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700 hover:bg-red-100"
                  >
                    ⏹️ Dừng
                  </button>
                  <div className="flex items-center gap-1 ml-2">
                    <span className="text-xs text-slate-500">Tốc độ:</span>
                    {[1, 2, 5, 10].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setSimulationSpeed(speed)}
                        className={`w-8 h-7 rounded text-xs font-medium ${
                          (activeJourney.simulationSpeed || 1) === speed
                            ? "bg-orange-500 text-white"
                            : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

// Reusable action button used by phase-specific CTAs. The `primary` variant is the
// big orange one, `compact` is the smaller side-by-side variant for secondary actions.
const ActionBtn = ({
  icon,
  title,
  desc,
  onClick,
  badge,
  compact,
}: {
  icon: string;
  title: string;
  desc: string;
  onClick: () => void;
  badge?: string;
  compact?: boolean;
  primary?: boolean;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 p-4 border border-orange-200 bg-orange-50/60 rounded-xl text-left hover:bg-orange-50 transition"
  >
    <div className="w-10 h-10 rounded-lg bg-orange-500 text-white grid place-items-center text-lg flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-semibold text-sm flex items-center gap-2 text-slate-900">
        {title}
        {badge && <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">{badge}</span>}
      </div>
      <div className={`text-xs text-slate-500 ${compact ? "line-clamp-1" : ""}`}>{desc}</div>
    </div>
    <span className="text-orange-500 text-lg">→</span>
  </button>
);

// Visualizes the bus's progress along the TPHCM → Đà Lạt route (304 km).
// Highlights Madagui rest stop at ~55% of the route when `highlightRest` is on.
const RouteVisual = ({ progress, highlightRest }: { progress: number; highlightRest?: boolean }) => {
  const totalKm = 304;
  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="font-medium text-slate-900">TP.HCM</span>
        <span className="text-slate-500">
          {Math.round(progress * totalKm)} / {totalKm} km
        </span>
        <span className="font-medium text-slate-900">Đà Lạt</span>
      </div>
      <div className="relative h-2 bg-slate-100 rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-orange-500 rounded-full transition-all"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-[55%] w-3 h-3 rounded-full ${
            highlightRest ? "bg-amber-500 animate-pulse" : "bg-slate-400"
          }`}
          title="Trạm Madagui"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -ml-2 transition-all"
          style={{ left: `${progress * 100}%` }}
        >
          <div className="w-5 h-5 rounded-full bg-white border-2 border-orange-500 grid place-items-center text-[10px]">
            🚌
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-500">
        <span>0 km</span>
        <span className={highlightRest ? "text-amber-600 font-medium" : ""}>
          {madaguiRestStop.name} 165km
        </span>
        <span>{totalKm} km</span>
      </div>
    </div>
  );
};
