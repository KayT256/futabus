import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useWallet, type Transaction } from "@/contexts/WalletContext";
import { TopUpSheet } from "@/components/TopUpSheet";

// FUTAPay — closed-loop wallet for FUTA Bus Lines.
// Surface area:
//   1) Balance hero with brand visual + balance + primary CTA (top-up).
//   2) FUTA usage stats — total spent on FUTA, total saved with vouchers, total topped up.
//      These reinforce that FUTAPay is THE way to pay for FUTA services.
//   3) Linked sources strip — cards/banks the user can top up from.
//   4) Transaction history — newest first, type-coded icons.
//   5) Top-up modal — pick source, pick amount (preset chips + custom), confirm.

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}đ`;

const TX_TYPE_META = {
  topup: {
    label: "Nạp tiền",
    icon: "↓",
    chipBg: "bg-emerald-50",
    chipText: "text-emerald-700",
    sign: "+" as const,
    amountColor: "text-emerald-600",
  },
  payment: {
    label: "Thanh toán",
    icon: "↑",
    chipBg: "bg-orange-50",
    chipText: "text-orange-700",
    sign: "−" as const,
    amountColor: "text-slate-900",
  },
  refund: {
    label: "Hoàn tiền",
    icon: "↺",
    chipBg: "bg-sky-50",
    chipText: "text-sky-700",
    sign: "+" as const,
    amountColor: "text-sky-700",
  },
} as const;

// Vietnamese-friendly relative timestamps. Anything within today shows the wall clock,
// otherwise we fall back to a short DD/MM formatting.
const formatTime = (iso: string) => {
  const d = new Date(iso);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  if (sameDay) {
    return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
};

const TransactionRow = ({ tx }: { tx: Transaction }) => {
  const meta = TX_TYPE_META[tx.type];
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className={`w-10 h-10 rounded-full grid place-items-center text-lg font-bold shrink-0 ${meta.chipBg} ${meta.chipText}`}
      >
        {meta.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-slate-900 truncate">{tx.description}</div>
        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
          <span>{meta.label}</span>
          <span>·</span>
          <span>{formatTime(tx.timestamp)}</span>
          {tx.voucherSaved && tx.voucherSaved > 0 && (
            <>
              <span>·</span>
              <span className="text-emerald-600 font-medium">Tiết kiệm {formatVND(tx.voucherSaved)}</span>
            </>
          )}
        </div>
      </div>
      <div className={`text-sm font-bold whitespace-nowrap ${meta.amountColor}`}>
        {meta.sign}
        {formatVND(tx.amount)}
      </div>
    </div>
  );
};

// Tabs that filter the transaction history. Index `all` keeps everything; the other two
// match the most common questions the user will have ("how much have I topped up?" /
// "where has my money gone?").
type TxFilter = "all" | "topup" | "payment";

export const FUTAPay = () => {
  const navigate = useNavigate();
  const {
    balance,
    transactions,
    linkedSources,
    topUp,
    totalSpentOnFuta,
    totalSavedFromVouchers,
    totalToppedUp,
  } = useWallet();

  const [showTopUp, setShowTopUp] = useState(false);
  const [filter, setFilter] = useState<TxFilter>("all");

  // Filter + cap the visible list. We keep the cap generous (50) since transactions
  // are tiny objects and scrolling is cheap.
  const visibleTransactions = useMemo(() => {
    const filtered = filter === "all" ? transactions : transactions.filter((t) => t.type === filter);
    return filtered.slice(0, 50);
  }, [transactions, filter]);

  return (
    <main className="min-h-screen bg-slate-50 pb-12">
      {/* Sticky back-button header — matches the rest of the new pages. */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-700 hover:text-orange-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Quay lại</span>
          </button>
          <span className="ml-3 text-base font-semibold text-slate-900">FUTAPay</span>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* ── BALANCE HERO ─────────────────────────────────────────── */}
        <section className="rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* White rounded square to give the brand mark a clean background */}
              <div className="w-9 h-9 rounded-lg bg-white grid place-items-center overflow-hidden">
                <img src="/futapay-logo.png" alt="FUTAPay" className="max-w-[80%] max-h-[80%] object-contain" />
              </div>
              <div className="font-semibold">FUTAPay</div>
            </div>
            <div className="text-[10px] tracking-[0.3em] opacity-80">VÍ FUTA</div>
          </div>

          <div className="mt-5">
            <div className="text-[11px] uppercase tracking-wider opacity-80">Số dư khả dụng</div>
            <div className="text-3xl font-bold mt-1 tabular-nums">{formatVND(balance)}</div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowTopUp(true)}
              className="py-2.5 rounded-full bg-white text-emerald-700 font-semibold text-sm hover:bg-emerald-50 transition flex items-center justify-center gap-1"
            >
              <span>＋</span> Nạp tiền
            </button>
            <button
              onClick={() => toast.info("Quét QR thanh toán — coming soon")}
              className="py-2.5 rounded-full bg-emerald-800/40 border border-white/30 text-white font-semibold text-sm hover:bg-emerald-800/60 transition flex items-center justify-center gap-1"
            >
              <span>⌗</span> Quét QR
            </button>
          </div>
        </section>

        {/* ── FUTA USAGE STATS ─────────────────────────────────────── */}
        <section className="grid grid-cols-3 gap-2">
          <StatCard label="Đã chi cho FUTA" value={formatVND(totalSpentOnFuta)} accent="orange" />
          <StatCard label="Tiết kiệm voucher" value={formatVND(totalSavedFromVouchers)} accent="emerald" />
          <StatCard label="Đã nạp" value={formatVND(totalToppedUp)} accent="slate" />
        </section>

        {/* ── LINKED SOURCES ───────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Nguồn nạp đã liên kết</h3>
            <button
              onClick={() => toast.info("Liên kết nguồn mới — coming soon")}
              className="text-xs text-orange-600 font-medium hover:underline"
            >
              + Thêm
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {linkedSources.map((s) => (
              <div
                key={s.id}
                className="shrink-0 w-32 border border-slate-200 rounded-xl p-3 bg-slate-50"
              >
                <div className="h-8 flex items-center mb-2">
                  <img src={s.logo} alt={s.label} className="max-h-7 max-w-[80px] object-contain" />
                </div>
                <div className="text-xs font-semibold text-slate-900 truncate">{s.label}</div>
                <div className="text-[11px] text-slate-500">{s.masked}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TRANSACTION HISTORY ──────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-900">Lịch sử giao dịch</h3>
            <span className="text-[11px] text-slate-500">{transactions.length} giao dịch</span>
          </div>
          <div className="flex gap-1.5 mb-1">
            {(["all", "topup", "payment"] as TxFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  filter === f
                    ? "bg-orange-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-orange-50"
                }`}
              >
                {f === "all" ? "Tất cả" : f === "topup" ? "Nạp tiền" : "Thanh toán"}
              </button>
            ))}
          </div>
          <div className="divide-y divide-slate-100">
            {visibleTransactions.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-500">Chưa có giao dịch nào</div>
            ) : (
              visibleTransactions.map((tx) => <TransactionRow key={tx.id} tx={tx} />)
            )}
          </div>
        </section>
      </div>

      {/* ── TOP-UP SHEET ────────────────────────────────── */}
      {showTopUp && (
        <TopUpSheet
          onClose={() => setShowTopUp(false)}
          onConfirm={(amount, sourceId) => {
            topUp({ amount, sourceId });
            setShowTopUp(false);
            toast.success("Nạp thành công!", {
              description: `Đã cộng ${formatVND(amount)} vào ví FUTAPay.`,
            });
          }}
        />
      )}
    </main>
  );
};

// Small stat card component — kept inline so the tone scheme (orange/emerald/slate) stays
// readable next to the data it describes.
const StatCard = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "orange" | "emerald" | "slate";
}) => {
  const accentClass =
    accent === "orange"
      ? "text-orange-600"
      : accent === "emerald"
        ? "text-emerald-600"
        : "text-slate-700";
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-3">
      <div className="text-[10px] tracking-wider uppercase text-slate-500">{label}</div>
      <div className={`text-sm font-bold mt-1 tabular-nums truncate ${accentClass}`}>{value}</div>
    </div>
  );
};

