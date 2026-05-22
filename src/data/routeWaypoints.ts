// Route waypoints for TPHCM → Đà Lạt trip with Madagui rest stop
// Used by TripProgress map simulation

import type { LatLng } from "@/lib/mapsHelpers";

export interface RouteWaypoint {
  name: string;
  location: LatLng;
  description: string;
}

// Key waypoints along the route
export const ROUTE_WAYPOINTS: RouteWaypoint[] = [
  {
    name: "Bến xe Miền Tây",
    location: { lat: 10.7596, lng: 106.6627 },
    description: "Điểm xuất phát - TP.HCM",
  },
  {
    name: "Trạm dừng Madagui",
    location: { lat: 11.8333, lng: 108.4167 },
    description: "Trạm dừng chân - ~165km",
  },
  {
    name: "Bến xe Đà Lạt",
    location: { lat: 11.9412, lng: 108.4333 },
    description: "Điểm đến - Đà Lạt",
  },
];

// Rest stop is approximately at 55% of the total route
export const REST_STOP_PROGRESS = 0.55;

// Arrival threshold in meters (same as FUTA Rada)
export const ARRIVAL_THRESHOLD_M = 35;

// Total animation duration for demo (compressed from real 8 hours)
export const ANIMATION_DURATION_MS = 90_000; // 90 seconds total
