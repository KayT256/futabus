"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { FloatingChatBubble } from "@/components/FloatingChatBubble";

export default function HomePage() {
  return (
    <>
      <MainLayout />
      <FloatingChatBubble />
    </>
  );
}
