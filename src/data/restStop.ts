// Rest stop info used by Smart Stop and the Journey route visualization.
// Madagui (Đạ Huoai, Lâm Đồng) is the standard 20-minute break on the TPHCM ↔ Đà Lạt run.

export interface RestStop {
  id: string;
  name: string;
  description: string;
  // Approximate progress along the route (0 → 1) where this rest stop sits.
  // ~165km / 304km ≈ 0.54 — just past the midpoint, used to position the marker on the route bar.
  progressPosition: number;
  durationMinutes: number;
  // Coordinates for the Google Maps embed.
  lat: number;
  lng: number;
}

export const madaguiRestStop: RestStop = {
  id: "madagui",
  name: "Trạm dừng Madagui",
  description: "Trạm dừng tiêu chuẩn trên QL20 — phòng vệ sinh, ăn nhẹ, đặc sản Lâm Đồng.",
  progressPosition: 0.55,
  durationMinutes: 20,
  lat: 11.4347,
  lng: 107.6586,
};
