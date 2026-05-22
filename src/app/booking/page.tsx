"use client";

import { Suspense } from "react";
import { BookingPage } from "@/sections/BookingPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center">Đang tải...</div>}>
      <BookingPage />
    </Suspense>
  );
}
