import { useRouter } from "next/navigation";
import { useJourney, PHASE_INFO, PHASE_ORDER, type JourneyPhase } from "@/contexts/JourneyContext";

// Phase-driven quick actions surface the right tools at the right time so users
// don't have to remember which feature lives where during a multi-hour trip.
// Pre-departure (waiting/at-terminal): shuttle radar + terminal wayfinding.
// On-board (boarded → resuming): Smart Stop (pre-order food) + Quick Report.
const phaseQuickActions = (phase: JourneyPhase) => {
  const preDeparture: JourneyPhase[] = ["waiting_shuttle", "shuttle_onboard", "at_terminal"];
  const onboard: JourneyPhase[] = ["boarded", "in_transit", "near_rest", "at_rest", "resuming"];

  if (preDeparture.includes(phase)) {
    return [
      { label: "Shuttle FUTA Rada", icon: "🚐", to: "/futa-rada" },
      { label: "Bản đồ bến xe", icon: "🏢", to: "/terminal-map" },
    ];
  }
  if (onboard.includes(phase)) {
    return [
      { label: "Đặt món Smart Stop", icon: "🍽️", to: "/smart-stop" },
      { label: "Báo vấn đề", icon: "🚨", to: "/quick-report" },
    ];
  }
  return [];
};

// Compact 3-step stepper labels. Maps the 9 underlying phases into 3 user-facing
// milestones so the home banner stays digestible at a glance.
const STEPS = [
  { label: "Chuẩn bị", phases: ["waiting_shuttle", "shuttle_onboard", "at_terminal"] as JourneyPhase[] },
  { label: "Trên xe", phases: ["boarded", "in_transit", "near_rest", "at_rest", "resuming"] as JourneyPhase[] },
  { label: "Đến nơi", phases: ["arrived"] as JourneyPhase[] },
];

const activeStepIndex = (phase: JourneyPhase) =>
  STEPS.findIndex((s) => s.phases.includes(phase));

// Vietnamese-friendly short trip header — "15/05/2026 · 23:30 → 06:00".
const formatTrip = (date: string, dep: string, arr: string) => `${date} · ${dep} → ${arr}`;

// Sticky banner on the homepage when the user has a journey in flight.
// Acts as a shortcut back into the Journey Tracker so they don't have to dig
// through the account menu while they're mid-trip.
//
// Visual design matches the FUTA core: orange-tinted card sitting in the
// 1128px content rail, intertight font, rounded-2xl + soft outline halo to feel
// like the BookingHero search card it sits below.
export const ActiveJourneyBanner = () => {
  const router = useRouter();
  const { activeJourney } = useJourney();

  if (!activeJourney) return null;

  const { booking, phase } = activeJourney;
  const { trip, seats } = booking;
  const info = PHASE_INFO[phase];
  const actions = phaseQuickActions(phase);
  const stepIdx = activeStepIndex(phase);
  // Rough completion percentage based on which of the 9 phases we're at — drives the
  // gradient progress fill on the bar.
  const completionPct = Math.round(((PHASE_ORDER.indexOf(phase) + 1) / PHASE_ORDER.length) * 100);

  return (
    <section className="max-w-[1128px] mx-auto px-3 md:px-0 mt-4 md:mt-8">
      {/* Outer card mimics the BookingHero search box halo (orange-800/10 outline + orange-600/60 border)
          so it feels like a peer of the search card it follows. */}
      <div className="relative bg-white outline outline-8 outline-orange-800/10 border border-orange-600/60 rounded-2xl overflow-hidden shadow-sm">
        {/* Top hero strip — white-on-orange with the FUTA brand tone */}
        <div className="relative bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white px-5 py-4 md:px-6 md:py-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 backdrop-blur grid place-items-center text-2xl md:text-3xl ring-1 ring-white/30 shrink-0">
              {info.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-white/90">
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                  </span>
                  CHUYẾN ĐANG HOẠT ĐỘNG
                </span>
              </div>
              <div className="font-bold text-base md:text-lg truncate mt-0.5">{trip.route}</div>
              <div className="text-xs md:text-sm text-white/90 truncate">
                {formatTrip(trip.date, trip.departureTime, trip.arrivalTime)} · Ghế {seats.join(", ")}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button
                onClick={() => router.push("/ticket")}
                className="text-xs px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold backdrop-blur ring-1 ring-white/30 transition"
              >
                Xem vé
              </button>
              <button
                onClick={() => router.push("/trip-progress")}
                className="text-xs px-5 py-2 rounded-full bg-white text-orange-600 font-bold hover:bg-orange-50 transition flex items-center gap-1.5"
              >
                Hành trình
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile CTAs — two equal-width buttons below the title block */}
          <div className="flex md:hidden items-center gap-2 mt-3">
            <button
              onClick={() => router.push("/ticket")}
              className="flex-1 text-xs px-3 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold backdrop-blur ring-1 ring-white/30 transition"
            >
              Xem vé
            </button>
            <button
              onClick={() => router.push("/trip-progress")}
              className="flex-1 text-xs px-3 py-2 rounded-full bg-white text-orange-600 font-bold hover:bg-orange-50 transition"
            >
              Hành trình →
            </button>
          </div>
        </div>

        {/* Body — progress stepper + phase sub-label + quick actions */}
        <div className="px-5 py-4 md:px-6 md:py-5">
          {/* 3-step milestone bar. Inactive steps are zinc, active is orange, completed is emerald.
              The continuous progress bar underneath reflects fine-grained phase progression. */}
          <div className="flex items-center gap-2">
            {STEPS.map((step, i) => {
              const state = i < stepIdx ? "done" : i === stepIdx ? "active" : "todo";
              return (
                <div key={step.label} className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-bold transition ${
                        state === "done"
                          ? "bg-emerald-500 text-white"
                          : state === "active"
                            ? "bg-orange-500 text-white ring-4 ring-orange-100"
                            : "bg-zinc-200 text-zinc-500"
                      }`}
                    >
                      {state === "done" ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-[11px] md:text-xs font-medium ${
                        state === "todo" ? "text-zinc-400" : state === "done" ? "text-emerald-600" : "text-orange-600"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fine-grained progress bar — connects the stepper to the 9-phase model. */}
          <div className="mt-3 h-1.5 rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPct}%` }}
            />
          </div>

          {/* Current phase sub-label — "Đang di chuyển — Trên đường tới Đà Lạt" */}
          <div className="mt-3 text-xs md:text-sm text-zinc-600">
            <span className="font-semibold text-zinc-900">{info.label}</span>
            <span className="text-zinc-500"> — {info.sub}</span>
          </div>

          {/* Phase-aware quick actions */}
          {actions.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2 md:gap-3">
              {actions.map((a) => (
                <button
                  key={a.to}
                  onClick={() => router.push(a.to)}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-orange-50 hover:border-orange-300 transition text-left"
                >
                  <span className="text-lg shrink-0">{a.icon}</span>
                  <span className="text-xs md:text-sm font-semibold text-zinc-700 group-hover:text-orange-700 truncate">
                    {a.label}
                  </span>
                  <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-orange-500 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
