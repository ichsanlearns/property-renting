export interface Summary {
  totalRevenue: number;
  totalBookings: number;
  activeProperties: number;
  occupancyRate: number;
}

export interface RevenueItem {
  date: string;
  revenue: number;
}

export interface BookingItem {
  name: string;
  bookings: number;
}

export interface PropertySale {
  name: string;
  bookings: number;
  revenue: number;
  avg: number;
  status: string;
  image: string;
}
