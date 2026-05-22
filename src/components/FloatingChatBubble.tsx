"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export const FloatingChatBubble = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <Link
        href="/chatbot"
        className="group flex items-center gap-3 bg-[#f97316] hover:bg-[#ea580c] text-white pl-5 pr-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6 shrink-0" />
        <div className="flex flex-col leading-tight">
          <span className="text-[15px] font-bold tracking-wide">Trợ lý AI FUTA</span>
          <span className="text-[11px] opacity-80 font-light">Tư vấn đặt vé 24/7</span>
        </div>
      </Link>
    </div>
  );
};
