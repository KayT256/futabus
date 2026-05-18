import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useJourney } from "@/contexts/JourneyContext";
import { getTerminalByName } from "@/data/terminals";
import { PageShell } from "@/components/PageShell";

// "Tìm xe tại bến" — static wayfinding card.
//
// Originally we tried to animate a pedestrian marker walking from the entrance
// to the bus, but the source asset already has the route annotated in cyan and
// the user only walks ~200m so an animated simulation adds little value (and
// risked drifting away from the operations-team-vetted path). Keeping it as a
// crisp static image means the route can't ever go "through" a bus or building
// — it always exactly matches whatever the operations team draws on the asset.
//
// Live wayfinding simulation lives on the FUTA Rada side (vehicle tracking),
// which is the screen where motion actually helps the rider.

export const TerminalMap = () => {
  const navigate = useNavigate();
  const { activeJourney, setFoundBusAtTerminal } = useJourney();

  // Guard: if the user lands here without an active journey (refresh, shared URL)
  // we bounce them home with a toast rather than rendering an empty shell.
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

  return (
    <PageShell title="Tìm xe tại bến" backTo="/trip-progress" width="wide">
      <div className="max-w-md mx-auto space-y-4">
        {/* Map card */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-sm text-slate-900 truncate">{terminal.name}</div>
              <div className="text-[11px] text-slate-500 truncate" title={terminal.address}>
                {terminal.address}
              </div>
            </div>
            <div className="text-[10px] bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium shrink-0">
              Bản đồ tĩnh
            </div>
          </div>

          {/* Static image with the route already drawn on by ops team.
              object-contain (not cover) so the entire annotated path stays
              visible regardless of viewport aspect ratio. */}
          <div className="bg-slate-100">
            <img
              src="/western-bus-station.png"
              alt={`Bản đồ ${terminal.name} — đường đi tới xe`}
              className="w-full h-auto block"
            />
          </div>

          <div className="px-4 py-3 border-t border-zinc-200 grid grid-cols-3 gap-2 bg-orange-50/50">
            <Stat label="Cổng vào" value="P – Kinh Dương Vương" />
            <Stat label="Biển số" value={trip.licensePlate} />
            <Stat label="Vị trí xe" value={terminal.parkingSpot} accent />
          </div>
        </div>

        {/* Turn-by-turn list — text fallback for accessibility and for riders
            who prefer instructions over the map. Stays in sync with the cyan
            route drawn on the static image. */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-zinc-200 font-semibold text-sm text-slate-900">
            🧭 Hướng dẫn đi bộ trong bến
          </div>
          <ol className="divide-y divide-zinc-100">
            {terminal.walkingSteps.map((step, i) => (
              <li key={i} className="px-4 py-3 flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full grid place-items-center text-xs font-bold shrink-0 mt-0.5 bg-orange-100 text-orange-600">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm leading-snug text-slate-800">{step.instruction}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{step.distance}</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="px-4 py-3 border-t border-zinc-100 text-[11px] text-slate-500">
            Đi qua {terminal.pillarLandmark} → xe đỗ ở vị trí <b>{terminal.parkingSpot}</b>
          </div>
        </div>

        <button
          onClick={handleArrived}
          className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
        >
          ✓ Đã tìm thấy xe — Lên xe
        </button>
      </div>
    </PageShell>
  );
};

const Stat = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="min-w-0">
    <div className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</div>
    <div className={`font-semibold text-sm truncate ${accent ? "text-orange-600" : "text-slate-900"}`}>{value}</div>
  </div>
);
