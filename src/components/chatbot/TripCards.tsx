import { motion } from "framer-motion";
import type { Trip } from "@/data/trips";

const formatVND = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

interface TripCardsProps {
  trips: Array<{ id: string; display: "trip" | "map" }>;
  allTrips: Trip[];
}

export function TripCards({ trips, allTrips }: TripCardsProps) {
  const items = trips
    .map((ref) => {
      const trip = allTrips.find((t) => t.id === ref.id);
      return trip ? { ...trip, displayMode: ref.display } : null;
    })
    .filter(Boolean) as (Trip & { displayMode: "trip" | "map" })[];
  
  if (items.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 mt-1 mb-3 overflow-x-auto pb-2 px-1 scrollbar-hide">
      {items.map((trip) => (
        <motion.div
          key={trip.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-shrink-0 w-[160px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative">
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
              <span className="text-4xl">🚌</span>
            </div>
          </div>
          <div className="p-2.5">
            <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">{trip.busType}</p>
            <h5 className="text-[10px] font-extrabold leading-tight h-7 overflow-hidden">{trip.route}</h5>
            <p className="text-[10px] text-gray-400 mt-0.5">{trip.duration}</p>
            <p className="text-xs font-extrabold text-[#f97316] mt-1">{formatVND(trip.price)}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
