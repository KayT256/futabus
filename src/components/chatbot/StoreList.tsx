import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface Terminal {
  city: string;
  name: string;
  addr: string;
}

interface StoreListProps {
  terminals: Terminal[];
}

export function StoreList({ terminals }: StoreListProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 mt-2 mb-3">
      {terminals.map((terminal, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h5 className="font-black italic text-gray-900 text-sm uppercase">{terminal.name}</h5>
            <span className="text-[9px] font-bold bg-gray-100 px-2 py-1 rounded">{terminal.city}</span>
          </div>
          <p className="text-[11px] text-gray-400 mb-4 flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#f97316]" />
            {terminal.addr}
          </p>
          <button className="w-full py-3 bg-gray-50 rounded-xl text-[10px] font-extrabold uppercase tracking-widest hover:bg-orange-50 hover:text-[#f97316] transition-all cursor-pointer">
            Chỉ đường tới đây
          </button>
        </div>
      ))}
    </motion.div>
  );
}
