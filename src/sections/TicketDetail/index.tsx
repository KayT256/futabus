"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useJourney } from "@/contexts/JourneyContext";
import { getWalletLabel } from "@/data/wallets";
import { PageShell } from "@/components/PageShell";

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}đ`;

// Show the ticket the user just paid for, with a real QR code (scannable at the bến).
// Two entry points:
//  - from "payment" → just paid, primary CTA = "Về trang chủ", secondary = open journey
//  - from "journey" → reached via the active journey screen during the trip, primary CTA = back to journey
export const TicketDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { activeJourney } = useJourney();

  // If there's no active journey (e.g. user shared the URL or refreshed after journey ended),
  // bounce to home with a friendly toast instead of rendering an empty shell.
  useEffect(() => {
    if (!activeJourney) {
      toast.info("Không có vé đang hoạt động — quay về trang chủ");
      router.replace("/");
    }
  }, [activeJourney, router]);

  if (!activeJourney) return null;

  const { booking } = activeJourney;
  const { trip, seats, pickup, paymentMethod, voucher, totalPaid } = booking;

  // Pass entry-point intent via ?from=payment|journey since Next.js router has no location.state.
  // Defaults to "payment" so deep links land on the post-purchase view.
  const fromMode = (searchParams.get("from") === "journey" ? "journey" : "payment") as "payment" | "journey";
  // Ticket code blends trip id + booking time + a slice of seat list — uniquely identifies the booking.
  // Real FUTA uses 10-digit numeric codes; this matches that format closely enough for the demo.
  const ticketCode = `FUTA${trip.id.replace(/\D/g, "")}${seats.length}${booking.bookedAt.slice(11, 13)}${booking.bookedAt.slice(14, 16)}`;
  // Payload encoded into the QR — staff scan this at boarding to verify.
  const qrPayload = JSON.stringify({
    code: ticketCode,
    tripId: trip.id,
    seats,
    booked: booking.bookedAt,
  });

  return (
    <PageShell
      title="Thông tin chi tiết vé"
      backTo={fromMode === "journey" ? "/trip-progress" : "/"}
      width="wide"
    >
      <div className="max-w-md mx-auto">
        {/* Orange ticket strip stays as content (chrome is neutral via PageShell) so the
            ticket still "feels" like an artifact the user wants to save. */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-2xl px-5 py-4 flex items-center gap-3 text-white outline outline-8 outline-orange-800/10">
          <div className="w-10 h-10 rounded-xl bg-white/15 ring-1 ring-white/30 grid place-items-center text-xl shrink-0">🎫</div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] tracking-[0.3em] font-semibold text-white/90">FUTA TICKET</div>
            <div className="font-bold truncate">{trip.route}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl outline outline-8 outline-orange-800/10">
          {/* Customer info ─────────────────────────────────── */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-bold mb-3 text-gray-900">Thông tin hành khách</h3>
            <Row k="Họ và tên" v="Lan Anh" />
            <Row k="Số điện thoại" v="0946 327 332" />
            <Row k="Email" v="lananh@gmail.com" />
            <div className="text-[11px] text-gray-500 italic mt-3 leading-relaxed">
              Quý khách vui lòng kiểm tra thêm thư rác/Spam nếu chưa thấy email thông tin vé ở hộp thư đến.
            </div>
          </div>

          {/* Trip + QR ─────────────────────────────────────── */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-bold mb-3 text-gray-900">Thông tin lượt đi</h3>
            <div className="flex gap-3 items-center p-3 border border-gray-200 rounded-xl bg-[#FDF8F4]">
              {/* Real QR — staff at the bến scan this to verify the booking. */}
              <div className="bg-white grid place-items-center rounded border border-gray-200 p-1.5">
                <QRCodeSVG value={qrPayload} size={88} level="M" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-gray-900 truncate">{ticketCode}</div>
                <div className="text-xs text-gray-500">
                  Ghế: <b className="text-gray-900">{seats.join(", ")}</b>
                </div>
                <div className="text-xs text-gray-500">
                  Giá: <b className="text-orange-600">{formatVND(trip.price * seats.length)}</b>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <Row k="Trạng thái" v="Mua vé thành công" />
              <Row k="Tuyến xe" v={trip.route} />
              <Row k="Khởi hành" v={`${trip.departureTime} ${trip.date}`} />
              <Row k="Số lượng vé" v={`${seats.length} vé`} />
              <Row k="Vị trí ghế" v={seats.join(", ")} />
              <Row k="Điểm lên xe" v={pickup.pickupPoint} />
              <Row k="Điểm xuống xe" v={pickup.dropoffPoint} />
              <Row k="Biển số xe" v={trip.licensePlate} />
            </div>
            <div className="mt-3 text-[11px] text-orange-600 bg-orange-50 border border-orange-200 rounded-lg p-2.5">
              Quý khách vui lòng có mặt tại điểm đón trước <b>{trip.pickupTime}</b> để được trung chuyển hoặc kiểm tra
              thông tin trước khi lên xe!
            </div>
          </div>

          {/* Payment summary ──────────────────────────────── */}
          <div className="p-5">
            <div className="bg-[#FDF8F4] rounded-xl p-3 space-y-2">
              <Row k="Giá vé" v={formatVND(trip.price * seats.length)} />
              {voucher && <Row k={`Voucher ${voucher.code}`} v={`-${formatVND(voucher.saving)}`} />}
              <Row k="Phí thanh toán" v="0đ" />
              <hr className="border-gray-200" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Thanh toán với</div>
                  <div className="mt-1 inline-block text-[11px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                    {getWalletLabel(paymentMethod)}
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900">{formatVND(totalPaid)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTAs depend on the entry point ──────────────── */}
        {fromMode === "journey" ? (
          <div className="mt-6 space-y-2">
            <div className="text-center text-xs text-gray-500">
              Đưa mã QR cho nhân viên để được kiểm tra &amp; lên xe
            </div>
            <button
              onClick={() => router.push("/trip-progress")}
              className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-orange-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại hành trình
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-2">
            <button
              onClick={() => router.push("/trip-progress")}
              className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-orange-600"
            >
              Mở hành trình của bạn →
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50"
            >
              Về trang chủ
            </button>
            <div className="text-center text-[11px] text-gray-500">
              Bạn có thể mở lại vé bất cứ lúc nào từ banner "Hành trình của bạn" trên trang chủ.
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
};

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex items-center justify-between mt-2">
    <span className="text-gray-500 text-xs">{k}</span>
    <span className="text-sm font-medium text-gray-900 text-right break-words max-w-[55%]">{v}</span>
  </div>
);
