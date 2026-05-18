import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Radar,
  MapPin,
  Ticket,
  AlertTriangle,
  Phone,
  UtensilsCrossed,
  Star,
  Bus,
  PartyPopper,
  Check,
  ChevronRight,
  Play,
  FastForward,
  Square,
  CircleGauge,
  Clock3,
  type LucideIcon,
} from "lucide-react";
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

          {/* Phase progress strip — 9 dots, completed ones in green, current in orange.
              Each segment uses a continuous connector line that fills smoothly. */}
          <div className="mt-5">
            <div className="flex items-center pb-2 overflow-x-auto">
              {PHASE_ORDER.map((p, i) => {
                const done = i < phaseIdx;
                const current = i === phaseIdx;
                return (
                  <div key={p} className="flex items-center shrink-0">
                    <div
                      className={`relative w-7 h-7 rounded-full grid place-items-center text-[11px] font-semibold transition-all duration-300 ${
                        done
                          ? "bg-emerald-500 text-white shadow-sm"
                          : current
                            ? "bg-orange-500 text-white shadow-md ring-4 ring-orange-100"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {done ? <Check size={14} strokeWidth={3} /> : i + 1}
                    </div>
                    {i < PHASE_ORDER.length - 1 && (
                      <div className="w-6 h-0.5 mx-0.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full transition-all duration-500 ${done ? "w-full bg-emerald-500" : "w-0"}`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-orange-50 via-orange-50/70 to-amber-50 border border-orange-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-orange-100 grid place-items-center text-2xl shrink-0">
                  {info.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 leading-tight">{info.label}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{info.sub}</div>
                </div>
                {/* Countdown Timer */}
                <PhaseCountdown
                  phase={phase}
                  shuttleSec={shuttleSec}
                  departureSec={departureSec}
                  etaSec={etaSec}
                  isSimulating={isSimulating}
                />
              </div>
            </div>
          </div>

          {/* Driver + Crew quick chips with call buttons. */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { person: trip.driver, label: "Tài xế", rating: trip.driver.crewScore },
              { person: trip.crew, label: "Phụ xe", rating: trip.crew.rating },
            ].map(({ person, label, rating }) => (
              <div key={person.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:border-orange-200 hover:bg-orange-50/30 transition-colors">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-200 shrink-0">
                  <img src={person.photo} alt={label} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">{label}</div>
                  <div className="font-semibold text-sm truncate text-slate-900">{person.name}</div>
                  <div className="text-[11px] text-orange-600 inline-flex items-center gap-1 font-medium">
                    <Star size={11} className="fill-orange-500 text-orange-500" />
                    {rating}
                  </div>
                </div>
                <button
                  onClick={() => toast.info(`Đang gọi ${label.toLowerCase()}... (demo)`)}
                  className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center hover:bg-emerald-100 transition-colors shrink-0"
                  aria-label={`Gọi ${label}`}
                >
                  <Phone size={14} />
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
                Icon={Radar}
                title="Theo dõi vị trí xe trung chuyển"
                desc="Mở FUTA Rada — xem xe đến gần bạn"
                onClick={() => navigate("/futa-rada")}
              />
              <DemoSkipButton onClick={advancePhase} label="Bỏ qua bước này" />
            </>
          )}

          {phase === "shuttle_onboard" && (
            <>
              <StatusBanner tone="emerald">
                Bạn đang trên xe trung chuyển. Dự kiến tới bến trong 12 phút.
              </StatusBanner>
              <PrimaryCta onClick={advancePhase}>Đã đến bến</PrimaryCta>
            </>
          )}

          {phase === "at_terminal" && !foundBusAtTerminal && (
            <>
              <ActionBtn
                Icon={MapPin}
                title="Tìm xe của tôi tại bến"
                desc="Bản đồ chỉ đường tới đúng vị trí xe Limousine"
                onClick={() => navigate("/terminal-map")}
              />
              <DemoSkipButton onClick={advancePhase} label="Đã tự tìm thấy" />
            </>
          )}

          {phase === "at_terminal" && foundBusAtTerminal && (
            <>
              <StatusBanner tone="emerald">
                Đã tìm thấy xe của bạn tại bãi đỗ. Bước tiếp theo: đưa mã QR vé cho nhân viên.
              </StatusBanner>
              <ActionBtn
                Icon={Ticket}
                title="Xem thông tin chi tiết vé"
                desc="Hiện mã QR để nhân viên quét — xác nhận lên xe"
                onClick={() => navigate("/ticket", { state: { from: "journey" } })}
              />
              <PrimaryCta onClick={advancePhase}>Lên xe thành công</PrimaryCta>
            </>
          )}

          {phase === "boarded" && (
            <>
              <StatusBanner tone="emerald">
                Đã lên xe {trip.busType} — ghế {seats.join(", ")}. Chúc bạn hành trình vui vẻ!
              </StatusBanner>
              <PrimaryCta onClick={advancePhase}>Xe đã khởi hành</PrimaryCta>
            </>
          )}

          {phase === "in_transit" && (
            <>
              <RouteVisual progress={0.35} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ActionBtn
                  Icon={AlertTriangle}
                  title="Quick Report"
                  desc="Báo cáo vấn đề trên xe"
                  onClick={() => navigate("/quick-report")}
                  compact
                />
                <ActionBtn
                  Icon={Phone}
                  title="Gọi hotline"
                  desc="1900 6067 hỗ trợ 24/7"
                  onClick={() => toast.info("Đang kết nối hotline 1900 6067")}
                  compact
                />
              </div>
              <PrimaryCta onClick={advancePhase}>Sắp đến trạm dừng (demo)</PrimaryCta>
            </>
          )}

          {phase === "near_rest" && (
            <>
              <RouteVisual progress={0.55} highlightRest />
              <ActionBtn
                Icon={UtensilsCrossed}
                title="Đặt món tại trạm dừng"
                desc="Smart Stop — pickup bằng QR khi xe dừng"
                onClick={() => navigate("/smart-stop")}
                badge={cartCount > 0 ? `${cartCount} món` : undefined}
              />
              <ActionBtn
                Icon={AlertTriangle}
                title="Quick Report"
                desc="Báo cáo vấn đề trên xe"
                onClick={() => navigate("/quick-report")}
                compact
              />
              <PrimaryCta onClick={advancePhase}>Đã đến {madaguiRestStop.name}</PrimaryCta>
            </>
          )}

          {phase === "at_rest" && (
            <>
              <StatusBanner tone="amber" Icon={Clock3}>
                Xe dừng tại Madagui trong <b>{madaguiRestStop.durationMinutes} phút</b>. Hãy pickup đơn hàng của bạn!
              </StatusBanner>
              {cartCount > 0 ? (
                <ActionBtn
                  Icon={Ticket}
                  title={pickedUp ? "Đã pickup đơn" : "Mở QR pickup đơn hàng"}
                  desc={pickedUp ? "Chúc bạn ăn ngon miệng!" : "Quẹt mã tại quầy Smart Stop"}
                  onClick={() => navigate("/smart-stop")}
                />
              ) : (
                <ActionBtn
                  Icon={UtensilsCrossed}
                  title="Đặt món nhanh"
                  desc="Vẫn còn thời gian — đặt và pickup tại quầy"
                  onClick={() => navigate("/smart-stop")}
                />
              )}
              <PrimaryCta onClick={advancePhase}>Xe tiếp tục khởi hành</PrimaryCta>
            </>
          )}

          {phase === "resuming" && (
            <>
              <RouteVisual progress={0.78} />
              <ActionBtn
                Icon={AlertTriangle}
                title="Quick Report"
                desc="Báo cáo vấn đề trên xe"
                onClick={() => navigate("/quick-report")}
                compact
              />
              <PrimaryCta onClick={advancePhase}>Đã đến Đà Lạt</PrimaryCta>
            </>
          )}

          {phase === "arrived" && (
            <>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-white shadow-sm grid place-items-center text-emerald-600 mb-3">
                  <PartyPopper size={26} />
                </div>
                <div className="font-bold text-slate-900">Chuyến đi đã hoàn thành!</div>
                <div className="text-xs text-slate-600 mt-1">
                  Hy vọng bạn có một hành trình tuyệt vời cùng FUTA Bus Lines
                </div>
              </div>
              <ActionBtn
                Icon={Star}
                title="Đánh giá chuyến đi"
                desc="Chia sẻ trải nghiệm với tài xế & phụ xe"
                onClick={() => navigate("/post-trip-feedback", { state: { trip } })}
              />
              <button
                onClick={() => {
                  endJourney();
                  navigate("/");
                  toast.success("Đã kết thúc hành trình");
                }}
                className="w-full py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Đóng hành trình
              </button>
            </>
          )}
        </section>

        {/* Auto-simulation controls. Visually de-emphasised (dashed border,
            slate palette) so stakeholders know it's a demo-only utility and
            not a real product affordance. */}
        <section className="border-t border-slate-200 pt-4">
          <div className="bg-slate-50/80 rounded-xl border border-dashed border-slate-300 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-200 grid place-items-center text-slate-600">
                  <CircleGauge size={15} />
                </div>
                <div>
                  <span className="font-semibold text-sm text-slate-900">Mô phỏng tự động</span>
                  <span className="text-[10px] text-slate-500 ml-2 uppercase tracking-wide font-medium">Demo</span>
                </div>
              </div>
              {activeJourney.autoSimulation && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Đang chạy {activeJourney.simulationSpeed || 1}x
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Tự động chuyển qua các giai đoạn mà không cần tương tác. Hữu ích cho demo & QA.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {!activeJourney.autoSimulation ? (
                <>
                  <SimBtn onClick={() => startAutoSimulation(1)} Icon={Play}>
                    Chạy 1x
                  </SimBtn>
                  <SimBtn onClick={() => startAutoSimulation(2)} Icon={FastForward}>
                    Chạy 2x
                  </SimBtn>
                  <SimBtn onClick={() => startAutoSimulation(5)} Icon={FastForward}>
                    Chạy 5x
                  </SimBtn>
                </>
              ) : (
                <>
                  <button
                    onClick={stopAutoSimulation}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700 hover:bg-red-100 transition"
                  >
                    <Square size={12} className="fill-red-700" />
                    Dừng
                  </button>
                  <div className="flex items-center gap-1 ml-2">
                    <span className="text-xs text-slate-500 mr-1">Tốc độ:</span>
                    {[1, 2, 5, 10].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setSimulationSpeed(speed)}
                        className={`w-9 h-7 rounded-md text-xs font-bold transition ${
                          (activeJourney.simulationSpeed || 1) === speed
                            ? "bg-orange-500 text-white shadow-sm"
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

// Reusable action button used by phase-specific CTAs. Now accepts a Lucide
// icon component (rather than an emoji string) so the rendered icon scales
// crisply at any size and inherits theming via `currentColor`.
const ActionBtn = ({
  Icon,
  title,
  desc,
  onClick,
  badge,
  compact,
}: {
  Icon: LucideIcon;
  title: string;
  desc: string;
  onClick: () => void;
  badge?: string;
  compact?: boolean;
}) => (
  <button
    onClick={onClick}
    className="group w-full flex items-center gap-3 p-4 border border-orange-200 bg-gradient-to-br from-orange-50/80 to-white rounded-xl text-left hover:border-orange-300 hover:shadow-sm hover:from-orange-50 transition-all"
  >
    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white grid place-items-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
      <Icon size={20} strokeWidth={2.25} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-semibold text-sm flex items-center gap-2 text-slate-900">
        <span className="truncate">{title}</span>
        {badge && (
          <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full shrink-0">
            {badge}
          </span>
        )}
      </div>
      <div className={`text-xs text-slate-500 mt-0.5 ${compact ? "line-clamp-1" : ""}`}>{desc}</div>
    </div>
    <ChevronRight size={18} className="text-orange-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all shrink-0" />
  </button>
);

// Phase countdown chip — reused by every active phase. Extracted because the
// trio of inline JSX blocks were drifting visually as we added phases.
const PhaseCountdown = ({
  phase,
  shuttleSec,
  departureSec,
  etaSec,
  isSimulating,
}: {
  phase: JourneyPhase;
  shuttleSec: number;
  departureSec: number;
  etaSec: number;
  isSimulating: boolean;
}) => {
  let label: string | null = null;
  let seconds = 0;
  if (phase === "waiting_shuttle")     { label = isSimulating ? "Giả lập" : "Xe đến sau"; seconds = shuttleSec; }
  else if (phase === "at_terminal")    { label = isSimulating ? "Giả lập" : "Xe khởi hành"; seconds = departureSec; }
  else if (["shuttle_onboard", "boarded", "in_transit", "near_rest", "at_rest", "resuming"].includes(phase))
                                       { label = isSimulating ? "Giả lập" : "Còn lại"; seconds = etaSec; }
  if (!label) return null;
  const expired = seconds <= 0;
  return (
    <div className="text-right shrink-0">
      <div className="bg-white rounded-xl px-3 py-2 border border-orange-200 shadow-sm">
        <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wide">{label}</div>
        <div className={`text-xl font-mono font-bold tabular-nums ${expired ? "text-red-500" : "text-orange-600"}`}>
          {formatDuration(seconds)}
        </div>
      </div>
    </div>
  );
};

// Primary CTA button used for phase advancement. Pulled out so the orange
// pill style stays consistent across all 9 phases.
const PrimaryCta = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-sm hover:from-orange-600 hover:to-orange-700 hover:shadow-md active:scale-[0.99] transition-all"
  >
    {children}
  </button>
);

// Inline informational banner. Tones cover the two used in this view; easy
// to extend (sky / red) without touching call sites.
const StatusBanner = ({
  children,
  tone,
  Icon,
}: {
  children: React.ReactNode;
  tone: "emerald" | "amber";
  Icon?: LucideIcon;
}) => {
  const styles = tone === "emerald"
    ? { wrap: "bg-emerald-50 border-emerald-200 text-emerald-800", icon: "text-emerald-600" }
    : { wrap: "bg-amber-50 border-amber-200 text-amber-800",     icon: "text-amber-600" };
  const Resolved = Icon ?? Check;
  return (
    <div className={`p-4 rounded-xl border text-sm flex items-start gap-2.5 ${styles.wrap}`}>
      <Resolved size={18} className={`shrink-0 mt-0.5 ${styles.icon}`} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

// Demo affordance: small underline button to skip a phase without going
// through its real interaction. Standardised so its visual weight stays
// consistently low regardless of which phase renders it.
const DemoSkipButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="w-full text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
  >
    [Demo] {label}
  </button>
);

// Compact button for the simulation controls strip.
const SimBtn = ({
  onClick,
  Icon,
  children,
}: {
  onClick: () => void;
  Icon: LucideIcon;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition"
  >
    <Icon size={12} />
    {children}
  </button>
);

// Visualizes the bus's progress along the TPHCM → Đà Lạt route (304 km).
// Highlights Madagui rest stop at ~55% of the route when `highlightRest` is on.
const RouteVisual = ({ progress, highlightRest }: { progress: number; highlightRest?: boolean }) => {
  const totalKm = 304;
  return (
    <div className="p-4 rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between text-xs mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="font-semibold text-slate-900">TP.HCM</span>
        </div>
        <span className="text-slate-500 font-medium tabular-nums">
          {Math.round(progress * totalKm)} / {totalKm} km
        </span>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900">Đà Lạt</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </div>
      <div className="relative h-2.5 bg-slate-100 rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-[55%] -ml-1.5 w-3 h-3 rounded-full border-2 border-white ${
            highlightRest ? "bg-amber-500 animate-pulse shadow-sm" : "bg-slate-400"
          }`}
          title="Trạm Madagui"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -ml-3 transition-[left] duration-700 ease-out"
          style={{ left: `${progress * 100}%` }}
        >
          <div className="w-6 h-6 rounded-full bg-white border-2 border-orange-500 grid place-items-center text-orange-600 shadow-sm">
            <Bus size={12} strokeWidth={2.5} />
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-500">
        <span>0 km</span>
        <span className={highlightRest ? "text-amber-600 font-semibold" : ""}>
          {madaguiRestStop.name} 165km
        </span>
        <span>{totalKm} km</span>
      </div>
    </div>
  );
};
