import { motion } from "framer-motion";
import type { Trip } from "@/data/trips";

const formatVND = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

interface CatalogGridProps {
  filter: string;
  trips: Trip[];
}

export function CatalogGrid({ filter, trips }: CatalogGridProps) {
  const filteredTrips = filter === "all"
    ? trips
    : trips.filter((t) => {
        if (filter === "Tiết kiệm") return t.price < 300000;
        if (filter === "Phổ thông") return t.price >= 300000 && t.price <= 600000;
        if (filter === "Cao cấp") return t.price > 600000;
        return true;
      });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 mb-3 px-1">
      {filteredTrips.map((trip) => (
        <a key={trip.id} href="#" className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="relative">
            <div className="w-full aspect-[3/4] object-cover bg-gray-50 flex items-center justify-center">
              <span className="text-gray-400 text-sm">{trip.busType}</span>
            </div>
            {trip.availableSeats > 0 && (
              <span className="absolute top-2 left-2 bg-[#f97316] text-white text-[9px] font-extrabold px-2 py-1 rounded-full">
                {trip.availableSeats} chỗ
              </span>
            )}
          </div>
          <div className="p-3">
            <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">{trip.busType}</p>
            <h5 className="text-[11px] font-extrabold leading-tight h-8 overflow-hidden">{trip.route}</h5>
            <div className="mt-2">
              <span className="text-xs font-extrabold text-[#f97316]">{formatVND(trip.price)}</span>
            </div>
          </div>
        </a>
      ))}
    </motion.div>
  );
}
