import { motion } from "framer-motion";
import type { Trip } from "@/data/trips";

const formatVND = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

interface TravelPlanCardProps {
  budget: string;
  duration: string;
  vehicleType: string;
  trips: Trip[];
}

export function TravelPlanCard({ budget, duration, vehicleType, trips }: TravelPlanCardProps) {
  const scoreTrip = (t: Trip): number => {
    let score = 0;
    if (budget.includes("Tiết kiệm") && t.price < 300000) score += 5;
    if (budget.includes("Phổ thông") && t.price >= 300000 && t.price <= 600000) score += 5;
    if (budget.includes("Cao cấp") && t.price > 600000) score += 5;
    if (duration.includes("Ngắn") && t.duration.includes("giờ") && parseInt(t.duration) < 5) score += 3;
    if (duration.includes("Trung bình") && t.duration.includes("giờ") && parseInt(t.duration) >= 5 && parseInt(t.duration) <= 12) score += 3;
    if (duration.includes("Dài") && t.duration.includes("giờ") && parseInt(t.duration) > 12) score += 3;
    if (vehicleType.includes("Ghế ngồi") && t.busType.includes("Ghế")) score += 3;
    if (vehicleType.includes("Giường nằm") && t.busType.includes("Giường")) score += 3;
    return score;
  };

  const rankedTrips = trips.sort((a, b) => scoreTrip(b) - scoreTrip(a));
  const topTrip = rankedTrips[0];
  const sideTrips = rankedTrips.slice(1, 3);
  const items = [topTrip, ...sideTrips].filter(Boolean) as Trip[];
  const total = items.reduce((s, t) => s + t.price, 0);

  const planName = budget.includes("Tiết kiệm") ? "Kế hoạch Tiết kiệm Thông minh"
    : budget.includes("Phổ thông") ? "Kế hoạch Cân bằng Hoàn hảo"
    : "Kế hoạch Cao cấp Sang trọng";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-3xl shadow-2xl mt-2 mb-3 border border-gray-100"
    >
      <div className="grid grid-cols-2 gap-2 mb-4">
        {topTrip && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-2xl overflow-hidden bg-gray-50 ${sideTrips.length === 0 ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"}`}>
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">{topTrip.busType}</span>
            </div>
          </motion.div>
        )}
        {sideTrips.length > 0 && (
          <div className={`grid gap-2 ${sideTrips.length === 1 ? "grid-rows-1" : "grid-rows-2"}`}>
            {sideTrips.map((t) => (
              <motion.div key={t.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl overflow-hidden bg-gray-50">
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400 text-sm">{t.busType}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-1 mb-3 px-2">
        {items.map((t) => (
          <div key={t.id} className="flex justify-between text-[11px]">
            <span className="text-gray-600 font-medium truncate mr-2">{t.route}</span>
            <span className="text-[#f97316] font-bold whitespace-nowrap">{formatVND(t.price)}</span>
          </div>
        ))}
      </div>
      <div className="px-2">
        <h4 className="font-black italic text-gray-900 mb-1">Kế hoạch: {planName}</h4>
        <p className="text-[11px] text-gray-400 mb-4">
          Kế hoạch du lịch được AI chọn riêng cho bạn · {items.length} tuyến đề xuất
        </p>
        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase">Tổng ước tính</p>
            <p className="font-black text-[#f97316]">{formatVND(total)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
