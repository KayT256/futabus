"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { trips } from "@/data/trips";
import type { PickupType, DropoffType } from "@/contexts/JourneyContext";
import { useJourney } from "@/contexts/JourneyContext";

// Points the user can pick from for each pickup mode.
// Real FUTA has many more points but these cover the demo flow nicely.
// Shuttle pickup is fixed to Tam Anh Hospital (non-editable).
const PICKUP_POINTS: Record<PickupType, string[]> = {
  terminal: ["Bến xe Miền Tây", "Bến xe Miền Đông Mới", "Bến xe An Sương"],
  shuttle: ["2B Đ. Phổ Quang, Tân Sơn Hòa, Hồ Chí Minh"],
  office: [
    "VP FUTA Quận 1 — 272 Đề Thám",
    "VP FUTA Tân Bình — 391 Lê Văn Sỹ",
    "VP FUTA Bình Thạnh — 86 Đinh Bộ Lĩnh",
  ],
};

const DROPOFF_POINTS: Record<DropoffType, string[]> = {
  terminal: ["Bến xe Đà Lạt"],
  shuttle: ["Chợ Đà Lạt", "Hồ Xuân Hương", "Khách sạn TTC Premium", "Quảng trường Lâm Viên"],
};

type SeatStatus = "disabled" | "available" | "selected";

interface Seat {
  id: string;
  status: SeatStatus;
}

const generateRandomSeats = (tripId: string): (Seat | null)[][] => {
  const seatIds = ["A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17"];
  const seed = tripId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const getRandomStatus = (index: number): SeatStatus => {
    const random = (seed + index * 7) % 10;
    if (random < 3) return "disabled";
    if (random < 8) return "available";
    return "disabled";
  };

  return [
    [
      { id: "A01", status: getRandomStatus(0) },
      null,
      null,
      null,
      { id: "A02", status: getRandomStatus(1) },
    ],
    [
      { id: "A03", status: getRandomStatus(2) },
      null,
      { id: "A04", status: getRandomStatus(3) },
      null,
      { id: "A05", status: getRandomStatus(4) },
    ],
    [
      { id: "A06", status: getRandomStatus(5) },
      null,
      { id: "A07", status: getRandomStatus(6) },
      null,
      { id: "A08", status: getRandomStatus(7) },
    ],
    [
      { id: "A09", status: getRandomStatus(8) },
      null,
      { id: "A10", status: getRandomStatus(9) },
      null,
      { id: "A11", status: getRandomStatus(10) },
    ],
    [
      { id: "A12", status: getRandomStatus(11) },
      null,
      { id: "A13", status: getRandomStatus(12) },
      null,
      { id: "A14", status: getRandomStatus(13) },
    ],
    [
      { id: "A15", status: getRandomStatus(14) },
      null,
      { id: "A16", status: getRandomStatus(15) },
      null,
      { id: "A17", status: getRandomStatus(16) },
    ],
  ];
};

const generateRandomUpperSeats = (tripId: string): (Seat | null)[][] => {
  const seed = tripId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 100;
  
  const getRandomStatus = (index: number): SeatStatus => {
    const random = (seed + index * 7) % 10;
    if (random < 3) return "disabled";
    if (random < 8) return "available";
    return "disabled";
  };

  return [
    [
      { id: "B01", status: getRandomStatus(0) },
      null,
      null,
      null,
      { id: "B02", status: getRandomStatus(1) },
    ],
    [
      { id: "B03", status: getRandomStatus(2) },
      null,
      { id: "B04", status: getRandomStatus(3) },
      null,
      { id: "B05", status: getRandomStatus(4) },
    ],
    [
      { id: "B06", status: getRandomStatus(5) },
      null,
      { id: "B07", status: getRandomStatus(6) },
      null,
      { id: "B08", status: getRandomStatus(7) },
    ],
    [
      { id: "B09", status: getRandomStatus(8) },
      null,
      { id: "B10", status: getRandomStatus(9) },
      null,
      { id: "B11", status: getRandomStatus(10) },
    ],
    [
      { id: "B12", status: getRandomStatus(11) },
      null,
      { id: "B13", status: getRandomStatus(12) },
      null,
      { id: "B14", status: getRandomStatus(13) },
    ],
    [
      { id: "B15", status: getRandomStatus(14) },
      null,
      { id: "B16", status: getRandomStatus(15) },
      null,
      { id: "B17", status: getRandomStatus(16) },
    ],
  ];
};

const lowerDeckSeats: (Seat | null)[][] = [
  [
    { id: "A01", status: "disabled" },
    null,
    null,
    null,
    { id: "A02", status: "disabled" },
  ],
  [
    { id: "A03", status: "disabled" },
    null,
    { id: "A04", status: "disabled" },
    null,
    { id: "A05", status: "disabled" },
  ],
  [
    { id: "A06", status: "disabled" },
    null,
    { id: "A07", status: "disabled" },
    null,
    { id: "A08", status: "disabled" },
  ],
  [
    { id: "A09", status: "disabled" },
    null,
    { id: "A10", status: "disabled" },
    null,
    { id: "A11", status: "disabled" },
  ],
  [
    { id: "A12", status: "disabled" },
    null,
    { id: "A13", status: "available" },
    null,
    { id: "A14", status: "available" },
  ],
  [
    { id: "A15", status: "available" },
    null,
    { id: "A16", status: "disabled" },
    null,
    { id: "A17", status: "available" },
  ],
];

const upperDeckSeats: (Seat | null)[][] = [
  [
    { id: "B01", status: "disabled" },
    null,
    null,
    null,
    { id: "B02", status: "disabled" },
  ],
  [
    { id: "B03", status: "disabled" },
    null,
    { id: "B04", status: "disabled" },
    null,
    { id: "B05", status: "disabled" },
  ],
  [
    { id: "B06", status: "disabled" },
    null,
    { id: "B07", status: "disabled" },
    null,
    { id: "B08", status: "disabled" },
  ],
  [
    { id: "B09", status: "available" },
    null,
    { id: "B10", status: "available" },
    null,
    { id: "B11", status: "available" },
  ],
  [
    { id: "B12", status: "available" },
    null,
    { id: "B13", status: "available" },
    null,
    { id: "B14", status: "available" },
  ],
  [
    { id: "B15", status: "available" },
    null,
    { id: "B16", status: "available" },
    null,
    { id: "B17", status: "available" },
  ],
];

const SeatIcon = ({
  status,
  id,
  onClick,
}: {
  status: SeatStatus;
  id: string;
  onClick: () => void;
}) => {
  const isDisabled = status === "disabled";
  const isSelected = status === "selected";

  const seatColor = isDisabled ? "#D5D9DD" : isSelected ? "#FDEDE8" : "#DEF3FF";
  const borderColor = isDisabled ? "#C0C6CC" : isSelected ? "#F8BEAB" : "#96C5E7";
  const textColor = isDisabled ? "#A2ABB3" : isSelected ? "#EF5222" : "#339AF4";

  return (
    <td
      className={`relative mt-1 flex justify-center text-center ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={isDisabled ? undefined : onClick}
    >
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect x="1" y="1" width="32" height="28" rx="5" fill={seatColor} stroke={borderColor} strokeWidth="1.5" />
        <rect x="4" y="26" width="6" height="7" rx="2" fill={seatColor} stroke={borderColor} strokeWidth="1.5" />
        <rect x="24" y="26" width="6" height="7" rx="2" fill={seatColor} stroke={borderColor} strokeWidth="1.5" />
        <rect x="1" y="6" width="4" height="14" rx="2" fill={seatColor} stroke={borderColor} strokeWidth="1.5" />
        <rect x="29" y="6" width="4" height="14" rx="2" fill={seatColor} stroke={borderColor} strokeWidth="1.5" />
      </svg>
      <span className="absolute text-[10px] font-semibold top-1" style={{ color: textColor }}>
        {id}
      </span>
    </td>
  );
};

const DeckTable = ({
  seats,
  onToggle,
}: {
  seats: (Seat | null)[][];
  onToggle: (id: string) => void;
}) => (
  <table>
    <tbody>
      {seats.map((row, rowIdx) => (
        <tr key={rowIdx} className="flex items-center gap-1 justify-between">
          {row.map((seat, colIdx) =>
            seat ? (
              <SeatIcon
                key={seat.id}
                status={seat.status}
                id={seat.id}
                onClick={() => onToggle(seat.id)}
              />
            ) : (
              <td
                key={colIdx}
                style={{
                  position: "relative",
                  width: colIdx === 1 || colIdx === 3 ? "24px" : "34px",
                }}
              />
            ),
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export const BookingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startJourney } = useJourney();
  const tripId = searchParams.get('tripId');
  const trip = (tripId ? trips.find(t => t.id === tripId) : null) ?? trips[0];
  
  const [lowerSeats, setLowerSeats] = useState(generateRandomSeats(trip.id));
  const [upperSeats, setUpperSeats] = useState(generateRandomUpperSeats(trip.id));
  // Default to terminal-pickup matched to whichever bến the trip departs from.
  // Falls back to the first option if the trip's terminal isn't in the dropdown.
  const defaultPickupPoint =
    PICKUP_POINTS.terminal.find((p) => p === trip.pickupTerminal) ?? PICKUP_POINTS.terminal[0];
  const [pickupType, setPickupType] = useState<PickupType>("terminal");
  const [pickupPoint, setPickupPoint] = useState<string>(defaultPickupPoint);
  const [dropoffType, setDropoffType] = useState<DropoffType>("terminal");
  const [dropoffPoint, setDropoffPoint] = useState<string>(DROPOFF_POINTS.terminal[0]);
  const [customerForm, setCustomerForm] = useState({ name: "", phone: "", email: "" });
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    setLowerSeats(generateRandomSeats(trip.id));
    setUpperSeats(generateRandomUpperSeats(trip.id));
  }, [trip.id]);

  // When the user switches pickup mode, reset the point to the first option of the new mode
  // so the dropdown never shows a stale value from a different list.
  const handlePickupTypeChange = (next: PickupType) => {
    setPickupType(next);
    setPickupPoint(PICKUP_POINTS[next][0]);
  };

  const handleDropoffTypeChange = (next: DropoffType) => {
    setDropoffType(next);
    setDropoffPoint(DROPOFF_POINTS[next][0]);
  };

  const goToPayment = () => {
    if (!agreed) {
      toast.error("Vui lòng đồng ý điều khoản trước khi thanh toán");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("Vui lòng chọn ghế");
      return;
    }
    // Pass the booking context via JourneyContext — keeps the URL clean and avoids URL-encoding
    // long Vietnamese pickup-point strings.
    startJourney({
      trip,
      seats: selectedSeats,
      pickup: { pickupType, pickupPoint, dropoffType, dropoffPoint },
      paymentMethod: "futapay",
      voucher: null,
      bookedAt: new Date().toISOString(),
      totalPaid: trip.price * selectedSeats.length,
    });
    router.push("/payment");
  };

  const toggleSeat = (
    decks: (Seat | null)[][],
    setDecks: React.Dispatch<React.SetStateAction<(Seat | null)[][]>>,
    id: string,
  ) => {
    setDecks((prev) =>
      prev.map((row) =>
        row.map((seat) => {
          if (!seat || seat.id !== id) return seat;
          if (seat.status === "disabled") return seat;
          return { ...seat, status: seat.status === "available" ? "selected" : "available" };
        }),
      ),
    );
  };

  const getAllSelectedSeats = () => {
    const lower = lowerSeats.flat().filter((s) => s?.status === "selected").map((s) => s!.id);
    const upper = upperSeats.flat().filter((s) => s?.status === "selected").map((s) => s!.id);
    return [...lower, ...upper];
  };

  const selectedSeats = getAllSelectedSeats();
  const ticketPrice = trip.price;
  const totalPrice = selectedSeats.length * ticketPrice;

  return (
    <main className="w-full bg-[#f3f3f5] min-h-screen">
      {/* Back button header */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center">
          <button
            onClick={() => router.push('/search')}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Quay lại</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pb-24 sm:pb-8 md:pb-8 px-4">
        <div className="flex w-full flex-col gap-6 pt-0 lg:flex-row lg:pt-8">

          {/* ── Left - Main Content ─────────────────────────────── */}
          {/* order-2 on mobile so the sidebar (order-1) shows first */}
          <div className="flex w-full flex-col order-2 lg:order-none">

            {/* Seat Selection Card */}
            <div className="flex w-full flex-col rounded-xl border bg-white">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex-1">
                  <div className="mx-auto flex w-full max-w-2xl flex-col px-3 py-1 lg:mx-0 lg:w-auto">

                    {/* Title row: remove max-w-xs constraint so it stretches on mobile */}
                    <div className="flex w-full items-start justify-between pt-5 text-xl font-medium text-black">
                      <p className="flex flex-col">Chọn ghế</p>
                      <button className="cursor-pointer text-sm text-blue-400 underline">
                        Thông tin xe
                      </button>
                    </div>

                    {/* Deck tables + legend */}
                    <div className="my-4 flex flex-col sm:flex-row text-center font-medium gap-4 sm:gap-6">

                      {/* Lower Deck */}
                      <div className="flex flex-col items-center sm:items-start min-w-[50%] md:min-w-[153px]">
                        <div className="flex w-full justify-center p-2 text-sm bg-gray-100 rounded">
                          <span>Tầng dưới</span>
                        </div>
                        <div className="mb-4 mt-2" />
                        <DeckTable
                          seats={lowerSeats}
                          onToggle={(id) => toggleSeat(lowerSeats, setLowerSeats, id)}
                        />
                      </div>

                      {/* Upper Deck */}
                      <div className="flex flex-col items-center sm:items-start min-w-[50%] md:min-w-[153px]">
                        <div className="flex w-full justify-center p-2 text-sm bg-gray-100 rounded">
                          <span>Tầng trên</span>
                        </div>
                        <div className="mb-4 mt-2" />
                        <DeckTable
                          seats={upperSeats}
                          onToggle={(id) => toggleSeat(upperSeats, setUpperSeats, id)}
                        />
                      </div>

                      {/* Legend
                          – mobile: horizontal row below the stacked decks
                          – sm+:    vertical column beside the decks (original) */}
                      <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 justify-center sm:flex-col sm:gap-4 sm:ml-4 sm:mt-5 text-[13px] font-normal">
                        <span className="flex items-center">
                          <div className="mr-2 h-4 w-4 rounded bg-[#D5D9DD] border border-[#C0C6CC]"></div>
                          Đã bán
                        </span>
                        <span className="flex items-center">
                          <div className="mr-2 h-4 w-4 rounded bg-[#DEF3FF] border border-[#96C5E7]"></div>
                          Còn trống
                        </span>
                        <span className="flex items-center">
                          <div className="mr-2 h-4 w-4 rounded bg-[#FDEDE8] border border-[#F8BEAB]"></div>
                          Đang chọn
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[2px] bg-gray-100" />

              {/* Customer Info + Terms */}
              <div className="flex w-full flex-col gap-6 px-6 py-4 text-[15px] sm:flex-row">
                {/* Customer Form */}
                <div className="flex flex-1 flex-col">
                  <p className="text-xl font-medium text-black">Thông tin khách hàng</p>
                  <form className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="name" className="text-sm font-medium">
                        Họ và tên <span className="text-[#E12424]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={customerForm.name}
                        onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Số điện thoại <span className="text-[#E12424]">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={customerForm.phone}
                        onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-[#E12424]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={customerForm.email}
                        onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
                      />
                    </div>
                  </form>
                </div>

                {/* Terms */}
                <div className="flex h-full flex-1 flex-col text-justify text-sm">
                  <p className="mb-6 text-center text-base font-medium text-orange-500">
                    ĐIỀU KHOẢN &amp; LƯU Ý
                  </p>
                  <div className="text-sm leading-relaxed space-y-3">
                    <p>
                      <strong className="text-red-600">
                        Quý khách vui lòng Đăng ký/Đăng nhập tài khoản để nhận chương trình khuyến mãi.
                      </strong>
                    </p>
                    <p>
                      (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe
                      khởi hành, mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ
                      hệ thống FUTA BUS LINES. Vui lòng liên hệ Trung tâm tổng đài{" "}
                      <a href="tel:19006067" className="text-orange-500">1900 6067</a>{" "}
                      để được hỗ trợ.
                    </p>
                    <p>
                      (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài trung chuyển{" "}
                      <a href="tel:19006918" className="text-orange-500">1900 6918</a>{" "}
                      trước khi đặt vé.
                    </p>
                    <p>
                      (*) Nếu quý khách có nhu cầu di chuyển chặng đường ngắn hơn so với hành trình, vui
                      lòng gọi Tổng đài{" "}
                      <a href="tel:19006067" className="text-orange-500">1900 6067</a>{" "}
                      để được hưởng chính sách giá vé tốt nhất.
                    </p>
                  </div>
                </div>
              </div>

              {/* Agree checkbox */}
              <label className="flex items-center gap-2 px-6 pb-4 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span>
                  <span className="cursor-pointer text-orange-500 underline">Chấp nhận điều khoản</span>{" "}
                  đặt vé &amp; chính sách bảo mật thông tin của FUTA Bus Lines
                </span>
              </label>

              {/* Divider */}
              <div className="h-[2px] bg-gray-100" />

              {/* Pickup / Drop-off Info */}
              <div className="flex w-full">
                <div className="flex w-full flex-col p-4 text-[15px] md:p-6">
                  <div className="flex gap-4 text-xl font-medium text-black items-center">
                    Thông tin đón trả
                    <svg className="w-5 h-5 text-orange-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="mt-6 flex flex-col md:flex-row gap-6">
                    {/* Pickup — 3-way: Bến xe / Trung chuyển / Văn phòng.
                        Choosing trung chuyển/văn phòng unlocks FUTA Rada later in the journey. */}
                    <div className="flex flex-1 flex-col gap-4">
                      <span className="text-base font-medium uppercase">Điểm đón</span>
                      <div className="flex flex-wrap gap-2">
                        {([
                          { id: "terminal", label: "Bến xe / VP" },
                          { id: "shuttle", label: "Trung chuyển" },
                          { id: "office", label: "Văn phòng FUTA" },
                        ] as const).map((opt) => {
                          const active = pickupType === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handlePickupTypeChange(opt.id)}
                              className={`text-sm px-3 py-1.5 rounded-full border transition ${
                                active
                                  ? "bg-orange-50 border-orange-500 text-orange-600 font-medium"
                                  : "border-gray-300 text-gray-700 hover:border-orange-300"
                              }`}
                            >
                              <span
                                className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                                style={{ background: active ? "#f97316" : "#d1d5db" }}
                              />
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                      {pickupType === "shuttle" ? (
                        <div className="w-full border border-gray-300 rounded px-3 py-2 text-[15px] bg-slate-50 text-gray-700">
                          2B Đ. Phổ Quang, Tân Sơn Hòa, Hồ Chí Minh
                        </div>
                      ) : (
                        <select
                          value={pickupPoint}
                          onChange={(e) => setPickupPoint(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-[15px] bg-white"
                        >
                          {PICKUP_POINTS[pickupType].map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      )}
                      <div className="text-xs text-gray-600 leading-relaxed">
                        {pickupType === "terminal" ? (
                          <>
                            🗺️ Có mặt tại <b>{pickupPoint}</b> trước{" "}
                            <span className="font-semibold text-red-500">
                              {trip.pickupTime} {trip.date}
                            </span>
                            . Sau khi đặt vé, hệ thống sẽ hiện <b className="text-orange-600">bản đồ chỉ đường</b> tới
                            đúng vị trí xe Limousine.
                          </>
                        ) : (
                          <>
                            🚐 Sau khi đặt vé, mở <b className="text-orange-600">FUTA Rada</b> để theo dõi xe trung
                            chuyển đến đón bạn theo thời gian thực.
                          </>
                        )}
                      </div>
                    </div>

                    <div className="hidden md:block h-full w-[1px] border-r border-gray-200" />

                    {/* Drop-off — 2-way: Bến xe / Trung chuyển. */}
                    <div className="flex flex-1 flex-col gap-4">
                      <span className="text-base font-medium uppercase">Điểm trả</span>
                      <div className="flex flex-wrap gap-2">
                        {([
                          { id: "terminal", label: "Bến xe / VP" },
                          { id: "shuttle", label: "Trung chuyển" },
                        ] as const).map((opt) => {
                          const active = dropoffType === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleDropoffTypeChange(opt.id)}
                              className={`text-sm px-3 py-1.5 rounded-full border transition ${
                                active
                                  ? "bg-orange-50 border-orange-500 text-orange-600 font-medium"
                                  : "border-gray-300 text-gray-700 hover:border-orange-300"
                              }`}
                            >
                              <span
                                className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                                style={{ background: active ? "#f97316" : "#d1d5db" }}
                              />
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                      <select
                        value={dropoffPoint}
                        onChange={(e) => setDropoffPoint(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-[15px] bg-white"
                      >
                        {DROPOFF_POINTS[dropoffType].map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                      <div className="text-xs text-gray-600 leading-relaxed">
                        {dropoffType === "terminal"
                          ? "🏁 Kết thúc hành trình ngay tại bến Đà Lạt."
                          : "🚐 Xe trung chuyển sẽ đưa bạn từ bến Đà Lạt tới điểm trả miễn phí."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[2px] bg-gray-100" />

              {/* Footer Actions
                  – mobile: hidden here, shown in the sticky bar below
                  – sm+:    visible inside the card (original position) */}
              <div className="hidden sm:flex flex-col sm:flex-row items-center gap-4 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                  <div className="flex flex-col">
                    <span className="mb-2 w-16 rounded-xl bg-[#00613D] py-1 text-center text-xs text-white">
                      FUTAPAY
                    </span>
                    <span className="text-2xl font-medium text-black">
                      {totalPrice > 0 ? `${totalPrice.toLocaleString("vi-VN")}đ` : "0đ"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-auto items-center justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => router.push('/search')}
                    className="rounded-full border border-gray-300 bg-white px-6 sm:px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={goToPayment}
                    className="rounded-full bg-orange-500 px-6 sm:px-8 py-2 text-sm font-medium text-white hover:bg-orange-600 transition disabled:opacity-50"
                    disabled={!agreed || selectedSeats.length === 0}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Sidebar ───────────────────────────────────── */}
          {/*
              order-1 on mobile → appears ABOVE the main booking form so users
              see trip context before they pick seats.
              lg:order-none → restored to the right column on desktop.

              Inside: flex-col on mobile, flex-row on md (tablet, 3 cards side by
              side), back to flex-col on lg (stacked column).
          */}
          <div className="order-1 lg:order-none mx-auto flex w-full lg:min-w-[345px] flex-col md:flex-row lg:flex-col gap-4 md:gap-3 lg:gap-6">

            {/* Driver Info */}
            <div className="w-full md:flex-1 lg:flex-none rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
              <p className="mb-4 flex items-center justify-between text-xl font-medium text-black">
                <span className="flex items-center gap-2">Thông tin tài xế</span>
                <button
                  onClick={() => router.push(`/crew-score/${trip.driver.id}?tripId=${trip.id}`)}
                  className="text-base text-orange-500 underline cursor-pointer hover:text-orange-600"
                >
                  Chi tiết
                </button>
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500 shrink-0">
                  <img src={trip.driver.photo} alt="Tài xế" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-black">{trip.driver.name}</p>
                  <p className="text-sm text-gray-500">Mã: {trip.driver.employeeCode}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-orange-500">{trip.driver.crewScore}</span>
                    <span className="text-sm text-gray-400">/5</span>
                    <span className="text-xs text-gray-500">({trip.driver.totalRatings.toLocaleString("vi-VN")} đánh giá)</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">🛡️ Lái xe an toàn</span>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">😊 Nhiệt tình</span>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">⏰ Đúng giờ</span>
              </div>
            </div>

            {/* Crew (phụ xe) Info — mirrors the driver card so users can vet both staff before booking. */}
            <div className="w-full md:flex-1 lg:flex-none rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
              <p className="mb-4 flex items-center justify-between text-xl font-medium text-black">
                <span className="flex items-center gap-2">Thông tin phụ xe</span>
                <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full border border-orange-200">
                  Hỗ trợ hành khách
                </span>
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500 shrink-0">
                  <img src={trip.crew.photo} alt="Phụ xe" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-black">{trip.crew.name}</p>
                  <p className="text-sm text-gray-500">{trip.crew.yearsOfExperience} năm kinh nghiệm</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-orange-500">{trip.crew.rating}</span>
                    <span className="text-sm text-gray-400">/5</span>
                    <span className="text-xs text-gray-500">({trip.crew.totalRatings.toLocaleString("vi-VN")} đánh giá)</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {trip.crew.badges.map((b) => (
                  <span key={b} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                    🛡️ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Trip Info */}
            <div className="w-full md:flex-1 lg:flex-none rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
              <p className="mb-4 flex items-center justify-between text-xl font-medium text-black">
                <span className="flex items-center gap-2">Thông tin chuyến đi</span>
                <a className="text-base text-orange-500 underline cursor-pointer">Chi tiết</a>
              </p>
              <div className="flex justify-between">
                <span className="text-gray-500 w-20">Tuyến xe</span>
                <span className="text-right text-black">{trip.route}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-gray-500">Thời gian xuất bến</span>
                <span className="text-[#00613D]">{trip.departureTime} {trip.date}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-gray-500">Số lượng ghế</span>
                <span className="text-black">{selectedSeats.length} Ghế</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-gray-500">Số ghế</span>
                <span className="text-[#00613D]">{selectedSeats.join(", ")}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-gray-500">Tổng tiền lượt đi</span>
                <span className="text-[#00613D]">
                  {totalPrice > 0 ? `${totalPrice.toLocaleString("vi-VN")}đ` : "0đ"}
                </span>
              </div>
            </div>

            {/* Price Details */}
            <div className="w-full md:flex-1 lg:flex-none rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
              <div className="flex gap-2 text-xl font-medium text-black items-center">
                Chi tiết giá
                <svg className="w-5 h-5 text-orange-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-500">Giá vé lượt đi</span>
                <span className="text-orange-500">
                  {totalPrice > 0 ? `${totalPrice.toLocaleString("vi-VN")}đ` : "0đ"}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-gray-500">Phí thanh toán</span>
                <span className="text-black">0đ</span>
              </div>
              <div className="my-3 h-[1px] bg-gray-200" />
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Tổng tiền</span>
                <span className="text-orange-500">
                  {totalPrice > 0 ? `${totalPrice.toLocaleString("vi-VN")}đ` : "0đ"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky bottom bar (mobile only) ────────────────────────
          Replaces the footer actions hidden inside the card on mobile.
          Shown only below sm breakpoint. */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3 sm:hidden">
        <div className="flex flex-col">
          <span className="mb-1 w-14 rounded-xl bg-[#00613D] py-0.5 text-center text-[10px] text-white">
            FUTAPAY
          </span>
          <span className="text-lg font-semibold text-black">
            {totalPrice > 0 ? `${totalPrice.toLocaleString("vi-VN")}đ` : "0đ"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push('/search')}
            className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={goToPayment}
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600 transition disabled:opacity-50"
            disabled={!agreed || selectedSeats.length === 0}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </main>
  );
};
