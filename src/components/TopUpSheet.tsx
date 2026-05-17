import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";

// Reusable top-up sheet. Lives at the component level so it can be opened from:
//   - The /futapay page (primary entry)
//   - Smart Pay (when FUTAPay is selected and balance < total)
//   - Smart Stop pay screen (same trigger)
// Supplying `suggestedAmount` lets callers preselect "the smallest amount that covers the
// shortfall, rounded up to the nearest 100K" — that's what we do when balance is short.

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}đ`;

const TOP_UP_PRESETS = [100_000, 200_000, 500_000, 1_000_000, 2_000_000];

// Given the shortfall, pick a preset chip that covers it. Falls back to a custom amount
// rounded up to the nearest 100K so the user can confirm with one tap.
const recommendForShortfall = (shortfall: number): number | null => {
  if (shortfall <= 0) return null;
  const fit = TOP_UP_PRESETS.find((p) => p >= shortfall);
  if (fit) return fit;
  return Math.ceil(shortfall / 100_000) * 100_000;
};

interface Props {
  onClose: () => void;
  // Caller decides what happens after a successful top-up — usually "retry the payment".
  onConfirm: (amount: number, sourceId: string) => void;
  // Display-only context shown above the source picker so the user understands why the
  // sheet appeared (e.g. "Cần thêm 90.000đ để thanh toán vé").
  reason?: string;
  // If provided, preselect the smallest preset that clears the shortfall.
  suggestedAmount?: number;
}

export const TopUpSheet = ({ onClose, onConfirm, reason, suggestedAmount }: Props) => {
  const { linkedSources } = useWallet();

  const recommended = suggestedAmount ? recommendForShortfall(suggestedAmount) : 500_000;
  const matchedPreset = TOP_UP_PRESETS.find((p) => p === recommended) ?? null;

  const [sourceId, setSourceId] = useState(linkedSources[0]?.id ?? "");
  const [amount, setAmount] = useState<number | null>(matchedPreset);
  // If the recommended amount isn't a preset (e.g. shortfall 750K → 800K), pre-fill custom input.
  const [customRaw, setCustomRaw] = useState<string>(
    !matchedPreset && recommended ? String(recommended) : "",
  );

  const effectiveAmount = customRaw ? Number(customRaw.replace(/[^\d]/g, "")) || 0 : (amount ?? 0);
  const canConfirm = effectiveAmount >= 10_000 && !!sourceId;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 grid place-items-end sm:place-items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl p-5 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Nạp tiền vào FUTAPay</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-full hover:bg-slate-100 text-slate-500"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>

        {reason && (
          <div className="mb-3 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
            {reason}
          </div>
        )}

        <div className="text-xs font-semibold text-slate-700 mb-2">Nguồn nạp</div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {linkedSources.map((s) => {
            const active = sourceId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSourceId(s.id)}
                className={`p-2 rounded-xl border-2 text-left flex flex-col items-center gap-1 transition ${
                  active ? "border-orange-500 bg-orange-50" : "border-slate-200 hover:border-orange-200"
                }`}
              >
                <img src={s.logo} alt={s.label} className="h-6 max-w-[70px] object-contain" />
                <div className="text-[11px] font-semibold text-slate-900 truncate w-full text-center">
                  {s.label}
                </div>
                <div className="text-[10px] text-slate-500">{s.masked}</div>
              </button>
            );
          })}
        </div>

        <div className="text-xs font-semibold text-slate-700 mb-2">Số tiền</div>
        <div className="grid grid-cols-3 gap-2">
          {TOP_UP_PRESETS.map((p) => {
            const active = !customRaw && amount === p;
            return (
              <button
                key={p}
                onClick={() => {
                  setAmount(p);
                  setCustomRaw("");
                }}
                className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition ${
                  active
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-slate-200 text-slate-700 hover:border-orange-200"
                }`}
              >
                {formatVND(p)}
              </button>
            );
          })}
        </div>

        <div className="mt-3">
          <label className="text-[11px] text-slate-500">Hoặc nhập số tiền khác (≥ 10.000đ)</label>
          <input
            type="text"
            inputMode="numeric"
            value={customRaw}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^\d]/g, "");
              setCustomRaw(cleaned);
              setAmount(null);
            }}
            placeholder="vd: 750000"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm tabular-nums outline-none focus:border-orange-500"
          />
        </div>

        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="text-slate-500">Sẽ nạp</span>
          <span className="font-bold text-slate-900 tabular-nums">{formatVND(effectiveAmount)}</span>
        </div>

        <button
          disabled={!canConfirm}
          onClick={() => {
            if (canConfirm) onConfirm(effectiveAmount, sourceId);
          }}
          className="w-full mt-3 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-500"
        >
          Xác nhận nạp tiền
        </button>
        <div className="text-[11px] text-slate-500 text-center mt-2">
          Demo — tiền được cộng ngay vào ví và lưu trên thiết bị.
        </div>
      </div>
    </div>
  );
};
