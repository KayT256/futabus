// Smart Stop menu — the food/drinks the user can pre-order before the rest stop arrives.
// Pickup happens at the Madagui rest area on the TPHCM ↔ Đà Lạt route.
// Categories are deliberately limited to 3 so the mobile UI stays clean.

export type FoodCategory = "Món chính" | "Đồ uống" | "Ăn vặt";

export interface FoodItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  // Emoji chosen instead of imagery — works offline and keeps bundle small for a demo.
  emoji: string;
  category: FoodCategory;
}

export const foodMenu: FoodItem[] = [
  // ── Món chính (mains) ────────────────────────────────────────────────
  { id: "f1", name: "Cơm tấm sườn", desc: "Cơm tấm sườn nướng kèm trứng ốp la, chả trứng", price: 65000, emoji: "🍱", category: "Món chính" },
  { id: "f2", name: "Phở bò tái", desc: "Phở bò nóng hổi, thịt bò tươi", price: 55000, emoji: "🍜", category: "Món chính" },
  { id: "f3", name: "Bánh mì thịt nướng", desc: "Bánh mì giòn kẹp thịt nướng thơm", price: 35000, emoji: "🥖", category: "Món chính" },
  { id: "f4", name: "Mì xào hải sản", desc: "Mì xào giòn cùng tôm mực", price: 70000, emoji: "🍝", category: "Món chính" },
  // ── Đồ uống (drinks) ────────────────────────────────────────────────
  { id: "f5", name: "Cà phê sữa đá", desc: "Cà phê phin truyền thống", price: 25000, emoji: "☕", category: "Đồ uống" },
  { id: "f6", name: "Trà đào cam sả", desc: "Trà đào mát lạnh", price: 30000, emoji: "🍹", category: "Đồ uống" },
  { id: "f7", name: "Nước suối Lavie", desc: "Chai 500ml", price: 10000, emoji: "💧", category: "Đồ uống" },
  { id: "f8", name: "Sữa đậu nành", desc: "Sữa đậu nành tươi", price: 15000, emoji: "🥛", category: "Đồ uống" },
  // ── Ăn vặt (snacks) ─────────────────────────────────────────────────
  { id: "f9", name: "Bánh bao nhân thịt", desc: "Bánh bao nóng nhân thịt trứng cút", price: 20000, emoji: "🥟", category: "Ăn vặt" },
  { id: "f10", name: "Hạt điều rang muối", desc: "Gói 100g", price: 40000, emoji: "🥜", category: "Ăn vặt" },
  { id: "f11", name: "Kẹo cao su", desc: "Doublemint bạc hà", price: 12000, emoji: "🍬", category: "Ăn vặt" },
  { id: "f12", name: "Khoai tây chiên", desc: "Khoai tây chiên giòn", price: 35000, emoji: "🍟", category: "Ăn vặt" },
];

export const foodCategories: FoodCategory[] = ["Món chính", "Đồ uống", "Ăn vặt"];

export const getFoodById = (id: string): FoodItem | undefined =>
  foodMenu.find((f) => f.id === id);
