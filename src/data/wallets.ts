// Payment methods supported by FUTA Smart Pay.
// Each wallet may have its own set of vouchers (see ./vouchers.ts).
// I'm modeling realistic Vietnamese e-wallet flows here so the demo feels grounded.

export type WalletId = "futapay" | "momo" | "zalopay" | "shopeepay" | "vnpay" | "card";

export interface Wallet {
  id: WalletId;
  label: string;
  // Short emoji/icon shown on the payment chip — keeps things readable on mobile.
  icon: string;
  // Subtitle hints whether the wallet is linked, balance, masked card number, etc.
  sub: string;
  linked: boolean;
  // Only FUTAPay exposes a real balance in this demo (FUTA's own closed-loop wallet).
  balance?: number;
}

export const wallets: Wallet[] = [
  {
    id: "futapay",
    label: "FUTAPay",
    icon: "🟢",
    sub: "Ví FUTA · Số dư 1.250.000đ",
    linked: true,
    balance: 1250000,
  },
  {
    id: "momo",
    label: "MoMo",
    icon: "💗",
    sub: "Đã liên kết · ****8821",
    linked: true,
  },
  {
    id: "zalopay",
    label: "ZaloPay",
    icon: "💙",
    sub: "Đã liên kết · ****4407",
    linked: true,
  },
  {
    id: "shopeepay",
    label: "ShopeePay",
    icon: "🧡",
    sub: "Chưa liên kết — nhấn để liên kết",
    linked: false,
  },
  {
    id: "vnpay",
    label: "VNPay QR",
    icon: "🟦",
    sub: "Quét QR từ app ngân hàng",
    linked: true,
  },
  {
    id: "card",
    label: "Thẻ Visa/Master",
    icon: "💳",
    sub: "Cần nhập thông tin thẻ",
    linked: true,
  },
];

export const getWalletLabel = (id: WalletId): string =>
  wallets.find((w) => w.id === id)?.label ?? id;

export const getWallet = (id: WalletId): Wallet | undefined =>
  wallets.find((w) => w.id === id);
