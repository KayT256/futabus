import { PageShell } from "@/components/PageShell";
import { useVouchers } from "@/contexts/VoucherContext";
import { vouchers as staticVouchers } from "@/data/vouchers";
import { getWalletLabel } from "@/data/wallets";

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}đ`;

const formatSaving = (saving: number, label: string) => {
  // Extract percentage from label if present (real-world: display what's advertised)
  const percentMatch = label.match(/(\d+)%/);
  if (percentMatch) {
    return `${percentMatch[1]}%`;
  }
  // Otherwise show the VND amount
  return formatVND(saving);
};

export const VouchersPage = () => {
  const { vouchers: gameVouchers } = useVouchers();

  // Combine static and game vouchers
  const allVouchers = [
    ...staticVouchers.map((v) => ({ ...v, source: "payment" as const, used: false as const })),
    ...gameVouchers,
  ];

  const unusedVouchers = allVouchers.filter((v) => !v.used);
  const usedVouchers = allVouchers.filter((v) => v.used);

  return (
    <PageShell title="Kho Voucher Của Bạn">
      <div className="max-w-6xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">{allVouchers.length}</div>
            <div className="text-xs text-slate-600">Tổng voucher</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-700">{unusedVouchers.length}</div>
            <div className="text-xs text-emerald-600">Có thể dùng</div>
          </div>
          <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
            <div className="text-2xl font-bold text-slate-700">{usedVouchers.length}</div>
            <div className="text-xs text-slate-600">Đã dùng</div>
          </div>
        </div>

        {/* Unused Vouchers */}
        {unusedVouchers.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6">
            <div className="px-4 py-3 border-b border-slate-200 bg-emerald-50">
              <h2 className="font-semibold text-sm text-emerald-900">Voucher Có Thể Dùng ({unusedVouchers.length})</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {unusedVouchers.map((voucher) => (
                  <div
                    key={"id" in voucher ? voucher.id : voucher.code}
                    className={`rounded-xl p-4 border ${
                      voucher.source === "payment"
                        ? "border-slate-200 bg-slate-50"
                        : "border-purple-200 bg-purple-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-sm">{voucher.code}</span>
                      {voucher.tag && (
                        <span className="text-[9px] bg-orange-500 text-white px-1.5 py-0.5 rounded">
                          {voucher.tag}
                        </span>
                      )}
                      {"source" in voucher && voucher.source !== "payment" && (
                        <span className="text-[9px] bg-purple-500 text-white px-1.5 py-0.5 rounded">
                          {voucher.source === "daily_quiz" ? "Quiz" : voucher.source === "roulette" ? "Roulette" : "Game"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 mb-1">{voucher.label}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-emerald-600">
                        {formatSaving(voucher.saving, voucher.label)}
                      </span>
                      {"wallet" in voucher && voucher.wallet && (
                        <span className="text-[10px] text-slate-500">{getWalletLabel(voucher.wallet)}</span>
                      )}
                    </div>
                    {"expiresAt" in voucher && voucher.expiresAt && (
                      <p className="text-[10px] text-slate-500 mt-1">
                        Hết hạn: {new Date(voucher.expiresAt).toLocaleDateString("vi-VN")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Used Vouchers */}
        {usedVouchers.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
              <h2 className="font-semibold text-sm text-slate-700">Voucher Đã Dùng ({usedVouchers.length})</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {usedVouchers.map((voucher) => (
                  <div
                    key={"id" in voucher ? voucher.id : voucher.code}
                    className="rounded-xl p-4 border border-slate-200 bg-slate-50 opacity-60"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-sm text-slate-500">{voucher.code}</span>
                      <span className="text-[9px] bg-slate-400 text-white px-1.5 py-0.5 rounded">
                        Đã dùng
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-1">{voucher.label}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">
                        {formatSaving(voucher.saving, voucher.label)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {allVouchers.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="text-4xl mb-4">🎟️</div>
            <h3 className="font-semibold text-slate-900 mb-2">Chưa có voucher nào</h3>
            <p className="text-sm text-slate-600 mb-4">
              Chơi các trò chơi để nhận voucher giảm giá!
            </p>
            <a
              href="/mini-games"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700"
            >
              Chơi trò chơi
            </a>
          </div>
        )}
      </div>
    </PageShell>
  );
};
