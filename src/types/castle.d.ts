type CancellationPolicy = "flexible" | "moderate" | "strict";

type Image = {
  name: string,
  url: string,
};

type Castle = {
  id?: number;
  name: string;
  description: string;
  owner: User;
  address: string;
  events?: string[];
  images : Image[];
  facilities?: string[];
  amenities?: string[];
  rooms: (Room)[];
  checkIn: string;
  checkOut: string;
  cancellationPolicy: CancellationPolicy;
  houseRules?: string[];
  safetyFeatures: string[];
  bookings?: string[];
  creadttedAt: string;
  updatedAt: string[];
};