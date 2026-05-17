import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useJourney } from "@/contexts/JourneyContext";
import { quickReportIssues } from "@/data/quickReportIssues";
import { PageShell } from "@/components/PageShell";

// Quick Report — in-trip "panic button" for the user to flag issues to dispatch.
// Two priority lanes:
//   - "urgent" (dangerous driving, medical emergency) → call hotline + alert on-board phụ xe
//   - "normal" (AC too cold, seat broken, etc.) → normal support queue, ticket # returned
//
// The Send-button auto-attaches GPS + license plate + seat so the user doesn't need
// to type those details when they're stressed/in a hurry.

export const QuickReport = () => {
  const navigate = useNavigate();
  const { activeJourney } = useJourney();

  const [pickedId, setPickedId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [ticketCode] = useState(() => `QR-${Math.floor(Math.random() * 9000) + 1000}`);

  useEffect(() => {
    if (!activeJourney) {
      navigate("/", { replace: true });
    }
  }, [activeJourney, navigate]);

  if (!activeJourney) return null;

  const picked = quickReportIssues.find((i) => i.id === pickedId);

  const handleSend = () => {
    if (!picked) return;
    setSent(true);
    // Different toast for urgent issues — feels more responsive to the user.
    if (picked.priority === "urgent") {
      toast.error("Đã chuyển báo cáo khẩn cấp tới tổng đài", {
        description: "Phụ xe và dispatch đã nhận thông báo cùng lúc",
        duration: 6000,
      });
    } else {
      toast.success("Đã gửi báo cáo", { description: `Mã ticket: #${ticketCode}` });
    }
  };

  // Success state replaces the form entirely once submitted.
  if (sent) {
    return (
      <PageShell title="Quick Report" backTo="/trip-progress" width="wide">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 grid place-items-center">
              <svg className="w-9 h-9 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-semibold mt-4 text-slate-900">Đã gửi báo cáo!</h3>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              Đội ngũ FUTA sẽ phản hồi trong vòng 2 phút. Phụ xe trên xe đã nhận thông báo.
            </p>
            <div className="mt-4 bg-slate-50 rounded-xl p-3 text-left text-xs space-y-1">
              <div className="font-semibold text-slate-900">Mã ticket: #{ticketCode}</div>
              <div className="text-slate-500">Trạng thái: ĐANG XỬ LÝ</div>
              <div className="text-slate-500">
                Loại: {picked?.title} {picked?.priority === "urgent" && "· KHẨN CẤP"}
              </div>
            </div>
            <button
              onClick={() => navigate("/trip-progress")}
              className="w-full mt-5 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
            >
              Quay lại hành trình
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Quick Report" backTo="/trip-progress" width="wide">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          {/* Soft orange banner kept inside the card — the chrome stays neutral via PageShell,
              but the page itself still signals "this is a help/escalation flow" with the
              FUTA orange brand. */}
          <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 ring-1 ring-white/30 grid place-items-center text-xl shrink-0">⚠️</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold">Báo vấn đề ngay</div>
              <div className="text-xs text-white/90">Phụ xe sẽ phản hồi trong ~2 phút</div>
            </div>
          </div>

          <div className="p-4">
            <div className="text-xs text-slate-500 mb-2">Chọn vấn đề bạn gặp phải:</div>
            <div className="grid grid-cols-2 gap-2">
              {quickReportIssues.map((i) => {
                const active = pickedId === i.id;
                return (
                  <button
                    key={i.id}
                    onClick={() => setPickedId(i.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition ${
                      active
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 bg-white hover:border-orange-300"
                    }`}
                  >
                    <div className="text-xl mb-1">{i.icon}</div>
                    <div className="font-medium leading-snug text-slate-900">{i.title}</div>
                    {i.priority === "urgent" && (
                      <div className="mt-1 text-[10px] text-red-600 font-bold tracking-wide">KHẨN CẤP</div>
                    )}
                  </button>
                );
              })}
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Mô tả thêm (không bắt buộc)..."
              className="w-full mt-3 border border-slate-200 rounded-xl p-3 text-sm h-20 resize-none outline-none focus:border-orange-500"
            />

            <div className="text-[11px] text-slate-500 mt-2 flex items-start gap-1.5 leading-relaxed">
              <span>📍</span>
              <span>
                Vị trí GPS, biển số xe <b>{activeJourney.booking.trip.licensePlate}</b> và mã ghế{" "}
                <b>{activeJourney.booking.seats.join(", ")}</b> sẽ được gửi kèm tự động.
              </span>
            </div>

            <button
              disabled={!picked}
              onClick={handleSend}
              className={`w-full mt-4 py-3 rounded-full text-white font-semibold flex items-center justify-center gap-2 transition disabled:bg-orange-200 ${
                picked?.priority === "urgent" ? "bg-red-600 hover:bg-red-700" : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              <span>✉️</span>
              {picked?.priority === "urgent" ? "Gửi báo cáo KHẨN CẤP" : "Gửi báo cáo"}
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
};
