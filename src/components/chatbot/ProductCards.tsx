import { motion } from "framer-motion";
import { Route } from "@/lib/types";
import { formatVND } from "@/lib/routes";

interface ProductCardsProps {
  routes: Route[];
}

export function ProductCards({ routes }: ProductCardsProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 mt-1 mb-3 overflow-x-auto pb-2 px-1 scrollbar-hide">
      {routes.map((route) => (
        <motion.div
          key={route.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-shrink-0 w-[160px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative">
            <img src={route.productImage || route.image} alt={route.name} className="w-full aspect-[3/4] object-cover bg-gray-50" />
            {route.isNew && (
              <span className="absolute top-2 left-2 bg-[#f97316] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full">New</span>
            )}
          </div>
          <div className="p-2.5">
            <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">{route.type}</p>
            <h5 className="text-[10px] font-extrabold leading-tight h-7 overflow-hidden">{route.name}</h5>
            <p className="text-[10px] text-gray-400 mt-0.5">{route.duration}</p>
            <p className="text-xs font-extrabold text-[#f97316] mt-1">{formatVND(route.price)}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
