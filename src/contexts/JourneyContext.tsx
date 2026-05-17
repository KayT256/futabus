// Single source of truth for an active booking + journey across all the new screens.
// Persists to localStorage so a refresh on /journey, /smart-stop, /futa-rada, etc.
// doesn't wipe out the user's progress mid-trip.
// Auth lives in AuthContext, this lives separately because journey state is per-trip
// and would survive a logout in a real app (e.g. anonymous booking → log in later to view ticket).

import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from "react";
import type { Trip } from "@/data/trips";
import type { Voucher } from "@/data/vouchers";
import type { WalletId } from "@/data/wallets";

// 9 phases mirror the prototype's user journey:
// pre-departure (waiting_shuttle → at_terminal) → on-board (boarded → arrived).
export type JourneyPhase =
  | "waiting_shuttle"
  | "shuttle_onboard"
  | "at_terminal"
  | "boarded"
  | "in_transit"
  | "near_rest"
  | "at_rest"
  | "resuming"
  | "arrived";

export const PHASE_ORDER: JourneyPhase[] = [
  "waiting_shuttle",
  "shuttle_onboard",
  "at_terminal",
  "boarded",
  "in_transit",
  "near_rest",
  "at_rest",
  "resuming",
  "arrived",
];

export const PHASE_INFO: Record<JourneyPhase, { label: string; sub: string; emoji: string }> = {
  waiting_shuttle: { label: "Đang chờ xe trung chuyển", sub: "Xe trung chuyển sẽ đến đón bạn", emoji: "🚐" },
  shuttle_onboard: { label: "Trên xe trung chuyển", sub: "Đang tới bến xe xuất phát", emoji: "🚐" },
  at_terminal: { label: "Đã đến bến xe", sub: "Tìm chỗ lên xe Limousine", emoji: "🏢" },
  boarded: { label: "Đã lên xe", sub: "Chuẩn bị khởi hành", emoji: "🚌" },
  in_transit: { label: "Đang di chuyển", sub: "Trên đường tới Đà Lạt", emoji: "🛣️" },
  near_rest: { label: "Sắp đến trạm dừng chân", sub: "Còn 10 phút — đặt món trước nhé!", emoji: "🍽️" },
  at_rest: { label: "Tại trạm dừng Madagui", sub: "Dừng 20 phút — pickup đơn của bạn", emoji: "☕" },
  resuming: { label: "Tiếp tục hành trình", sub: "Còn ~1h30 nữa tới Đà Lạt", emoji: "🛣️" },
  arrived: { label: "Đã đến Đà Lạt!", sub: "Cảm ơn bạn đã đi cùng FUTA", emoji: "🎉" },
};

// Pickup/dropoff: 3-way pickup (terminal/shuttle/office), 2-way dropoff (terminal/shuttle).
// Mirrors the prototype's PickupInfo type but renamed for our codebase.
export type PickupType = "terminal" | "shuttle" | "office";
export type DropoffType = "terminal" | "shuttle";

export interface PickupInfo {
  pickupType: PickupType;
  pickupPoint: string;
  dropoffType: DropoffType;
  dropoffPoint: string;
}

export interface ActiveBooking {
  // Snapshot of the trip at booking time — keeps the ticket stable even if data/trips.ts changes.
  trip: Trip;
  seats: string[];
  pickup: PickupInfo;
  paymentMethod: WalletId;
  voucher: Voucher | null;
  // ISO timestamp — used for "Booked at" timestamps and ticket QR uniqueness.
  bookedAt: string;
  // Final amount paid (after voucher) — frozen at payment time.
  totalPaid: number;
}

export interface ActiveJourney {
  booking: ActiveBooking;
  phase: JourneyPhase;
  // Smart Stop cart: { foodId: quantity }.
  cart: Record<string, number>;
  pickedUp: boolean;
  // Whether the user has already used the Terminal Map and "found" the bus.
  // Drives whether we show "Find my bus" CTA or "Show my QR" CTA on the Journey screen.
  foundBusAtTerminal: boolean;
}

interface JourneyContextValue {
  activeJourney: ActiveJourney | null;

  // Booking step. Called by Smart Pay when the user successfully pays.
  // The starting phase depends on pickup type — terminal pickup skips the shuttle-tracking phases.
  startJourney: (booking: ActiveBooking) => void;

  setPhase: (phase: JourneyPhase) => void;
  advancePhase: () => void;
  setCart: (cart: Record<string, number>) => void;
  setPickedUp: (v: boolean) => void;
  setFoundBusAtTerminal: (v: boolean) => void;

  // Called when the user taps "Hoàn thành" on the rating screen — clears everything.
  endJourney: () => void;
}

const JourneyContext = createContext<JourneyContextValue | undefined>(undefined);

const STORAGE_KEY = "futabus.activeJourney.v1";

// Read once at boot. Wrapped in try/catch because corrupted localStorage shouldn't crash the app.
const loadFromStorage = (): ActiveJourney | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ActiveJourney;
    // Basic shape guard. If anything looks wrong, drop it instead of trusting the cache.
    if (!parsed?.booking?.trip?.id || !parsed.phase) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const JourneyProvider = ({ children }: { children: ReactNode }) => {
  const [activeJourney, setActiveJourney] = useState<ActiveJourney | null>(loadFromStorage);

  // Persist on every change. Using JSON.stringify is fine because the journey object is small
  // and writes only happen on user-driven state transitions (phase change, cart edit, etc.).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (activeJourney) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activeJourney));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [activeJourney]);

  const startJourney = useCallback((booking: ActiveBooking) => {
    // Terminal pickup → user is already at the bus, skip shuttle-tracking phases.
    // Shuttle/office pickup → start at "waiting_shuttle" so they can use FUTA Rada.
    const startingPhase: JourneyPhase =
      booking.pickup.pickupType === "terminal" ? "at_terminal" : "waiting_shuttle";

    setActiveJourney({
      booking,
      phase: startingPhase,
      cart: {},
      pickedUp: false,
      foundBusAtTerminal: false,
    });
  }, []);

  const setPhase = useCallback((phase: JourneyPhase) => {
    setActiveJourney((prev) => (prev ? { ...prev, phase } : prev));
  }, []);

  const advancePhase = useCallback(() => {
    setActiveJourney((prev) => {
      if (!prev) return prev;
      const idx = PHASE_ORDER.indexOf(prev.phase);
      if (idx >= PHASE_ORDER.length - 1) return prev;
      return { ...prev, phase: PHASE_ORDER[idx + 1] };
    });
  }, []);

  const setCart = useCallback((cart: Record<string, number>) => {
    setActiveJourney((prev) => (prev ? { ...prev, cart } : prev));
  }, []);

  const setPickedUp = useCallback((pickedUp: boolean) => {
    setActiveJourney((prev) => (prev ? { ...prev, pickedUp } : prev));
  }, []);

  const setFoundBusAtTerminal = useCallback((foundBusAtTerminal: boolean) => {
    setActiveJourney((prev) => (prev ? { ...prev, foundBusAtTerminal } : prev));
  }, []);

  const endJourney = useCallback(() => {
    setActiveJourney(null);
  }, []);

  const value = useMemo<JourneyContextValue>(
    () => ({
      activeJourney,
      startJourney,
      setPhase,
      advancePhase,
      setCart,
      setPickedUp,
      setFoundBusAtTerminal,
      endJourney,
    }),
    [activeJourney, startJourney, setPhase, advancePhase, setCart, setPickedUp, setFoundBusAtTerminal, endJourney],
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
};

export const useJourney = () => {
  const ctx = useContext(JourneyContext);
  if (!ctx) {
    throw new Error("useJourney must be used within a JourneyProvider");
  }
  return ctx;
};
