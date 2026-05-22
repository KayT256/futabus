import { useState } from "react";
import { motion } from "framer-motion";

interface QuizOptionsProps {
  step: number;
  options: string[];
  onAnswer: (answer: string, step: number) => void;
  disabled: boolean;
}

export function QuizOptions({ step, options, onAnswer, disabled }: QuizOptionsProps) {
  const [answered, setAnswered] = useState(false);
  const isDisabled = disabled || answered;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2 mt-2 mb-3">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => {
            if (!isDisabled) {
              setAnswered(true);
              onAnswer(opt, step);
            }
          }}
          disabled={isDisabled}
          className={`w-full bg-white border border-gray-100 p-4 rounded-2xl text-left font-bold text-sm shadow-sm transition-all ${isDisabled ? "opacity-50 cursor-default" : "hover:border-[#f97316] cursor-pointer"}`}
        >
          {opt}
        </button>
      ))}
    </motion.div>
  );
}
