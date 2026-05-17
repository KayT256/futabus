// Smart Pay's voucher catalog.
// Each voucher is tied to a specific wallet — that's the *point* of Smart Pay:
// the user shouldn't have to hop between MoMo/ZaloPay/ShopeePay apps to find the best deal,
// our payment screen recommends the highest-saving voucher for the currently-selected wallet.

import type { WalletId } from "./wallets";

export interface Voucher {
  code: string;
  wallet: WalletId;
  // Saving in VND that this voucher provides on a 290k bus ticket.
  // Pre-computed because realistic % math (e.g. "20% off, capped at 60K") is fiddly in the UI.
  saving: number;
  label: string;
  // Minimum order value (VND) — voucher only applies above this threshold.
  min?: number;
  // Optional badge ("Hot", "Best", "VIP") shown on voucher chips.
  tag?: "Hot" | "Best" | "VIP" | "New";
}

export const vouchers: Voucher[] = [
  { code: "MOMO50", wallet: "momo", saving: 50000, label: "Giảm 50K cho đơn từ 200K", min: 200000, tag: "Hot" },
  { code: "MOMO15P", wallet: "momo", saving: 43500, label: "Giảm 15%, tối đa 50K" },
  { code: "ZALO20", wallet: "zalopay", saving: 58000, label: "Giảm 20%, tối đa 60K", tag: "Best" },
  { code: "ZALOFREESHIP", wallet: "zalopay", saving: 30000, label: "Hoàn 30K vé xe khách" },
  { code: "SHOPEEPAY10", wallet: "shopeepay", saving: 29000, label: "Giảm 10% cho khách mới", tag: "New" },
  { code: "FUTAGOLD", wallet: "futapay", saving: 72500, label: "Giảm 25% chuyến đêm — FUTA Gold", tag: "VIP" },
  { code: "FUTAFAN", wallet: "futapay", saving: 35000, label: "Ưu đãi FUTA Member" },
  { code: "VNPAY25K", wallet: "vnpay", saving: 25000, label: "Giảm 25K thanh toán VNPay QR" },
  { code: "VISA10", wallet: "card", saving: 29000, label: "Giảm 10% thẻ Visa quốc tế" },
];

export const findVoucherByCode = (code: string): Voucher | undefined =>
  vouchers.find((v) => v.code === code.toUpperCase());

// The "best" voucher for a wallet given a subtotal — used by the auto-recommendation panel.
export const findBestVoucher = (wallet: WalletId, subtotal: number): Voucher | null => {
  return (
    vouchers
      .filter((v) => v.wallet === wallet && (!v.min || subtotal >= v.min))
      .sort((a, b) => b.saving - a.saving)[0] ?? null
  );
};
