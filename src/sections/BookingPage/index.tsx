import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SeatStatus = "disabled" | "available" | "selected";

interface Seat {
  id: string;
  status: SeatStatus;
}

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
  const isAvailable = status === "available";

  const seatColor = isDisabled ? "#D5D9DD" : isSelected ? "#FDEDE8" : "#DEF3FF";

  const borderColor = isDisabled
    ? "#C0C6CC"
    : isSelected
      ? "#F8BEAB"
      : "#96C5E7";

  const textColor = isDisabled ? "#A2ABB3" : isSelected ? "#EF5222" : "#339AF4";

  return (
    <td
      className={`relative mt-1 flex justify-center text-center ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={isDisabled ? undefined : onClick}
    >
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect
          x="1"
          y="1"
          width="32"
          height="28"
          rx="5"
          fill={seatColor}
          stroke={borderColor}
          strokeWidth="1.5"
        />
        <rect
          x="4"
          y="26"
          width="6"
          height="7"
          rx="2"
          fill={seatColor}
          stroke={borderColor}
          strokeWidth="1.5"
        />
        <rect
          x="24"
          y="26"
          width="6"
          height="7"
          rx="2"
          fill={seatColor}
          stroke={borderColor}
          strokeWidth="1.5"
        />
        <rect
          x="1"
          y="6"
          width="4"
          height="14"
          rx="2"
          fill={seatColor}
          stroke={borderColor}
          strokeWidth="1.5"
        />
        <rect
          x="29"
          y="6"
          width="4"
          height="14"
          rx="2"
          fill={seatColor}
          stroke={borderColor}
          strokeWidth="1.5"
        />
      </svg>
      <span
        className="absolute text-[10px] font-semibold top-1"
        style={{ color: textColor }}
      >
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
  const navigate = useNavigate();
  const [lowerSeats, setLowerSeats] = useState(lowerDeckSeats);
  const [upperSeats, setUpperSeats] = useState(upperDeckSeats);
  const [pickupType, setPickupType] = useState<"station" | "shuttle">(
    "station",
  );
  const [dropType, setDropType] = useState<"station" | "shuttle">("station");
  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [agreed, setAgreed] = useState(false);

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
          return {
            ...seat,
            status: seat.status === "available" ? "selected" : "available",
          };
        }),
      ),
    );
  };

  const getAllSelectedSeats = () => {
    const lower = lowerSeats
      .flat()
      .filter((s) => s?.status === "selected")
      .map((s) => s!.id);
    const upper = upperSeats
      .flat()
      .filter((s) => s?.status === "selected")
      .map((s) => s!.id);
    return [...lower, ...upper];
  };

  const selectedSeats = getAllSelectedSeats();
  const ticketPrice = 80000;
  const totalPrice = selectedSeats.length * ticketPrice;

  return (
    <main className="w-full bg-[#f3f3f5] min-h-screen">
      {/* Back button header */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center">
          <button
            onClick={() => navigate('/search')}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Quay lại</span>
          </button>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto pb-2 md:pb-8">
        <div className="flex w-full flex-col gap-6 pt-0 lg:flex-row lg:pt-8">
          {/* Left - Main Content */}
          <div className="flex w-full flex-col">
            {/* Seat Selection Card */}
            <div className="flex w-full flex-col rounded-xl border bg-white">
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="mx-auto flex w-full max-w-2xl flex-col px-3 py-1 lg:mx-0 lg:w-auto">
                    <div className="flex max-w-xs items-start justify-between pt-5 text-xl font-medium text-black">
                      <p className="flex flex-col">Chọn ghế</p>
                      <button className="cursor-pointer text-sm text-blue-400 underline">
                        Thông tin xe
                      </button>
                    </div>

                    <div className="my-4 flex flex-row text-center font-medium gap-4 sm:gap-6">
                      {/* Lower Deck */}
                      <div className="flex min-w-[50%] flex-col md:min-w-[153px]">
                        <div className="flex w-full justify-center p-2 text-sm bg-gray-100 rounded">
                          <span>Tầng dưới</span>
                        </div>
                        <div className="mb-4 mt-2" />
                        <DeckTable
                          seats={lowerSeats}
                          onToggle={(id) =>
                            toggleSeat(lowerSeats, setLowerSeats, id)
                          }
                        />
                      </div>

                      {/* Upper Deck */}
                      <div className="flex min-w-[50%] flex-col md:min-w-[153px]">
                        <div className="flex w-full justify-center p-2 text-sm bg-gray-100 rounded">
                          <span>Tầng trên</span>
                        </div>
                        <div className="mb-4 mt-2" />
                        <DeckTable
                          seats={upperSeats}
                          onToggle={(id) =>
                            toggleSeat(upperSeats, setUpperSeats, id)
                          }
                        />
                      </div>

                      {/* Legend */}
                      <div className="ml-4 mt-5 flex flex-col gap-4 text-[13px] font-normal">
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
                  <p className="text-xl font-medium text-black">
                    Thông tin khách hàng
                  </p>
                  <form className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="name" className="text-sm font-medium">
                        Họ và tên <span className="text-[#E12424]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={customerForm.name}
                        onChange={(e) =>
                          setCustomerForm({
                            ...customerForm,
                            name: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setCustomerForm({
                            ...customerForm,
                            phone: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setCustomerForm({
                            ...customerForm,
                            email: e.target.value,
                          })
                        }
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
                        Quý khách vui lòng Đăng ký/Đăng nhập tài khoản để nhận
                        chương trình khuyến mãi.
                      </strong>
                    </p>
                    <p>
                      (*) Quý khách vui lòng có mặt tại bến xuất phát của xe
                      trước ít nhất 30 phút giờ xe khởi hành, mang theo thông
                      báo đã thanh toán vé thành công có chứa mã vé được gửi từ
                      hệ thống FUTA BUS LINES. Vui lòng liên hệ Trung tâm tổng
                      đài{" "}
                      <a href="tel:19006067" className="text-orange-500">
                        1900 6067
                      </a>{" "}
                      để được hỗ trợ.
                    </p>
                    <p>
                      (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên
                      hệ Tổng đài trung chuyển{" "}
                      <a href="tel:19006918" className="text-orange-500">
                        1900 6918
                      </a>{" "}
                      trước khi đặt vé.
                    </p>
                    <p>
                      (*) Nếu quý khách có nhu cầu di chuyển chặng đường ngắn
                      hơn so với hành trình, vui lòng gọi Tổng đài{" "}
                      <a href="tel:19006067" className="text-orange-500">
                        1900 6067
                      </a>{" "}
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
                  <span className="cursor-pointer text-orange-500 underline">
                    Chấp nhận điều khoản
                  </span>{" "}
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
                    <svg
                      className="w-5 h-5 text-orange-500 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path
                        d="M12 16v-4M12 8h.01"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="mt-6 flex gap-6">
                    {/* Pickup */}
                    <div className="flex flex-1 flex-col gap-4">
                      <span className="text-base font-medium uppercase">
                        Điểm đón
                      </span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1 cursor-pointer text-sm">
                          <input
                            type="radio"
                            name="pickup"
                            checked={pickupType === "station"}
                            onChange={() => setPickupType("station")}
                            className="accent-orange-500"
                          />
                          Bến xe/VP
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-sm">
                          <input
                            type="radio"
                            name="pickup"
                            checked={pickupType === "shuttle"}
                            onChange={() => setPickupType("shuttle")}
                            className="accent-orange-500"
                          />
                          Trung chuyển
                        </label>
                      </div>
                      <div className="flex w-full cursor-pointer items-center justify-between border border-gray-300 rounded px-3 py-2 text-[15px] bg-white">
                        <span>Bến xe Miền Tây</span>
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-wrap gap-1 text-sm">
                        <span>
                          Quý khách vui lòng có mặt tại Bến xe/Văn Phòng
                        </span>
                        <span className="font-semibold">Bến xe Miền Tây</span>
                        <span className="font-semibold text-red-500">
                          Trước 11:45 15/05/2026
                        </span>
                        <span>
                          để được trung chuyển hoặc kiểm tra thông tin trước khi
                          lên xe.
                        </span>
                      </div>
                    </div>

                    <div className="h-full w-[1px] border-r border-gray-200" />

                    {/* Drop-off */}
                    <div className="flex flex-1 flex-col gap-4">
                      <span className="text-base font-medium uppercase">
                        Điểm trả
                      </span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1 cursor-pointer text-sm">
                          <input
                            type="radio"
                            name="drop"
                            checked={dropType === "station"}
                            onChange={() => setDropType("station")}
                            className="accent-orange-500"
                          />
                          Bến xe/VP
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-sm">
                          <input
                            type="radio"
                            name="drop"
                            checked={dropType === "shuttle"}
                            onChange={() => setDropType("shuttle")}
                            className="accent-orange-500"
                          />
                          Trung chuyển
                        </label>
                      </div>
                      <div className="flex w-full cursor-pointer items-center justify-between border border-gray-300 rounded px-3 py-2 text-[15px] bg-white">
                        <span>Bến xe Cần Thơ</span>
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[2px] bg-gray-100" />

              {/* Footer Actions */}
              <div className="flex items-center p-6">
                <div className="flex flex-col">
                  <span className="mb-2 w-16 rounded-xl bg-[#00613D] py-1 text-center text-xs text-white">
                    FUTAPAY
                  </span>
                  <span className="text-2xl font-medium text-black">
                    {totalPrice > 0
                      ? `${totalPrice.toLocaleString("vi-VN")}đ`
                      : "0đ"}
                  </span>
                </div>
                <div className="flex flex-auto items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => navigate('/search')}
                    className="rounded-full border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                     Hủy
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-orange-500 px-8 py-2 text-sm font-medium text-white hover:bg-orange-600 transition disabled:opacity-50"
                    disabled={!agreed || selectedSeats.length === 0}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="mx-auto flex min-w-[345px] flex-col gap-6">
            {/* Driver Info with Crew Score */}
            <div className="w-full rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
              <p className="mb-4 flex items-center justify-between text-xl font-medium text-black">
                <span className="flex items-center gap-2">
                  Thông tin tài xế
                </span>
                <button
                  onClick={() => navigate('/crew-score/TX001')}
                  className="text-base text-orange-500 underline cursor-pointer hover:text-orange-600"
                >
                  Chi tiết
                </button>
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500">
                  <img
                    src="https://i.pravatar.cc/150?img=68"
                    alt="Tài xế"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-black">Nguyễn Văn Minh</p>
                  <p className="text-sm text-gray-500">Mã: FUTA-TX-00123</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-orange-500">4.8</span>
                    <span className="text-sm text-gray-400">/5</span>
                    <span className="text-xs text-gray-500">(2,156 đánh giá)</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                  🛡️ Lái xe an toàn
                </span>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                  😊 Nhiệt tình
                </span>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                  ⏰ Đúng giờ
                </span>
              </div>
            </div>

            {/* Trip Info */}
            <div className="w-full rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
              <p className="mb-4 flex items-center justify-between text-xl font-medium text-black">
                <span className="flex items-center gap-2">
                  Thông tin chuyến đi
                </span>
                <a className="text-base text-orange-500 underline cursor-pointer">
                  Chi tiết
                </a>
              </p>
              <div className="flex justify-between">
                <span className="text-gray-500 w-20">Tuyến xe</span>
                <span className="text-right text-black">
                  Mien Tay - Can Tho
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-gray-500">Thời gian xuất bến</span>
                <span className="text-[#00613D]">12:00 15/05/2026</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-gray-500">Số lượng ghế</span>
                <span className="text-black">{selectedSeats.length} Ghế</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-gray-500">Số ghế</span>
                <span className="text-[#00613D]">
                  {selectedSeats.join(", ")}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-gray-500">Tổng tiền lượt đi</span>
                <span className="text-[#00613D]">
                  {totalPrice > 0
                    ? `${totalPrice.toLocaleString("vi-VN")}đ`
                    : "0đ"}
                </span>
              </div>
            </div>

            {/* Price Details */}
            <div className="w-full rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
              <div className="flex gap-2 text-xl font-medium text-black items-center">
                Chi tiết giá
                <svg
                  className="w-5 h-5 text-orange-500 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    d="M12 16v-4M12 8h.01"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-500">Giá vé lượt đi</span>
                <span className="text-orange-500">
                  {totalPrice > 0
                    ? `${totalPrice.toLocaleString("vi-VN")}đ`
                    : "0đ"}
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
                  {totalPrice > 0
                    ? `${totalPrice.toLocaleString("vi-VN")}đ`
                    : "0đ"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};