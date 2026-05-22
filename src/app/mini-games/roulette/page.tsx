"use client";

import dynamic from "next/dynamic";

const RoulettePage = dynamic(() => import("@/sections/RoulettePage").then(mod => ({ default: mod.RoulettePage })), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">Đang tải...</div>
});

export default function Page() {
  return <RoulettePage />;
}
