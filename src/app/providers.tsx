"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { JourneyProvider } from "@/contexts/JourneyContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { VoucherProvider } from "@/contexts/VoucherContext";
import { EmbeddedFrame } from "@/components/EmbeddedFrame";
import { FloatingWidget } from "@/components/FloatingWidget";

// All client-side global state lives here. Wrapping at the layout level keeps
// providers stable across route transitions (no remount) — critical for
// JourneyContext which holds the active booking through the whole flow.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WalletProvider>
        <VoucherProvider>
          <JourneyProvider>
            {children}
            <EmbeddedFrame />
            <FloatingWidget />
            <Toaster position="top-center" richColors closeButton />
          </JourneyProvider>
        </VoucherProvider>
      </WalletProvider>
    </AuthProvider>
  );
}
