// Centralized voucher system for both payment vouchers and mini-game rewards.
// Persists to localStorage like JourneyContext and WalletContext.

import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from "react";
import type { WalletId } from "@/data/wallets";

// Voucher types from different sources
export type VoucherSource = "payment" | "daily_quiz" | "roulette";

// Extended voucher interface with game-specific properties
export interface GameVoucher {
  id: string;
  code: string;
  wallet?: WalletId;
  saving: number;
  label: string;
  min?: number;
  tag?: "Hot" | "Best" | "VIP" | "New";
  source: VoucherSource;
  earnedAt: string;
  expiresAt?: string;
  used: boolean;
  usedOnTripId?: string;
  // For game vouchers: game-specific metadata
  gameMetadata?: {
    quizScore?: number;
    gameType?: "roulette";
  };
  // Discount type: "fixed" for direct amount, "percentage" for percentage-based discounts
  discountType?: "fixed" | "percentage";
}

// Quiz question interface
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer
  explanation?: string;
}

// Daily quiz state
export interface DailyQuizState {
  lastPlayedDate: string; // ISO date string (YYYY-MM-DD)
  score: number; // 0-10
  completed: boolean;
  voucherEarned?: GameVoucher;
}

// Game availability state (for roulette)
export interface GameAvailabilityState {
  lastPlayedDate: string; // ISO date string
  tripsSinceLastPlay: number;
  voucherEarned?: GameVoucher;
}

interface VoucherContextValue {
  // All user-owned vouchers (payment + game)
  vouchers: GameVoucher[];
  
  // Add a voucher (e.g., from winning a game)
  addVoucher: (voucher: Omit<GameVoucher, "id" | "earnedAt" | "used">) => GameVoucher;
  
  // Use a voucher on a specific trip
  useVoucher: (voucherId: string, tripId: string) => boolean;
  
  // Get available vouchers for a specific wallet
  getAvailableVouchers: (walletId: string) => GameVoucher[];
  
  // Daily quiz state
  dailyQuizState: DailyQuizState;
  setDailyQuizState: React.Dispatch<React.SetStateAction<DailyQuizState>>;
  
  // Game availability state
  gameAvailabilityState: GameAvailabilityState;
  setGameAvailabilityState: React.Dispatch<React.SetStateAction<GameAvailabilityState>>;
  
  // Check if daily quiz is available today
  canPlayDailyQuiz: () => boolean;
  
  // Check if roulette is available
  canPlayRoulette: () => boolean;
  
  // Record a trip completion (increments tripsSinceLastPlay)
  recordTripCompletion: () => void;
}

const VoucherContext = createContext<VoucherContextValue | undefined>(undefined);

const STORAGE_KEY = "futabus.vouchers.v1";

interface PersistedShape {
  vouchers: GameVoucher[];
  dailyQuizState: DailyQuizState;
  gameAvailabilityState: GameAvailabilityState;
}

// Initial game vouchers from payment system (seed data)
const initialPaymentVouchers: GameVoucher[] = [
  {
    id: "pay-1",
    code: "MOMO50",
    wallet: "momo",
    saving: 50000,
    label: "Giảm 50K cho đơn từ 200K",
    min: 200000,
    tag: "Hot",
    source: "payment",
    earnedAt: new Date().toISOString(),
    used: false,
    discountType: "fixed",
  },
  {
    id: "pay-2",
    code: "MOMO15P",
    wallet: "momo",
    saving: 43500,
    label: "Giảm 15%, tối đa 50K",
    source: "payment",
    earnedAt: new Date().toISOString(),
    used: false,
    discountType: "percentage",
  },
  {
    id: "pay-3",
    code: "ZALO20",
    wallet: "zalopay",
    saving: 58000,
    label: "Giảm 20%, tối đa 60K",
    tag: "Best",
    source: "payment",
    earnedAt: new Date().toISOString(),
    used: false,
    discountType: "percentage",
  },
  {
    id: "pay-4",
    code: "ZALOFREESHIP",
    wallet: "zalopay",
    saving: 30000,
    label: "Hoàn 30K vé xe khách",
    source: "payment",
    earnedAt: new Date().toISOString(),
    used: false,
    discountType: "fixed",
  },
  {
    id: "pay-5",
    code: "SHOPEEPAY10",
    wallet: "shopeepay",
    saving: 29000,
    label: "Giảm 10% cho khách mới",
    tag: "New",
    source: "payment",
    earnedAt: new Date().toISOString(),
    used: false,
    discountType: "percentage",
  },
];

const loadFromStorage = (): PersistedShape => {
  if (typeof window === "undefined") {
    return {
      vouchers: initialPaymentVouchers,
      dailyQuizState: {
        lastPlayedDate: "",
        score: 0,
        completed: false,
      },
      gameAvailabilityState: {
        lastPlayedDate: "",
        tripsSinceLastPlay: 0,
      },
    };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        vouchers: initialPaymentVouchers,
        dailyQuizState: {
          lastPlayedDate: "",
          score: 0,
          completed: false,
        },
        gameAvailabilityState: {
          lastPlayedDate: "",
          tripsSinceLastPlay: 0,
        },
      };
    }
    const parsed = JSON.parse(raw) as PersistedShape;
    if (!Array.isArray(parsed?.vouchers) || !parsed?.dailyQuizState || !parsed?.gameAvailabilityState) {
      return {
        vouchers: initialPaymentVouchers,
        dailyQuizState: {
          lastPlayedDate: "",
          score: 0,
          completed: false,
        },
        gameAvailabilityState: {
          lastPlayedDate: "",
          tripsSinceLastPlay: 0,
        },
      };
    }
    return parsed;
  } catch {
    return {
      vouchers: initialPaymentVouchers,
      dailyQuizState: {
        lastPlayedDate: "",
        score: 0,
        completed: false,
      },
      gameAvailabilityState: {
        lastPlayedDate: "",
        tripsSinceLastPlay: 0,
      },
    };
  }
};

const newVoucherId = () => `game-voucher-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const VoucherProvider = ({ children }: { children: ReactNode }) => {
  const initial = loadFromStorage();
  const [vouchers, setVouchers] = useState<GameVoucher[]>(initial.vouchers);
  const [dailyQuizState, setDailyQuizState] = useState<DailyQuizState>(initial.dailyQuizState);
  const [gameAvailabilityState, setGameAvailabilityState] = useState<GameAvailabilityState>(initial.gameAvailabilityState);

  // Persist on every change
  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload: PersistedShape = { vouchers, dailyQuizState, gameAvailabilityState };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [vouchers, dailyQuizState, gameAvailabilityState]);

  const addVoucher = useCallback<VoucherContextValue["addVoucher"]>((voucherData: Omit<GameVoucher, "id" | "earnedAt" | "used">) => {
    const newVoucher: GameVoucher = {
      ...voucherData,
      id: newVoucherId(),
      earnedAt: new Date().toISOString(),
      used: false,
    };
    setVouchers((prev: GameVoucher[]) => [newVoucher, ...prev]);
    return newVoucher;
  }, []);

  const useVoucher = useCallback<VoucherContextValue["useVoucher"]>((voucherId: string, tripId: string) => {
    let success = false;
    setVouchers((prev: GameVoucher[]) => {
      const voucher = prev.find((v: GameVoucher) => v.id === voucherId);
      if (!voucher || voucher.used) {
        return prev;
      }
      success = true;
      return prev.map((v: GameVoucher) =>
        v.id === voucherId ? { ...v, used: true, usedOnTripId: tripId } : v
      );
    });
    return success;
  }, []);

  const getAvailableVouchers = useCallback<VoucherContextValue["getAvailableVouchers"]>((walletId: string) => {
    return vouchers.filter((v: GameVoucher) => !v.used && (v.wallet === walletId || v.wallet === "futapay"));
  }, [vouchers]);

  const canPlayDailyQuiz = useCallback<VoucherContextValue["canPlayDailyQuiz"]>(() => {
    const today = new Date().toISOString().split("T")[0];
    return dailyQuizState.lastPlayedDate !== today;
  }, [dailyQuizState]);

  const canPlayRoulette = useCallback<VoucherContextValue["canPlayRoulette"]>(() => {
    // Must have completed at least 1 trip since last play
    return gameAvailabilityState.tripsSinceLastPlay >= 1;
  }, [gameAvailabilityState]);

  const recordTripCompletion = useCallback<VoucherContextValue["recordTripCompletion"]>(() => {
    setGameAvailabilityState((prev: GameAvailabilityState) => ({
      ...prev,
      tripsSinceLastPlay: prev.tripsSinceLastPlay + 1,
    }));
  }, []);

  const value: VoucherContextValue = useMemo(
    () => ({
      vouchers,
      addVoucher,
      useVoucher,
      getAvailableVouchers,
      dailyQuizState,
      setDailyQuizState,
      gameAvailabilityState,
      setGameAvailabilityState,
      canPlayDailyQuiz,
      canPlayRoulette,
      recordTripCompletion,
    }),
    [
      vouchers,
      addVoucher,
      useVoucher,
      getAvailableVouchers,
      dailyQuizState,
      gameAvailabilityState,
      canPlayDailyQuiz,
      canPlayRoulette,
      recordTripCompletion,
    ]
  );

  return <VoucherContext.Provider value={value}>{children}</VoucherContext.Provider>;
};

export const useVouchers = () => {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error("useVouchers must be used within VoucherProvider");
  }
  return context;
};
