// Payment methods supported by FUTA Smart Pay.
// Each wallet may have its own set of vouchers (see ./vouchers.ts).
// I'm modeling realistic Vietnamese e-wallet flows here so the demo feels grounded.

export type WalletId = "futapay" | "momo" | "zalopay" | "shopeepay" | "vnpay" | "card";

export interface Wallet {
  id: WalletId;
  label: string;
  // Path to the brand logo (in /public). Rendered as <img>.
  logo: string;
  // Subtitle hints whether the wallet is linked, balance, masked card number, etc.
  // For FUTAPay the live balance is sourced from WalletContext, not this string.
  sub: string;
  linked: boolean;
  // Initial demo balance for FUTAPay — WalletContext seeds from this on first load.
  balance?: number;
}

// Initial seed balance for FUTAPay in this demo. Lives here so the WalletContext
// and the wallet data stay in sync if we change the starting amount later.
export const FUTAPAY_INITIAL_BALANCE = 1_250_000;

export const wallets: Wallet[] = [
  {
    id: "futapay",
    label: "FUTAPay",
    logo: "/futapay-logo.png",
    sub: "Ví FUTA · Thanh toán không tiền mặt",
    linked: true,
    balance: FUTAPAY_INITIAL_BALANCE,
  },
  {
    id: "momo",
    label: "MoMo",
    logo: "/momo-logo.png",
    sub: "Đã liên kết · ****8821",
    linked: true,
  },
  {
    id: "zalopay",
    label: "ZaloPay",
    logo: "/zalopay-logo.jpeg",
    sub: "Đã liên kết · ****4407",
    linked: true,
  },
  {
    id: "shopeepay",
    label: "ShopeePay",
    logo: "/shopee-pay-logo.png",
    sub: "Chưa liên kết — nhấn để liên kết",
    linked: false,
  },
  {
    id: "vnpay",
    label: "VNPay QR",
    logo: "/vnpay-logo.png",
    sub: "Quét QR từ app ngân hàng",
    linked: true,
  },
  {
    id: "card",
    label: "Thẻ Visa/Master",
    logo: "/visa-mastercard-logo.webp",
    sub: "Cần nhập thông tin thẻ",
    linked: true,
  },
];

export const getWalletLabel = (id: WalletId): string =>
  wallets.find((w) => w.id === id)?.label ?? id;

export const getWallet = (id: WalletId): Wallet | undefined =>
  wallets.find((w) => w.id === id);
