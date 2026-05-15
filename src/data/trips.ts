export interface Trip {
  id: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  price: number;
  availableSeats: number;
  driver: {
    id: string;
    name: string;
    photo: string;
    crewScore: number;
    totalTrips: number;
    totalRatings: number;
    employeeCode: string;
    status: "excellent" | "good" | "average";
    scoreTrend: number[];
  };
  pickupLocation: string;
  pickupStation: string;
  dropoffLocation: string;
  dropoffStation: string;
  pickupTime: string;
  busType: string;
  duration: string;
  distance: string;
  timezone: string;
}

export const trips: Trip[] = [
  {
    id: "TRIP001",
    route: "TP. Hồ Chí Minh - Đà Lạt",
    departureTime: "23:30",
    arrivalTime: "08:05",
    date: "15/05/2026",
    price: 290000,
    availableSeats: 12,
    driver: {
      id: "TX001",
      name: "Nguyễn Văn Minh",
      photo: "https://i.pravatar.cc/150?img=68",
      crewScore: 4.9,
      totalTrips: 2847,
      totalRatings: 2156,
      employeeCode: "FUTA-TX-00123",
      status: "excellent",
      scoreTrend: [4.7, 4.75, 4.8, 4.82, 4.85, 4.88, 4.9],
    },
    pickupLocation: "TP. Hồ Chí Minh",
    pickupStation: "Miền Tây",
    dropoffLocation: "Đà Lạt",
    dropoffStation: "Liên tỉnh Đà Lạt",
    pickupTime: "23:00",
    busType: "Limousine",
    duration: "08:35 h",
    distance: "320Km",
    timezone: "Asian/Ho Chi Minh",
  },
  {
    id: "TRIP002",
    route: "TP. Hồ Chí Minh - Đà Lạt",
    departureTime: "23:32",
    arrivalTime: "08:12",
    date: "15/05/2026",
    price: 290000,
    availableSeats: 13,
    driver: {
      id: "TX002",
      name: "Trần Thị Lan",
      photo: "https://i.pravatar.cc/150?img=47",
      crewScore: 4.8,
      totalTrips: 2156,
      totalRatings: 1834,
      employeeCode: "FUTA-TX-00234",
      status: "excellent",
      scoreTrend: [4.6, 4.65, 4.7, 4.72, 4.75, 4.78, 4.8],
    },
    pickupLocation: "TP. Hồ Chí Minh",
    pickupStation: "An Sương",
    dropoffLocation: "Đà Lạt",
    dropoffStation: "Liên tỉnh Đà Lạt",
    pickupTime: "23:00",
    busType: "Limousine",
    duration: "08:40 h",
    distance: "304Km",
    timezone: "Asian/Ho Chi Minh",
  },
  {
    id: "TRIP003",
    route: "TP. Hồ Chí Minh - Đà Lạt",
    departureTime: "00:00",
    arrivalTime: "08:35",
    date: "15/05/2026",
    price: 290000,
    availableSeats: 4,
    driver: {
      id: "TX003",
      name: "Lê Văn Hùng",
      photo: "https://i.pravatar.cc/150?img=52",
      crewScore: 4.7,
      totalTrips: 1923,
      totalRatings: 1567,
      employeeCode: "FUTA-TX-00345",
      status: "good",
      scoreTrend: [4.5, 4.55, 4.6, 4.62, 4.65, 4.68, 4.7],
    },
    pickupLocation: "TP. Hồ Chí Minh",
    pickupStation: "An Sương",
    dropoffLocation: "Đà Lạt",
    dropoffStation: "Liên tỉnh Đà Lạt",
    pickupTime: "23:30",
    busType: "Limousine",
    duration: "08:35 h",
    distance: "304Km",
    timezone: "Asian/Ho Chi Minh",
  },
  {
    id: "TRIP004",
    route: "TP. Hồ Chí Minh - Đà Lạt",
    departureTime: "00:15",
    arrivalTime: "08:42",
    date: "15/05/2026",
    price: 290000,
    availableSeats: 15,
    driver: {
      id: "TX004",
      name: "Phạm Thị Mai",
      photo: "https://i.pravatar.cc/150?img=44",
      crewScore: 4.6,
      totalTrips: 1734,
      totalRatings: 1423,
      employeeCode: "FUTA-TX-00456",
      status: "good",
      scoreTrend: [4.4, 4.45, 4.5, 4.52, 4.55, 4.58, 4.6],
    },
    pickupLocation: "TP. Hồ Chí Minh",
    pickupStation: "An Sương",
    dropoffLocation: "Đà Lạt",
    dropoffStation: "Liên tỉnh Đà Lạt",
    pickupTime: "23:45",
    busType: "Limousine",
    duration: "08:27 h",
    distance: "304Km",
    timezone: "Asian/Ho Chi Minh",
  },
  {
    id: "TRIP005",
    route: "TP. Hồ Chí Minh - Đà Lạt",
    departureTime: "00:30",
    arrivalTime: "08:50",
    date: "15/05/2026",
    price: 290000,
    availableSeats: 20,
    driver: {
      id: "TX005",
      name: "Hoàng Văn Nam",
      photo: "https://i.pravatar.cc/150?img=59",
      crewScore: 4.5,
      totalTrips: 1567,
      totalRatings: 1234,
      employeeCode: "FUTA-TX-00567",
      status: "average",
      scoreTrend: [4.3, 4.35, 4.4, 4.42, 4.45, 4.48, 4.5],
    },
    pickupLocation: "TP. Hồ Chí Minh",
    pickupStation: "An Sương",
    dropoffLocation: "Đà Lạt",
    dropoffStation: "Liên tỉnh Đà Lạt",
    pickupTime: "00:00",
    busType: "Limousine",
    duration: "08:20 h",
    distance: "304Km",
    timezone: "Asian/Ho Chi Minh",
  },
  {
    id: "TRIP006",
    route: "TP. Hồ Chí Minh - Đà Lạt",
    departureTime: "00:45",
    arrivalTime: "09:00",
    date: "15/05/2026",
    price: 290000,
    availableSeats: 18,
    driver: {
      id: "TX006",
      name: "Đỗ Thị Hương",
      photo: "https://i.pravatar.cc/150?img=32",
      crewScore: 4.4,
      totalTrips: 1345,
      totalRatings: 1089,
      employeeCode: "FUTA-TX-00678",
      status: "average",
      scoreTrend: [4.2, 4.25, 4.3, 4.32, 4.35, 4.38, 4.4],
    },
    pickupLocation: "TP. Hồ Chí Minh",
    pickupStation: "An Sương",
    dropoffLocation: "Đà Lạt",
    dropoffStation: "Liên tỉnh Đà Lạt",
    pickupTime: "00:15",
    busType: "Limousine",
    duration: "08:15 h",
    distance: "304Km",
    timezone: "Asian/Ho Chi Minh",
  },
];
