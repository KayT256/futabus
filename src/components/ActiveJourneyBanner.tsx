import { useNavigate } from "react-router-dom";
import { useJourney, PHASE_INFO } from "@/contexts/JourneyContext";

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

  return (
    <div className="max-w-[1128px] mx-auto px-4 pt-4">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-4 flex items-center gap-3 sm:gap-4 shadow-sm">
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
          Hành trình của bạn
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
