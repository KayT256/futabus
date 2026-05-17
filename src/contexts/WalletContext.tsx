// FUTAPay wallet state — balance, transaction history, and linked top-up sources.
// Persists to localStorage so the balance behaves like a real wallet across reloads.
// Kept separate from JourneyContext because wallet state is per-user, not per-journey:
// the user's funds and transaction history outlast any single trip.

import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from "react";
import { FUTAPAY_INITIAL_BALANCE } from "@/data/wallets";

export type TransactionType = "topup" | "payment" | "refund";

export interface Transaction {
  id: string;
  type: TransactionType;
  // Positive number; the type encodes whether it's added (topup/refund) or subtracted (payment).
  amount: number;
  // Short human-readable description — shown in the transaction list.
  description: string;
  // ISO timestamp.
  timestamp: string;
  // For payments: optional link back to the trip + how much voucher saved on this txn.
  // We track voucherSaved so the FUTAPay page can show total savings across the user's history.
  tripId?: string;
  voucherSaved?: number;
  // For topups: which linked source funded the topup.
  sourceId?: string;
}

export interface LinkedSource {
  id: string;
  // Drives icon and tone in the UI.
  type: "bank" | "card" | "ewallet";
  label: string;
  // Last 4 digits or short masked id.
  masked: string;
  // Path to brand logo asset under /public.
  logo: string;
}

interface WalletContextValue {
  balance: number;
  transactions: Transaction[];
  linkedSources: LinkedSource[];

  // Tries to spend `amount` from the FUTAPay balance.
  // Returns true on success (balance was deducted, transaction recorded),
  // or false if the balance is insufficient — the caller can then prompt a top-up.
  pay: (args: { amount: number; description: string; tripId?: string; voucherSaved?: number }) => boolean;

  topUp: (args: { amount: number; sourceId: string }) => void;

  // Aggregate stats surfaced on the FUTAPay page hero.
  totalSpentOnFuta: number;
  totalSavedFromVouchers: number;
  totalToppedUp: number;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

const STORAGE_KEY = "futabus.wallet.v1";

// Mock linked sources — these would come from a real "linked accounts" API.
// I'm picking a bank, an international card, and an e-wallet so the top-up modal
// has variety without overwhelming the user.
const initialLinkedSources: LinkedSource[] = [
  {
    id: "vcb",
    type: "bank",
    label: "Vietcombank",
    masked: "**** 4407",
    logo: "/futapay-logo.png", // placeholder — Vietcombank logo not in /public yet, fall back to FUTA mark
  },
  {
    id: "visa-card",
    type: "card",
    label: "Visa Debit",
    masked: "**** 8821",
    logo: "/visa-mastercard-logo.webp",
  },
  {
    id: "momo",
    type: "ewallet",
    label: "MoMo",
    masked: "**** 8821",
    logo: "/momo-logo.png",
  },
];

// Seed transactions so the FUTAPay page tells a believable story on first visit.
// Dates are computed at module load so they're always recent relative to "now".
const now = Date.now();
const daysAgo = (n: number) => new Date(now - n * 24 * 60 * 60 * 1000).toISOString();

const initialTransactions: Transaction[] = [
  {
    id: "tx-seed-1",
    type: "topup",
    amount: 500_000,
    description: "Nạp từ Vietcombank",
    timestamp: daysAgo(7),
    sourceId: "vcb",
  },
  {
    id: "tx-seed-2",
    type: "payment",
    amount: 280_000,
    description: "Vé xe TP. HCM → Cần Thơ",
    timestamp: daysAgo(5),
    tripId: "TRIP004",
    voucherSaved: 20_000,
  },
  {
    id: "tx-seed-3",
    type: "topup",
    amount: 1_000_000,
    description: "Nạp từ Visa Debit",
    timestamp: daysAgo(3),
    sourceId: "visa-card",
  },
  {
    id: "tx-seed-4",
    type: "payment",
    amount: 75_000,
    description: "Smart Stop · Trạm dừng Madagui",
    timestamp: daysAgo(3),
    tripId: "TRIP004",
  },
  {
    id: "tx-seed-5",
    type: "refund",
    amount: 50_000,
    description: "Hoàn tiền — đổi giờ chuyến đi",
    timestamp: daysAgo(2),
  },
  {
    id: "tx-seed-6",
    type: "payment",
    amount: 220_000,
    description: "Vé xe TP. HCM → Vũng Tàu",
    timestamp: daysAgo(1),
    tripId: "TRIP002",
    voucherSaved: 35_000,
  },
];

interface PersistedShape {
  balance: number;
  transactions: Transaction[];
  // linkedSources are static for now — kept out of localStorage so updates to the
  // mock list propagate to existing users on next load.
}

const loadFromStorage = (): { balance: number; transactions: Transaction[] } => {
  if (typeof window === "undefined") {
    return { balance: FUTAPAY_INITIAL_BALANCE, transactions: initialTransactions };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { balance: FUTAPAY_INITIAL_BALANCE, transactions: initialTransactions };
    const parsed = JSON.parse(raw) as PersistedShape;
    if (typeof parsed?.balance !== "number" || !Array.isArray(parsed.transactions)) {
      return { balance: FUTAPAY_INITIAL_BALANCE, transactions: initialTransactions };
    }
    return { balance: parsed.balance, transactions: parsed.transactions };
  } catch {
    return { balance: FUTAPAY_INITIAL_BALANCE, transactions: initialTransactions };
  }
};

// Generate a short ID for a new transaction. Mock-grade — no need for crypto-strong
// uniqueness, just collision-resistant within a single user's history.
const newTxId = () =>
  `tx-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const initial = loadFromStorage();
  const [balance, setBalance] = useState<number>(initial.balance);
  const [transactions, setTransactions] = useState<Transaction[]>(initial.transactions);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload: PersistedShape = { balance, transactions };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [balance, transactions]);

  const pay = useCallback<WalletContextValue["pay"]>(
    ({ amount, description, tripId, voucherSaved }) => {
      if (amount <= 0) return true; // no-op, never fail

      let success = false;
      setBalance((prev) => {
        if (prev < amount) {
          success = false;
          return prev;
        }
        success = true;
        return prev - amount;
      });

      if (success) {
        setTransactions((prev) => [
          {
            id: newTxId(),
            type: "payment",
            amount,
            description,
            timestamp: new Date().toISOString(),
            tripId,
            voucherSaved,
          },
          ...prev,
        ]);
      }
      return success;
    },
    [],
  );

  const topUp = useCallback<WalletContextValue["topUp"]>(({ amount, sourceId }) => {
    if (amount <= 0) return;
    const source = initialLinkedSources.find((s) => s.id === sourceId);
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [
      {
        id: newTxId(),
        type: "topup",
        amount,
        description: `Nạp từ ${source?.label ?? "nguồn liên kết"}`,
        timestamp: new Date().toISOString(),
        sourceId,
      },
      ...prev,
    ]);
  }, []);

  // Aggregate stats — derived once per transactions change.
  const totalSpentOnFuta = useMemo(
    () => transactions.filter((t) => t.type === "payment").reduce((s, t) => s + t.amount, 0),
    [transactions],
  );
  const totalSavedFromVouchers = useMemo(
    () => transactions.reduce((s, t) => s + (t.voucherSaved ?? 0), 0),
    [transactions],
  );
  const totalToppedUp = useMemo(
    () => transactions.filter((t) => t.type === "topup").reduce((s, t) => s + t.amount, 0),
    [transactions],
  );

  const value = useMemo<WalletContextValue>(
    () => ({
      balance,
      transactions,
      linkedSources: initialLinkedSources,
      pay,
      topUp,
      totalSpentOnFuta,
      totalSavedFromVouchers,
      totalToppedUp,
    }),
    [balance, transactions, pay, topUp, totalSpentOnFuta, totalSavedFromVouchers, totalToppedUp],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return ctx;
};
