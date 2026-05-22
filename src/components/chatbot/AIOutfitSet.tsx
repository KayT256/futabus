import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Trip } from "@/data/trips";

const formatVND = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

interface AIOutfitSetProps {
  setName: string;
  tripIds: string[];
  trips: Trip[];
}

export function AIOutfitSet({ setName, tripIds, trips }: AIOutfitSetProps) {
  const setTrips = tripIds.map((id) => trips.find((t) => t.id === id.trim())).filter(Boolean) as Trip[];
  if (setTrips.length === 0) return null;

  const total = setTrips.reduce((sum, t) => sum + t.price, 0);
  const mainItem = setTrips[0];
  const sideItems = setTrips.slice(1);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-3xl shadow-2xl mt-2 mb-3 border border-gray-100">
      <div className="grid grid-cols-2 gap-2 mb-4">
        {mainItem && (
          <div className={`rounded-2xl overflow-hidden bg-gray-50 ${sideItems.length === 0 ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"}`}>
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">{mainItem.busType}</span>
            </div>
          </div>
        )}
        {sideItems.length > 0 && (
          <div className={`grid gap-2 ${sideItems.length === 1 ? "grid-rows-1" : "grid-rows-2"}`}>
            {sideItems.map((t) => (
              <div key={t.id} className="rounded-2xl overflow-hidden bg-gray-50">
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400 text-sm">{t.busType}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-1 mb-3 px-2">
        {setTrips.map((t) => (
          <div key={t.id} className="flex justify-between text-[11px]">
            <span className="text-gray-600 font-medium truncate mr-2">{t.route}</span>
            <span className="text-[#f97316] font-bold whitespace-nowrap">{formatVND(t.price)}</span>
          </div>
        ))}
      </div>
      <div className="px-2">
        <h4 className="font-black italic text-gray-900 mb-1">Set: {setName}</h4>
        <p className="text-[11px] text-gray-400 mb-4">
          Bộ chuyến đi được AI chọn riêng cho bạn · {setTrips.length} tuyến đề xuất
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
