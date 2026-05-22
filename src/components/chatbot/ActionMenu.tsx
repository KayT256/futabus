import { useState } from "react";
import { motion } from "framer-motion";
import { Bus, Sparkles, ShoppingBag, MapPin } from "lucide-react";

interface ActionMenuProps {
  onRouteSearch: () => void;
  onTripPlanning: () => void;
  onQuiz: () => void;
  onTerminalLookup: () => void;
  disabled: boolean;
}

export function ActionMenu({ onRouteSearch, onTripPlanning, onQuiz, onTerminalLookup, disabled }: ActionMenuProps) {
  const [chosen, setChosen] = useState<number | null>(null);
  const isDisabled = disabled || chosen !== null;
  const actions = [
    { icon: <Bus className="w-6 h-6 text-[#f97316]" />, title: "Tìm chuyến xe", sub: "Tìm kiếm chuyến", fn: onRouteSearch },
    { icon: <Sparkles className="w-6 h-6 text-[#f97316]" />, title: "Tư vấn chuyến", sub: "Lên kế hoạch", fn: onTripPlanning },
    { icon: <ShoppingBag className="w-6 h-6 text-[#f97316]" />, title: "Quiz du lịch", sub: "Khám phá phong cách", fn: onQuiz },
    { icon: <MapPin className="w-6 h-6 text-[#f97316]" />, title: "Tìm bến xe", sub: "Địa chỉ gần bạn", fn: onTerminalLookup },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 mb-3 px-1">
      {actions.map((a, i) => (
        <button
          key={i}
          onClick={() => {
            if (!isDisabled) {
              setChosen(i);
              a.fn();
            }
          }}
          disabled={isDisabled}
          className={`bg-white rounded-3xl p-5 border flex flex-col gap-2.5 shadow-[0_10px_20px_rgba(0,0,0,0.02)] transition-all text-left ${
            isDisabled
              ? chosen === i
                ? "border-[#f97316] opacity-100 cursor-default"
                : "border-gray-100 opacity-40 cursor-default"
              : "border-gray-100 hover:-translate-y-1 hover:border-[#f97316] hover:shadow-[0_15px_30px_rgba(249,115,22,0.1)] cursor-pointer"
          }`}
        >
          {a.icon}
          <div>
            <h4 className="font-extrabold text-[13px] uppercase tracking-wide">{a.title}</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase">{a.sub}</p>
          </div>
        </button>
      ))}
    </motion.div>
  );
}
