import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { useJourney } from "@/contexts/JourneyContext";
import { foodMenu, foodCategories, getFoodById, type FoodCategory } from "@/data/foodMenu";
import { madaguiRestStop } from "@/data/restStop";

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}đ`;

// Smart Stop — pre-order food/drinks at the Madagui rest stop and pickup with a QR code.
// 4 views drive the screen:
//   menu  → browse + add to cart
//   cart  → review/edit cart
//   pay   → choose payment method (FUTAPay default)
//   qr    → pickup QR + order summary
//
// On entry, if the user already has items in their cart AND we're at the rest stop, we
// skip straight to the QR view so they can scan immediately when the bus stops.

type View = "menu" | "cart" | "pay" | "qr";

export const SmartStop = () => {
  const navigate = useNavigate();
  const { activeJourney, setCart, setPickedUp } = useJourney();

  useEffect(() => {
    if (!activeJourney) {
      navigate("/", { replace: true });
    }
  }, [activeJourney, navigate]);

  // Pre-pick the default view BEFORE we early-return so the initial useState below
  // is consistent on every render.
  const initialView: View =
    activeJourney && Object.keys(activeJourney.cart).length > 0 && activeJourney.phase === "at_rest"
      ? "qr"
      : "menu";

  const [view, setView] = useState<View>(initialView);
  const [category, setCategory] = useState<FoodCategory>("Món chính");

  // All hooks must run on every render — derive safely from activeJourney with fallbacks
  // so we never break Rules of Hooks when activeJourney is briefly null on first render.
  const cart = activeJourney?.cart ?? {};
  const booking = activeJourney?.booking;

  const total = useMemo(
    () =>
      Object.entries(cart).reduce(
        (sum, [id, qty]) => sum + (getFoodById(id)?.price ?? 0) * qty,
        0,
      ),
    [cart],
  );
  // Order code is stable for the lifetime of this cart — generated once when QR is shown.
  // Tied to seat number so staff can verify against the passenger manifest.
  const orderCode = useMemo(
    () => (booking ? `SS-${booking.seats[0]}-${booking.trip.id.replace(/\D/g, "")}` : ""),
    [booking],
  );

  if (!activeJourney || !booking) return null;
  const { pickedUp, phase } = activeJourney;

  const items = foodMenu.filter((f) => f.category === category);
  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const inc = (id: string) => setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 });
  const dec = (id: string) => {
    const next = { ...cart };
    if ((next[id] ?? 0) <= 1) delete next[id];
    else next[id] = next[id] - 1;
    setCart(next);
  };

  // QR payload mirrors the rest-stop pickup integration: code + items so staff can
  // pre-confirm before scanning.
  const qrPayload = JSON.stringify({
    code: orderCode,
    items: Object.entries(cart).map(([id, qty]) => ({ id, qty })),
    seat: booking.seats[0],
  });

  // QR pickup view ───────────────────────────────────────────────
  if (view === "qr") {
    return (
      <main className="min-h-screen bg-slate-50 pb-12">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-md mx-auto px-4 h-14 flex items-center">
            <button
              onClick={() => navigate("/trip-progress")}
              className="flex items-center gap-2 text-slate-700 hover:text-orange-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Quay lại</span>
            </button>
            <span className="ml-3 text-base font-semibold text-slate-900">Smart Stop · Pickup QR</span>
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 pt-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 text-center shadow-sm">
            <div className="text-xs text-slate-500">MÃ PICKUP</div>
            <div className="text-xl font-bold mt-1 text-slate-900">{orderCode}</div>
            <div className="mx-auto mt-4 w-48 h-48 rounded-lg border-4 border-orange-500 p-2 bg-white grid place-items-center">
              <QRCodeSVG value={qrPayload} size={160} level="M" />
            </div>
            <div className="mt-4 text-sm font-semibold text-slate-900">
              Đưa mã QR này tại quầy Smart Stop — {madaguiRestStop.name}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {itemCount} món · {formatVND(total)}
            </div>

            {/* Order line items */}
            <div className="mt-4 text-left bg-slate-50 rounded-xl p-3 text-xs space-y-1">
              {Object.entries(cart).map(([id, qty]) => {
                const f = getFoodById(id);
                if (!f) return null;
                return (
                  <div key={id} className="flex justify-between text-slate-700">
                    <span>
                      {f.emoji} {f.name} × {qty}
                    </span>
                    <span className="text-slate-900">{formatVND(f.price * qty)}</span>
                  </div>
                );
              })}
            </div>

            {!pickedUp ? (
              <button
                onClick={() => {
                  setPickedUp(true);
                  toast.success("Đã pickup thành công!", { description: "Chúc bạn ăn ngon miệng!" });
                }}
                className="w-full mt-5 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
              >
                Xác nhận đã nhận đồ
              </button>
            ) : (
              <div className="mt-5 p-3 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200">
                ✓ Đã pickup — chúc ngon miệng!
              </div>
            )}
            <button
              onClick={() => navigate("/trip-progress")}
              className="w-full mt-3 py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
            >
              Quay lại hành trình
            </button>
            {/* Allow user to add more items even after generating QR — they can re-scan */}
            <button onClick={() => setView("menu")} className="block mx-auto mt-2 text-xs text-orange-600 underline">
              + Thêm món nữa
            </button>
          </div>

          {/* Reminder card about timing */}
          {phase !== "at_rest" && (
            <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 flex items-start gap-2">
              <span>⏰</span>
              <span>
                Đơn của bạn sẽ sẵn sàng khi xe đến trạm. Bạn sẽ nhận thông báo trước 10 phút.
              </span>
            </div>
          )}
        </div>
      </main>
    );
  }

  // Payment confirm view (lightweight — full SmartPay is elsewhere) ───
  if (view === "pay") {
    return (
      <main className="min-h-screen bg-slate-50 pb-12">
        <div className="max-w-md mx-auto px-4 pt-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5">
            <button
              onClick={() => setView("cart")}
              className="text-xs text-slate-500 flex items-center gap-1 mb-3 hover:text-orange-500"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Giỏ hàng
            </button>
            <h3 className="font-semibold text-slate-900 mb-3">Thanh toán Smart Stop</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Số món</span>
              <span className="text-slate-900 font-medium">{itemCount} món</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-slate-500">Tổng</span>
              <span className="text-orange-600 font-bold">{formatVND(total)}</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(["FUTAPay", "MoMo", "Thẻ"] as const).map((m, i) => (
                <button
                  key={m}
                  className={`p-3 border-2 rounded-xl text-sm font-medium ${
                    i === 0
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-slate-200 text-slate-700 hover:border-orange-300"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setView("qr");
                toast.success("Đặt món thành công — Xem QR pickup");
              }}
              className="w-full mt-4 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
            >
              Thanh toán {formatVND(total)}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Cart view ───────────────────────────────────────────────────
  if (view === "cart") {
    return (
      <main className="min-h-screen bg-slate-50 pb-24">
        <div className="max-w-md mx-auto px-4 pt-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5">
            <button
              onClick={() => setView("menu")}
              className="text-xs text-slate-500 flex items-center gap-1 mb-3 hover:text-orange-500"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tiếp tục chọn
            </button>
            <h3 className="font-semibold text-slate-900 mb-3">Giỏ hàng của bạn</h3>
            {Object.entries(cart).length === 0 ? (
              <div className="text-sm text-slate-500 py-8 text-center">Chưa có món nào</div>
            ) : (
              Object.entries(cart).map(([id, qty]) => {
                const f = getFoodById(id);
                if (!f) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0"
                  >
                    <div className="text-3xl">{f.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-900">{f.name}</div>
                      <div className="text-xs text-orange-600">{formatVND(f.price)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dec(id)}
                        className="w-7 h-7 rounded-full bg-slate-100 grid place-items-center text-slate-700 hover:bg-slate-200"
                        aria-label="Giảm"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold w-5 text-center text-slate-900">{qty}</span>
                      <button
                        onClick={() => inc(id)}
                        className="w-7 h-7 rounded-full bg-orange-500 text-white grid place-items-center hover:bg-orange-600"
                        aria-label="Thêm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })
            )}
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between font-semibold text-slate-900">
              <span>Tổng</span>
              <span className="text-orange-600">{formatVND(total)}</span>
            </div>
            <button
              disabled={itemCount === 0}
              onClick={() => setView("pay")}
              className="w-full mt-4 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:bg-orange-200"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Menu view (default) ────────────────────────────────────────
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <div className="max-w-md mx-auto px-4 pt-4">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍽️</span>
              <div className="font-semibold flex-1">Smart Stop — {madaguiRestStop.name}</div>
              <button
                onClick={() => navigate("/trip-progress")}
                className="w-7 h-7 rounded-full bg-white/20 grid place-items-center hover:bg-white/30"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>
            <div className="text-xs opacity-90 mt-1">Đặt trước · Pickup bằng QR · Không chờ đợi</div>
          </div>

          <div className="flex gap-2 p-3 border-b border-slate-200 overflow-x-auto">
            {foodCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  category === c
                    ? "bg-orange-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-orange-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="max-h-[480px] overflow-y-auto">
            {items.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 p-3 border-b border-slate-100 last:border-0"
              >
                <div className="text-4xl">{f.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900">{f.name}</div>
                  <div className="text-xs text-slate-500 line-clamp-1">{f.desc}</div>
                  <div className="text-sm text-orange-600 font-semibold mt-1">{formatVND(f.price)}</div>
                </div>
                {cart[f.id] ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dec(f.id)}
                      className="w-7 h-7 rounded-full bg-slate-100 grid place-items-center text-slate-700 hover:bg-slate-200"
                      aria-label="Giảm"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold w-5 text-center text-slate-900">{cart[f.id]}</span>
                    <button
                      onClick={() => inc(f.id)}
                      className="w-7 h-7 rounded-full bg-orange-500 text-white grid place-items-center hover:bg-orange-600"
                      aria-label="Thêm"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => inc(f.id)}
                    className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold border border-orange-200 hover:bg-orange-100"
                  >
                    + Thêm
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky cart pill — appears when cart isn't empty. Mobile-first pattern. */}
      {itemCount > 0 && (
        <button
          onClick={() => setView("cart")}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-lg flex items-center gap-2 hover:bg-orange-600"
        >
          <span>🛒</span>
          Xem giỏ ({itemCount}) · {formatVND(total)}
        </button>
      )}
    </main>
  );
};
