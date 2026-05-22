import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Radar,
  MapPin,
  Ticket,
  AlertTriangle,
  Phone,
  UtensilsCrossed,
  Star,
  PartyPopper,
  Check,
  ChevronRight,
  Clock3,
  type LucideIcon,
} from "lucide-react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import {
  useJourney,
  PHASE_ORDER,
  PHASE_INFO,
  type JourneyPhase,
} from "@/contexts/JourneyContext";
import { madaguiRestStop } from "@/data/restStop";
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
import {
  ROUTE_WAYPOINTS,
  REST_STOP_PROGRESS,
  ARRIVAL_THRESHOLD_M,
  ANIMATION_DURATION_MS,
} from "@/data/routeWaypoints";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";


// Journey Tracker — the user's home base while a journey is active.
// Now features automatic map-based simulation like FUTA Rada.

export const TripProgress = () => {
  const router = useRouter();
  const {
    activeJourney,
    advancePhase,
    endJourney,
    setPhase,
  } = useJourney();

  const phase = activeJourney?.phase;

  // Route and animation state
  const [pathProfile, setPathProfile] = useState<PathProfile | null>(null);
  const [progress, setProgress] = useState(0);
  const [restStopLoc, setRestStopLoc] = useState<LatLng | null>(null);
  const [arrivedAtRest, setArrivedAtRest] = useState(false);
  const [arrivedAtDest, setArrivedAtDest] = useState(false);

  // Calculate bus position from progress
  const originLoc = ROUTE_WAYPOINTS[0].location;
  const destLoc = ROUTE_WAYPOINTS[2].location;
  
  const busLoc = useMemo<LatLng>(() => {
    if (!pathProfile) return originLoc;
    return interpolateAlongPath(pathProfile, progress);
  }, [pathProfile, progress, originLoc]);

  // Calculate distance to rest stop and destination
  const distanceToRest = useMemo(() => {
    if (!restStopLoc || !busLoc) return Infinity;
    return haversineMeters(busLoc, restStopLoc);
  }, [busLoc, restStopLoc]);

  const distanceToDest = useMemo(() => {
    if (!destLoc || !busLoc) return Infinity;
    return haversineMeters(busLoc, destLoc);
  }, [busLoc, destLoc]);

  // ETA calculation
  const etaSeconds = useMemo(() => {
    if (!pathProfile || pathProfile.totalMeters === 0) return 0;
    const remaining = pathProfile.totalMeters * (1 - progress);
    const avgMps = pathProfile.totalMeters / (ANIMATION_DURATION_MS / 1000);
    return avgMps > 0 ? remaining / avgMps : 0;
  }, [pathProfile, progress]);

  // If the user lands here without an active journey, send them home
  useEffect(() => {
    if (!activeJourney) {
      toast.info("Bạn chưa có chuyến đang hoạt động");
      router.replace("/");
    }
  }, [activeJourney, router]);

  // Automatic animation based on phase
  useEffect(() => {
    if (!pathProfile || !phase) return;
    
    // Map phase to target progress
    let targetProgress = 0;
    let shouldAnimate = false;
    
    switch (phase) {
      case "boarded":
        targetProgress = 0;
        shouldAnimate = false;
        break;
      case "in_transit":
        targetProgress = REST_STOP_PROGRESS;
        shouldAnimate = true;
        break;
      case "near_rest":
      case "at_rest":
        targetProgress = REST_STOP_PROGRESS;
        shouldAnimate = false;
        break;
      case "resuming":
        targetProgress = 1;
        shouldAnimate = true;
        break;
      case "arrived":
        targetProgress = 1;
        shouldAnimate = false;
        break;
      default:
        shouldAnimate = false;
    }
    
    if (!shouldAnimate) {
      setProgress(targetProgress);
      return;
    }
    
    // Calculate animation duration based on distance to travel
    const currentProgress = progress;
    const distanceToTravel = targetProgress - currentProgress;
    const totalDistance = targetProgress === 1 ? 1 - REST_STOP_PROGRESS : REST_STOP_PROGRESS;
    const segmentDuration = (distanceToTravel / totalDistance) * ANIMATION_DURATION_MS;
    
    let raf = 0;
    let start = 0;
    const startProgress = currentProgress;
    
    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;
      const p = Math.min(targetProgress, startProgress + (elapsed / segmentDuration) * distanceToTravel);
      setProgress(p);
      if (p < targetProgress) raf = requestAnimationFrame(tick);
    };
    
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathProfile, phase, progress]);

  // Auto-advance phases when reaching waypoints
  useEffect(() => {
    if (!phase) return;
    
    // Check if arrived at rest stop
    if (phase === "in_transit" && distanceToRest <= ARRIVAL_THRESHOLD_M && !arrivedAtRest) {
      setArrivedAtRest(true);
      setPhase("near_rest");
      toast("🍽️ Sắp đến trạm dừng Madagui", {
        description: "Đặt đồ ăn trước để pickup nhanh khi xe dừng!",
        duration: 6000,
      });
    }
    
    // Check if arrived at destination
    if (phase === "resuming" && distanceToDest <= ARRIVAL_THRESHOLD_M && !arrivedAtDest) {
      setArrivedAtDest(true);
      setPhase("arrived");
      toast.success("Chuyến đi đã hoàn thành 🎉", {
        description: "Hãy chia sẻ trải nghiệm với FUTA nhé",
      });
    }
  }, [phase, distanceToRest, distanceToDest, arrivedAtRest, arrivedAtDest, setPhase]);

  // Reset arrival flags when phase changes
  useEffect(() => {
    if (phase === "boarded") {
      setArrivedAtRest(false);
      setArrivedAtDest(false);
      setProgress(0);
    }
  }, [phase]);

  if (!activeJourney || !phase) return null;

  const { booking, cart, pickedUp, foundBusAtTerminal } = activeJourney;
  const { trip, seats } = booking;
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const phaseIdx = PHASE_ORDER.indexOf(phase);
  const info = PHASE_INFO[phase as JourneyPhase];

  // Handle no API key case
  if (!API_KEY) {
    return (
      <PageShell title="Hành trình của bạn" backTo="/" width="wide">
        <div className="max-w-3xl mx-auto space-y-4">
          <NoApiKeyNotice />
          <button
            onClick={() => {
              if (phase === "arrived") {
                endJourney();
                router.push("/");
              } else {
                advancePhase();
              }
            }}
            className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
          >
            {phase === "arrived" ? "Đóng hành trình" : "Tiếp tục (demo)"}
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Hành trình của bạn" backTo="/" width="wide">
      <APIProvider
        apiKey={API_KEY}
        libraries={["routes", "marker"]}
        language="vi"
        region="VN"
      >
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
                  etaSeconds={etaSeconds}
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
                onClick={() => router.push("/futa-rada")}
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
                onClick={() => router.push("/terminal-map")}
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
                onClick={() => router.push("/ticket")}
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
              <TripMap
                originLoc={originLoc}
                destLoc={destLoc}
                busLoc={busLoc}
                restStopLoc={restStopLoc}
                onPathReady={setPathProfile}
                onRestStopCalculated={setRestStopLoc}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ActionBtn
                  Icon={AlertTriangle}
                  title="Quick Report"
                  desc="Báo cáo vấn đề trên xe"
                  onClick={() => router.push("/quick-report")}
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
              <TripMap
                originLoc={originLoc}
                destLoc={destLoc}
                busLoc={busLoc}
                restStopLoc={restStopLoc}
                onPathReady={setPathProfile}
                onRestStopCalculated={setRestStopLoc}
                highlightRest
              />
              <ActionBtn
                Icon={UtensilsCrossed}
                title="Đặt món tại trạm dừng"
                desc="Smart Stop — pickup bằng QR khi xe dừng"
                onClick={() => router.push("/smart-stop")}
                badge={cartCount > 0 ? `${cartCount} món` : undefined}
              />
              <ActionBtn
                Icon={AlertTriangle}
                title="Quick Report"
                desc="Báo cáo vấn đề trên xe"
                onClick={() => router.push("/quick-report")}
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
                  onClick={() => router.push("/smart-stop")}
                />
              ) : (
                <ActionBtn
                  Icon={UtensilsCrossed}
                  title="Đặt món nhanh"
                  desc="Vẫn còn thời gian — đặt và pickup tại quầy"
                  onClick={() => router.push("/smart-stop")}
                />
              )}
              <PrimaryCta onClick={advancePhase}>Xe tiếp tục khởi hành</PrimaryCta>
            </>
          )}

          {phase === "resuming" && (
            <>
              <TripMap
                originLoc={originLoc}
                destLoc={destLoc}
                busLoc={busLoc}
                restStopLoc={restStopLoc}
                onPathReady={setPathProfile}
                onRestStopCalculated={setRestStopLoc}
              />
              <ActionBtn
                Icon={AlertTriangle}
                title="Quick Report"
                desc="Báo cáo vấn đề trên xe"
                onClick={() => router.push("/quick-report")}
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
                onClick={() => router.push("/post-trip-feedback")}
              />
              <button
                onClick={() => {
                  endJourney();
                  router.push("/");
                  toast.success("Đã kết thúc hành trình");
                }}
                className="w-full py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Đóng hành trình
              </button>
            </>
          )}
        </section>

        {/* Live trip stats */}
        {pathProfile && (phase === "in_transit" || phase === "near_rest" || phase === "resuming") && (
          <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[11px] text-slate-500 mb-1">Quãng đường</div>
                <div className="font-bold text-slate-900">
                  {formatMeters(pathProfile.totalMeters * (1 - progress))}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 mb-1">ETA</div>
                <div className="font-bold text-slate-900">{formatDuration(etaSeconds)}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 mb-1">Tiến độ</div>
                <div className="font-bold text-slate-900">{Math.round(progress * 100)}%</div>
              </div>
            </div>
          </section>
        )}
      </div>
      </APIProvider>
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

// Phase countdown chip — simplified for map-based simulation
const PhaseCountdown = ({
  phase,
  etaSeconds,
}: {
  phase: JourneyPhase;
  etaSeconds: number;
}) => {
  let label: string | null = null;
  let seconds = 0;
  if (["shuttle_onboard", "boarded", "in_transit", "near_rest", "at_rest", "resuming"].includes(phase)) {
    label = "Còn lại";
    seconds = etaSeconds;
  }
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


// Trip map component with automatic animation
const TripMap = ({
  originLoc,
  destLoc,
  busLoc,
  restStopLoc,
  onPathReady,
  onRestStopCalculated,
  highlightRest,
}: {
  originLoc: LatLng;
  destLoc: LatLng;
  busLoc: LatLng;
  restStopLoc: LatLng | null;
  onPathReady: (p: PathProfile) => void;
  onRestStopCalculated: (loc: LatLng) => void;
  highlightRest?: boolean;
}) => {
  const center = useMemo<LatLng>(
    () => ({
      lat: (originLoc.lat + destLoc.lat) / 2,
      lng: (originLoc.lng + destLoc.lng) / 2,
    }),
    [originLoc, destLoc],
  );

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 grid place-items-center shrink-0 shadow-sm">
            <Radar size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm text-slate-900 leading-tight">Theo dõi hành trình</div>
            <div className="text-[11px] text-slate-500 truncate">
              TP.HCM → Đà Lạt
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live GPS
        </span>
      </div>

      <div className="relative h-[400px] bg-slate-100">
        <Map
          mapId={MAP_ID}
          defaultCenter={center}
          defaultZoom={8}
          mapTypeId="roadmap"
          tilt={0}
          gestureHandling="greedy"
          disableDefaultUI
          zoomControl
        >
          <FitBounds origin={originLoc} dest={destLoc} />
          <DrivingDirections
            origin={originLoc}
            dest={destLoc}
            onPathReady={onPathReady}
            onRestStopCalculated={onRestStopCalculated}
          />
          <AdvancedMarker position={originLoc} title="Bến xe Miền Tây">
            <Pin background="#0ea5e9" borderColor="#075985" glyphColor="#ffffff" glyph="🚌" />
          </AdvancedMarker>
          {restStopLoc && (
            <AdvancedMarker position={restStopLoc} title="Trạm dừng Madagui">
              <Pin
                background={highlightRest ? "#f59e0b" : "#64748b"}
                borderColor={highlightRest ? "#b45309" : "#475569"}
                glyphColor="#ffffff"
                glyph="🍽️"
              />
            </AdvancedMarker>
          )}
          <AdvancedMarker position={destLoc} title="Bến xe Đà Lạt">
            <Pin background="#10b981" borderColor="#047857" glyphColor="#ffffff" glyph="🏁" />
          </AdvancedMarker>
          <AdvancedMarker position={busLoc} title="Xe của bạn">
            <Pin background="#f97316" borderColor="#9a3412" glyphColor="#ffffff" glyph="🚌" />
          </AdvancedMarker>
        </Map>
      </div>
    </div>
  );
};

// Camera autofit
const FitBounds = ({ origin, dest }: { origin: LatLng; dest: LatLng }) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(origin);
    bounds.extend(dest);
    map.fitBounds(bounds, 80);
  }, [map, origin, dest]);
  return null;
};

// Driving directions with rest stop calculation
const DrivingDirections = ({
  origin,
  dest,
  onPathReady,
  onRestStopCalculated,
}: {
  origin: LatLng;
  dest: LatLng;
  onPathReady: (p: PathProfile) => void;
  onRestStopCalculated: (loc: LatLng) => void;
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
        if (path.length > 1) {
          const profile = buildPathProfile(path);
          onPathReady(profile);
          // Calculate rest stop location at 55% of route
          const restStopLoc = interpolateAlongPath(profile, REST_STOP_PROGRESS);
          onRestStopCalculated(restStopLoc);
        }
      })
      .catch((err) => {
        console.warn("[TripProgress] directions failed:", err);
      });
    return () => {
      cancelled = true;
    };
  }, [routesLib, origin, dest, onPathReady, onRestStopCalculated]);

  return null;
};

// No API key notice
const NoApiKeyNotice = () => (
  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-900 leading-relaxed">
    ⚙️ Theo dõi hành trình cần{" "}
    <code className="px-1 bg-white border border-amber-200 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>{" "}
    trong{" "}
    <code className="px-1 bg-white border border-amber-200 rounded">.env.local</code>{" "}
    để hiển thị bản đồ thời gian thực.
  </div>
);
