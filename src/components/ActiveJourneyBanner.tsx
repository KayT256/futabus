import { useNavigate } from "react-router-dom";
import { useJourney, PHASE_INFO, type JourneyPhase } from "@/contexts/JourneyContext";

// Phase-driven quick actions surface the right tools at the right time so users
// don't have to remember which feature lives where during a multi-hour trip.
// Pre-departure (waiting/at-terminal): shuttle radar + terminal wayfinding.
// On-board (boarded → resuming): Smart Stop (pre-order food) + Quick Report.
const phaseQuickActions = (phase: JourneyPhase) => {
  const preDeparture: JourneyPhase[] = ["waiting_shuttle", "shuttle_onboard", "at_terminal"];
  const onboard: JourneyPhase[] = ["boarded", "in_transit", "near_rest", "at_rest", "resuming"];

  if (preDeparture.includes(phase)) {
    return [
      { label: "Shuttle FUTA Rada", emoji: "🚐", to: "/futa-rada", tone: "amber" as const },
      { label: "Bản đồ bến xe", emoji: "🏢", to: "/terminal-map", tone: "sky" as const },
    ];
  }
  if (onboard.includes(phase)) {
    return [
      { label: "Đặt món Smart Stop", emoji: "🍽️", to: "/smart-stop", tone: "amber" as const },
      { label: "Báo vấn đề", emoji: "🚨", to: "/quick-report", tone: "rose" as const },
    ];
  }
  return [];
};

const toneClasses: Record<"amber" | "sky" | "rose", string> = {
  amber: "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100",
  sky: "border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100",
  rose: "border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100",
};

// Sticky banner on the homepage when the user has a journey in flight.
// Acts as a shortcut back into the Journey Tracker so they don't have to dig
// through the account menu while they're mid-trip.
export const ActiveJourneyBanner = () => {
  const navigate = useNavigate();
  const { activeJourney } = useJourney();

  if (!activeJourney) return null;

  const { booking, phase } = activeJourney;
  const { trip } = booking;
  const info = PHASE_INFO[phase];
  const actions = phaseQuickActions(phase);

  return (
    <div className="max-w-[1128px] mx-auto px-4 pt-4">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-4 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white grid place-items-center text-2xl shrink-0">
            {info.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold tracking-wider text-emerald-700">CHUYẾN ĐANG HOẠT ĐỘNG</div>
            <div className="font-semibold text-sm text-slate-900 truncate">
              {trip.route} · {trip.date}
            </div>
            <div className="text-xs text-slate-500 truncate">
              {info.label} — Nhấn để theo dõi & dùng các tính năng đi kèm
            </div>
          </div>
          <button
            onClick={() => navigate("/ticket", { state: { from: "home" } })}
            className="hidden sm:inline-flex text-xs px-3 py-2 rounded-full border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50"
          >
            Xem vé
          </button>
          <button
            onClick={() => navigate("/trip-progress")}
            className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 flex items-center gap-2 shrink-0"
          >
            Hành trình
            <span>→</span>
          </button>
        </div>

        {/* Contextual quick-action chips — phase-aware so we never show the wrong tool. */}
        {actions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-emerald-100 grid grid-cols-2 gap-2">
            {actions.map((a) => (
              <button
                key={a.to}
                onClick={() => navigate(a.to)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition ${toneClasses[a.tone]}`}
              >
                <span className="text-base">{a.emoji}</span>
                <span className="truncate">{a.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
