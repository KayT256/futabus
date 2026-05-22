import { useState } from "react";
import { motion } from "framer-motion";

interface CityPickerProps {
  cities: string[];
  onSelect: (city: string) => void;
  disabled: boolean;
}

export function CityPicker({ cities, onSelect, disabled }: CityPickerProps) {
  const [chosen, setChosen] = useState<string | null>(null);
  const isDisabled = disabled || chosen !== null;
  const options = [
    { label: "TP. Hồ Chí Minh", value: "HCM" },
    { label: "Hà Nội", value: "Hà Nội" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 mt-2 mb-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => {
            if (!isDisabled) {
              setChosen(opt.value);
              onSelect(opt.value);
            }
          }}
          disabled={isDisabled}
          className={`bg-white border px-6 py-3 rounded-xl text-xs font-extrabold uppercase transition-colors ${
            isDisabled
              ? chosen === opt.value
                ? "border-[#f97316] text-[#f97316] cursor-default"
                : "border-gray-200 opacity-40 cursor-default"
              : "border-gray-200 hover:border-[#f97316] cursor-pointer"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </motion.div>
  );
}
