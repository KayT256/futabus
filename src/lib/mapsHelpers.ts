// Shared geometry + animation helpers used by both /futa-rada (driving) and
// /terminal-map (walking).
//
// Both screens animate a marker along a polyline returned by Google's
// DirectionsService. We pre-compute the cumulative arc-length once, then
// use a single binary search per frame to locate the segment for a given
// progress in [0, 1] and lerp within it. This produces motion at a
// constant ground speed regardless of how unevenly Google packs vertices
// along the path.

export interface LatLng {
  lat: number;
  lng: number;
}

const EARTH_RADIUS_M = 6_371_000;
const toRad = (deg: number) => (deg * Math.PI) / 180;

// Great-circle distance in meters. Plenty accurate at urban scales.
export const haversineMeters = (a: LatLng, b: LatLng): number => {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sa =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(sa));
};

// Linear interpolation between two LatLngs. Fine for sub-kilometer hops where
// the great-circle correction is negligible.
const lerpLatLng = (a: LatLng, b: LatLng, t: number): LatLng => ({
  lat: a.lat + (b.lat - a.lat) * t,
  lng: a.lng + (b.lng - a.lng) * t,
});

export interface PathProfile {
  // Sampled points along the path (already in our LatLng shape).
  points: LatLng[];
  // cumulativeMeters[i] = distance from points[0] to points[i] along the path.
  cumulativeMeters: number[];
  totalMeters: number;
}

// Convert google.maps.LatLng[] (e.g. from route.overview_path) into our
// plain LatLng[]. Defensive against undefined input — callers may invoke this
// before directions resolve.
export const googlePathToLatLng = (path?: google.maps.LatLng[] | null): LatLng[] => {
  if (!path || path.length === 0) return [];
  return path.map((p) => ({ lat: p.lat(), lng: p.lng() }));
};

// Display helper — meters under 1km show as integer "120m"; over as "1.4km".
export const formatMeters = (m: number): string => {
  if (!Number.isFinite(m)) return "—";
  return m < 1000 ? `${Math.round(m)}m` : `${(m / 1000).toFixed(1)}km`;
};

// Display helper — seconds rendered as "Đã đến" if zero, "30s" under a minute,
// otherwise "5 phút". Vietnamese-localized so callers don't have to.
export const formatDuration = (s: number): string => {
  if (!Number.isFinite(s) || s <= 0) return "Đã đến";
  if (s < 60) return `${Math.round(s)}s`;
  return `${Math.round(s / 60)} phút`;
};

// Pre-compute cumulative distances so animation queries are O(log n) per frame.
export const buildPathProfile = (points: LatLng[]): PathProfile => {
  if (points.length === 0) {
    return { points: [], cumulativeMeters: [], totalMeters: 0 };
  }
  const cumulativeMeters: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    cumulativeMeters.push(cumulativeMeters[i - 1] + haversineMeters(points[i - 1], points[i]));
  }
  return {
    points,
    cumulativeMeters,
    totalMeters: cumulativeMeters[cumulativeMeters.length - 1],
  };
};

// Return the LatLng at `progress` (0..1) of the cumulative arc-length.
// At progress=0 returns points[0], at progress=1 returns the final point.
// Empty paths fall through to a safe { lat:0, lng:0 } — callers should guard.
export const interpolateAlongPath = (profile: PathProfile, progress: number): LatLng => {
  const { points, cumulativeMeters, totalMeters } = profile;
  if (points.length === 0) return { lat: 0, lng: 0 };
  if (points.length === 1) return points[0];
  const clamped = Math.min(1, Math.max(0, progress));
  const target = clamped * totalMeters;

  // Binary search for the first index where cumulativeMeters[i] >= target.
  // Off-by-one safety: cumulativeMeters[0] is always 0, so this loop terminates.
  let lo = 1;
  let hi = cumulativeMeters.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cumulativeMeters[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  const i = lo;
  const segmentStart = cumulativeMeters[i - 1];
  const segmentLength = cumulativeMeters[i] - segmentStart;
  // Degenerate: two duplicate points in the polyline → just return the start.
  if (segmentLength <= 0) return points[i - 1];
  const t = (target - segmentStart) / segmentLength;
  return lerpLatLng(points[i - 1], points[i], t);
};
