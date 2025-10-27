type CancellationPolicy = "flexible" | "moderate" | "strict";

type Caslte = {
  id?: number;
  name: string;
  description: string;
  owner: User;
  address: string;
  events?: string[];
  images : string[];
  facilities?: string[];
  amenities?: string[];
  rooms: string[];
  checkIn: string;
  checkOut: string;
  cancellationPolicy: CancellationPolicy;
  houseRules?: string[];
  safetyFeatures: string[];
  bookings?: string[];
  creadttedAt: string;
  updatedAt: string[];
};