import type { LatLng } from "@/lib/mapsHelpers";

// Wayfinding data for the in-bến walking-route view (/terminal-map).
//
// Why hand-crafted waypoints instead of Google's Walking Directions API?
//   The Walking API treats a bến xe as a closed property and routes around it
//   on public streets — that produced the absurd "walk 250m around 4 blocks
//   to get from the entrance to a bus 80m away" route in the first iteration.
//   Sampling waypoints from satellite imagery of each bến's painted parking
//   lanes gives a realistic in-property path that actually looks like the way
//   you walk to your bus, and lets the animated marker visibly traverse the
//   parking apron at high zoom.
//
// `walkingPath` = polyline points from the front gate to the bus parking spot.
//   First point is the entrance (the camera's natural starting framing); last
//   point is the bus. Intermediate points hug the painted lanes between bus
//   rows so the on-map polyline overlays nicely on the satellite tiles at
//   zoom 19+.
// `walkingSteps` = the textual turn-by-turn list rendered below the map. Kept
//   in sync (visually) with `walkingPath` so steps and dots align.

export interface TerminalLocation {
  name: string;
  // Display address. Shown in the wayfinding header so the user can verify
  // they're standing at the right bến.
  address: string;
  // First entry is the entrance, last is the bus parking spot. Min 2 entries.
  walkingPath: LatLng[];
  walkingSteps: { instruction: string; distance: string }[];
  parkingSpot: string;
  pillarLandmark: string;
}

// Bến xe Miền Tây (395 Đ. Kinh Dương Vương, An Lạc, Bình Tân).
// Layout: SE entrance from Kinh Dương Vương, parking apron stretches NW with
// rows oriented E-W. Path: gate → main concourse → angle into row B → bus B12.
const MIEN_TAY: TerminalLocation = {
  name: "Bến xe Miền Tây",
  address: "395 Đ. Kinh Dương Vương, An Lạc, Bình Tân, Hồ Chí Minh, Vietnam",
  walkingPath: [
    { lat: 10.74072, lng: 106.62035 }, // entrance gate from Kinh Dương Vương
    { lat: 10.74088, lng: 106.62054 }, // ticket kiosk row
    { lat: 10.74108, lng: 106.62075 }, // angle north into parking apron
    { lat: 10.74125, lng: 106.62094 }, // mid-row B walkway
    { lat: 10.74140, lng: 106.62112 }, // bus B12 parking spot
  ],
  walkingSteps: [
    { instruction: "Vào sảnh chính từ cổng Kinh Dương Vương", distance: "26m" },
    { instruction: "Qua quầy điều phối, rẽ vào sân đỗ phía Bắc", distance: "32m" },
    { instruction: "Đi dọc làn B — xe của bạn ở vị trí B12 bên phải", distance: "38m" },
  ],
  parkingSpot: "B12",
  pillarLandmark: "cột số 3",
};

// Bến xe An Sương (QL1A, Bà Điểm, Hóc Môn). Path: SE entrance → apron → bus A04.
const AN_SUONG: TerminalLocation = {
  name: "Bến xe An Sương",
  address: "QL1A, An Sương, Bà Điểm, Hóc Môn, Hồ Chí Minh, Vietnam",
  walkingPath: [
    { lat: 10.84966, lng: 106.62128 }, // entrance from QL1A
    { lat: 10.84995, lng: 106.62150 },
    { lat: 10.85020, lng: 106.62173 },
    { lat: 10.85042, lng: 106.62193 }, // bus A04
  ],
  walkingSteps: [
    { instruction: "Vào cổng chính từ QL1A, đi qua quầy vé", distance: "32m" },
    { instruction: "Rẽ phải vào sân đỗ — hướng làn A", distance: "30m" },
    { instruction: "Xe của bạn đỗ ở vị trí A04 — bên trái", distance: "28m" },
  ],
  parkingSpot: "A04",
  pillarLandmark: "cột số 7",
};

// Bến xe Miền Đông Mới (501 Hoàng Hữu Nam, Long Bình, Thủ Đức). Brand-new
// 2022 facility, large rectangular layout. Path samples the SW entrance →
// covered concourse → row C → bus C09.
const MIEN_DONG_MOI: TerminalLocation = {
  name: "Bến xe Miền Đông Mới",
  address: "501 Hoàng Hữu Nam, Long Bình, TP. Thủ Đức, Hồ Chí Minh, Vietnam",
  walkingPath: [
    { lat: 10.83384, lng: 106.80324 },
    { lat: 10.83360, lng: 106.80350 },
    { lat: 10.83330, lng: 106.80388 },
    { lat: 10.83302, lng: 106.80411 },
  ],
  walkingSteps: [
    { instruction: "Vào sảnh chờ, ra cửa số 3 phía sân đỗ", distance: "24m" },
    { instruction: "Đi thẳng dọc làn C — hướng nam", distance: "36m" },
    { instruction: "Xe của bạn đỗ ở vị trí C09 — bên phải", distance: "30m" },
  ],
  parkingSpot: "C09",
  pillarLandmark: "cột số 12",
};

// Bến xe Liên tỉnh Đà Lạt — destination terminal for our HCM ↔ Đà Lạt route.
const DA_LAT: TerminalLocation = {
  name: "Bến xe Liên tỉnh Đà Lạt",
  address: "1 Tô Hiến Thành, Phường 3, Đà Lạt, Lâm Đồng, Vietnam",
  walkingPath: [
    { lat: 11.93419, lng: 108.43996 },
    { lat: 11.93445, lng: 108.44020 },
    { lat: 11.93478, lng: 108.44064 },
  ],
  walkingSteps: [
    { instruction: "Xuống xe, đi vào sảnh đến", distance: "15m" },
    { instruction: "Ra cửa hông phía Đông để gặp xe trung chuyển", distance: "28m" },
  ],
  parkingSpot: "DL03",
  pillarLandmark: "cột số 2",
};

export const terminals: Record<string, TerminalLocation> = {
  "Bến xe Miền Tây": MIEN_TAY,
  "Bến xe An Sương": AN_SUONG,
  "Bến xe Miền Đông Mới": MIEN_DONG_MOI,
  "Bến xe Liên tỉnh Đà Lạt": DA_LAT,
};

export const defaultTerminal = MIEN_TAY;

export const getTerminalByName = (name: string): TerminalLocation =>
  terminals[name] ?? defaultTerminal;
