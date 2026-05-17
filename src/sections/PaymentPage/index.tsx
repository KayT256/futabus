import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { trips } from "@/data/trips";
import { wallets, getWalletLabel, type WalletId } from "@/data/wallets";
import { vouchers, findBestVoucher, findVoucherByCode, type Voucher } from "@/data/vouchers";
import { useJourney, type PickupInfo } from "@/contexts/JourneyContext";

// Format helper used across this screen.
const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}đ`;

// Booking state arrives via router state from BookingPage.
// Defined as a permissive type because router state is `unknown` at the type level —
// I only trust the fields after pulling them out and falling back to defaults.
interface BookingState {
  tripId?: string;
  seats?: string[];
  pickup?: PickupInfo;
  customer?: { name: string; phone: string; email: string };
}

const Row = ({ k, v, bold }: { k: string; v: string; bold?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-500 text-xs">{k}</span>
    <span className={`text-sm ${bold ? "font-bold text-orange-600" : "font-medium text-gray-900"}`}>{v}</span>
  </div>
);

export const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startJourney } = useJourney();

  const state = (location.state ?? {}) as BookingState;
  const trip = trips.find((t) => t.id === state.tripId) ?? trips[0];
  const seats = state.seats?.length ? state.seats : ["A09"];
  const pickup: PickupInfo =
    state.pickup ?? {
      pickupType: "terminal",
      pickupPoint: trip.pickupTerminal,
      dropoffType: "terminal",
      dropoffPoint: trip.dropoffTerminal,
    };

  const [method, setMethod] = useState<WalletId>("futapay");
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [showStore, setShowStore] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // Subtotal scales with selected seats. The headline Smart Pay feature is auto-recommend.
  const subtotal = trip.price * seats.length;
  const bestVoucher = useMemo(() => findBestVoucher(method, subtotal), [method, subtotal]);

  // Switching wallets must invalidate any voucher attached to the old wallet —
  // otherwise the user could "stack" a MoMo voucher onto a ZaloPay payment.
  const switchWallet = (next: WalletId) => {
    if (!wallets.find((w) => w.id === next)?.linked) {
      toast.warning(`${getWalletLabel(next)} chưa liên kết`, { description: "Mở cổng liên kết... (demo)" });
    }
    if (voucher && voucher.wallet !== next) {
      toast.warning("Đã gỡ voucher", {
        description: `Voucher ${voucher.code} chỉ dùng được với ${getWalletLabel(voucher.wallet)}.`,
      });
      setVoucher(null);
    }
    setMethod(next);
  };

  const applyVoucher = (v: Voucher) => {
    if (v.wallet !== method) {
      toast.error("Voucher không tương thích", {
        description: `Mã này chỉ dùng được với ${getWalletLabel(v.wallet)}. Đổi phương thức để dùng.`,
      });
      return;
    }
    if (v.min && subtotal < v.min) {
      toast.error("Đơn chưa đủ điều kiện", { description: `Cần đơn từ ${formatVND(v.min)}.` });
      return;
    }
    setVoucher(v);
    toast.success(`Đã áp dụng ${v.code}`, { description: `Tiết kiệm ${formatVND(v.saving)}` });
  };

  const submitManualCode = (e?: React.FormEvent) => {
    e?.preventDefault();
    const code = manualCode.trim().toUpperCase();
    if (!code) return;
    const v = findVoucherByCode(code);
    if (!v) {
      toast.error("Mã không tồn tại");
      return;
    }
    applyVoucher(v);
    setManualCode("");
  };

  const saving = voucher?.saving ?? 0;
  const total = Math.max(0, subtotal - saving);

  // Pretend to talk to a payment gateway — sets isPaying briefly so the button isn't
  // double-clicked, then writes the booking into JourneyContext and navigates to /ticket.
  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      startJourney({
        trip,
        seats,
        pickup,
        paymentMethod: method,
        voucher,
        bookedAt: new Date().toISOString(),
        totalPaid: total,
      });
      toast.success("Thanh toán thành công!", { description: `Mã vé: FUTA${trip.id}` });
      navigate("/ticket", { replace: true, state: { from: "payment" } });
    }, 600);
  };

  // If someone lands on /payment without a booking state, redirect to /search.
  useEffect(() => {
    if (!state.tripId) {
      toast.info("Chưa có chuyến nào được chọn — chuyển sang trang tìm chuyến");
      navigate("/search", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full bg-[#f3f3f5] min-h-screen pb-12">
      {/* Back-button header — matches BookingPage's pattern. */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Quay lại</span>
          </button>
          <span className="ml-4 text-base font-semibold text-gray-900">Thanh toán</span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          {/* ── LEFT: wallets + manual code + summary ─────────── */}
          <div className="space-y-4">
            {/* Smart Pay banner — sets the tone for what makes this screen different. */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] tracking-[0.3em] opacity-70">FUTA SMART PAY</div>
                  <div className="font-bold text-lg mt-1">Thanh toán thông minh, không bỏ sót deal</div>
                </div>
                <span className="text-2xl">✨</span>
              </div>
              <div className="mt-2 text-xs opacity-80">
                Tự đề xuất voucher tốt nhất theo ví bạn chọn — không cần kiểm tra từng app.
              </div>
            </div>

            {/* Wallets */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-semibold mb-1">Chọn phương thức thanh toán</h3>
              <p className="text-xs text-gray-500 mb-4">
                Đổi ví → hệ thống tự cập nhật voucher khả dụng ở bên phải.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {wallets.map((w) => {
                  const active = method === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => switchWallet(w.id)}
                      className={`p-3 rounded-xl border-2 text-left transition relative ${
                        active ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-white hover:border-orange-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 grid place-items-center overflow-hidden shrink-0">
                          <img
                            src={w.logo}
                            alt={w.label}
                            className="max-w-[80%] max-h-[80%] object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold truncate">{w.label}</div>
                          <div className="text-[10px] text-gray-500 truncate">{w.sub}</div>
                        </div>
                      </div>
                      {!w.linked && (
                        <span className="absolute top-1.5 right-1.5 text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                          Chưa LK
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Manual voucher code */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-semibold mb-2">Có mã giảm giá?</h3>
              <form onSubmit={submitManualCode} className="flex gap-2">
                <input
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Nhập mã (vd: MOMO50, ZALO20, FUTAGOLD)"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm uppercase outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
                >
                  Áp dụng
                </button>
              </form>
              <div className="text-[11px] text-gray-500 mt-2">
                Hệ thống sẽ kiểm tra ngay — nếu mã thuộc ví khác sẽ báo cụ thể.
              </div>
            </div>

            {/* Trip summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-semibold mb-3">Thông tin chuyến</h3>
              <div className="space-y-2 text-sm">
                <Row k="Tuyến" v={trip.route} />
                <Row k="Khởi hành" v={`${trip.departureTime} ${trip.date}`} />
                <Row k="Ghế" v={seats.join(", ")} />
                <Row k="Loại xe" v={trip.busType} />
                <Row
                  k="Điểm đón"
                  v={`${
                    pickup.pickupType === "terminal"
                      ? "Bến xe"
                      : pickup.pickupType === "shuttle"
                        ? "Trung chuyển"
                        : "Văn phòng"
                  } · ${pickup.pickupPoint}`}
                />
                <Row
                  k="Điểm trả"
                  v={`${pickup.dropoffType === "terminal" ? "Bến xe" : "Trung chuyển"} · ${pickup.dropoffPoint}`}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: voucher recommendation + total + pay button ─── */}
          <aside className="space-y-3 h-fit lg:sticky lg:top-4">
            {/* Best-voucher recommendation panel — Smart Pay's signature feature. */}
            <div className="bg-white rounded-2xl border border-orange-200 overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 flex items-center justify-between border-b border-orange-200">
                <div className="flex items-center gap-2">
                  <span className="text-orange-600">✨</span>
                  <div className="text-xs font-bold tracking-wide text-orange-600">VOUCHER ĐỀ XUẤT</div>
                </div>
                <button
                  onClick={() => setShowStore(true)}
                  className="text-[11px] font-semibold text-blue-600 underline"
                >
                  Xem kho
                </button>
              </div>
              <div className="p-4">
                <div className="text-[11px] text-gray-500 mb-2">
                  Tốt nhất cho <b className="text-gray-900">{getWalletLabel(method)}</b>
                </div>
                {bestVoucher ? (
                  <div
                    className={`rounded-xl border-2 p-3 ${
                      voucher?.code === bestVoucher.code
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-dashed border-orange-500 bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-mono font-bold text-sm text-orange-600">{bestVoucher.code}</div>
                      <div className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full">
                        -{formatVND(bestVoucher.saving)}
                      </div>
                    </div>
                    <div className="text-xs mt-1 text-gray-700">{bestVoucher.label}</div>
                    {voucher?.code === bestVoucher.code ? (
                      <button
                        onClick={() => {
                          setVoucher(null);
                          toast("Đã gỡ voucher");
                        }}
                        className="w-full mt-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
                      >
                        ✓ Đang dùng — Bấm để gỡ
                      </button>
                    ) : (
                      <button
                        onClick={() => applyVoucher(bestVoucher)}
                        className="w-full mt-3 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
                      >
                        Dùng ngay
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-300 p-3 text-xs text-gray-500 text-center">
                    Chưa có voucher cho ví này.{" "}
                    <button onClick={() => setShowStore(true)} className="text-orange-600 underline">
                      Mở kho
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 text-sm space-y-2">
              <Row k="Tạm tính" v={formatVND(subtotal)} />
              <Row k="Phí thanh toán" v="0đ" />
              {voucher && <Row k={`Voucher ${voucher.code}`} v={`-${formatVND(voucher.saving)}`} />}
              <hr className="my-2 border-gray-200" />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Tổng thanh toán</span>
                <div className="text-right">
                  {voucher && (
                    <div className="text-[11px] line-through text-gray-400">{formatVND(subtotal)}</div>
                  )}
                  <div className="text-lg font-bold text-orange-600">{formatVND(total)}</div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={isPaying}
              className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isPaying ? "Đang xử lý..." : `Thanh toán với ${getWalletLabel(method)} →`}
            </button>
            {voucher && (
              <div className="text-center text-xs text-emerald-600 font-medium">
                Bạn tiết kiệm {formatVND(voucher.saving)} 🎉
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Voucher store modal — sorts compatible-with-current-wallet first, then by saving descending. */}
      {showStore && (
        <div
          className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-4"
          onClick={() => setShowStore(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
          >
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900">Kho voucher FUTA Smart Pay</div>
                <div className="text-[11px] text-gray-500">
                  Sắp xếp theo tiết kiệm thực tế cho ví{" "}
                  <b className="text-orange-600">{getWalletLabel(method)}</b>
                </div>
              </div>
              <button
                onClick={() => setShowStore(false)}
                className="w-8 h-8 grid place-items-center rounded-full hover:bg-gray-100 text-gray-500"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-2">
              {[...vouchers]
                .sort((a, b) => {
                  const aOk = a.wallet === method ? 1 : 0;
                  const bOk = b.wallet === method ? 1 : 0;
                  if (aOk !== bOk) return bOk - aOk;
                  return b.saving - a.saving;
                })
                .map((v) => {
                  const compatible = v.wallet === method;
                  return (
                    <div
                      key={v.code}
                      className={`rounded-xl border p-3 flex items-center gap-3 ${
                        compatible ? "border-orange-200 bg-orange-50" : "border-gray-200 bg-gray-50 opacity-80"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg grid place-items-center text-xl ${
                          compatible ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {compatible ? "🎟️" : "🔒"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-sm">{v.code}</span>
                          {v.tag && (
                            <span className="text-[9px] bg-orange-500 text-white px-1.5 py-0.5 rounded">
                              {v.tag}
                            </span>
                          )}
                          <span className="text-[10px] text-gray-500">· {getWalletLabel(v.wallet)}</span>
                        </div>
                        <div className="text-xs text-gray-700">{v.label}</div>
                        <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                          Tiết kiệm {formatVND(v.saving)}
                        </div>
                      </div>
                      {compatible ? (
                        <button
                          onClick={() => {
                            applyVoucher(v);
                            setShowStore(false);
                          }}
                          className="px-3 py-1.5 rounded-full bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600"
                        >
                          Dùng
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            switchWallet(v.wallet);
                            toast.info(`Đã đổi ví sang ${getWalletLabel(v.wallet)}`);
                          }}
                          className="px-3 py-1.5 rounded-full border border-blue-500 text-blue-600 text-xs font-semibold hover:bg-blue-50"
                        >
                          Đổi ví
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
