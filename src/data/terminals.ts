// Wayfinding data for the in-bến walking-route view (/terminal-map).
//
// Each terminal has:
//   - `entrance`: the public entrance coordinate (where the user is dropped off
//                  by the shuttle / where the user enters the bến).
//   - `busParking`: the spot where the user's specific bus is parked. Offset
//                   ~50–100m from the entrance to simulate the realistic "find
//                   your bus among many parking lanes" experience.
//   - `pillar`: a notable landmark in the textual directions ("đi qua cột số X").
//
// Coordinates were sampled from Google Maps satellite view of each bến — they
// land inside the actual terminal premises so the walking-directions polyline
// looks credible.

export interface TerminalLocation {
  name: string;
  entrance: { lat: number; lng: number };
  busParking: { lat: number; lng: number };
  pillarLandmark: string;
  // Apartment/lot tag we show in the on-screen direction so the user can match
  // it against the painted-on-tarmac labels at the actual bến.
  parkingSpot: string;
}

export const terminals: Record<string, TerminalLocation> = {
  "Bến xe Miền Tây": {
    name: "Bến xe Miền Tây",
    entrance: { lat: 10.74712, lng: 106.63092 },
    busParking: { lat: 10.74628, lng: 106.63171 },
    pillarLandmark: "cột số 3",
    parkingSpot: "B12",
  },
  "Bến xe An Sương": {
    name: "Bến xe An Sương",
    entrance: { lat: 10.84966, lng: 106.62128 },
    busParking: { lat: 10.85042, lng: 106.62193 },
    pillarLandmark: "cột số 7",
    parkingSpot: "A04",
  },
  "Bến xe Miền Đông Mới": {
    name: "Bến xe Miền Đông Mới",
    entrance: { lat: 10.83384, lng: 106.80324 },
    busParking: { lat: 10.83302, lng: 106.80411 },
    pillarLandmark: "cột số 12",
    parkingSpot: "C09",
  },
  "Bến xe Liên tỉnh Đà Lạt": {
    name: "Bến xe Liên tỉnh Đà Lạt",
    entrance: { lat: 11.93419, lng: 108.43996 },
    busParking: { lat: 11.93478, lng: 108.44064 },
    pillarLandmark: "cột số 2",
    parkingSpot: "DL03",
  },
};

// Default fallback used when the booking's pickupTerminal isn't in our table.
export const defaultTerminal = terminals["Bến xe Miền Tây"];

export const getTerminalByName = (name: string): TerminalLocation =>
  terminals[name] ?? defaultTerminal;
