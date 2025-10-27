type Bed = {
  type: string;
  count: number;
};

type Room = {
  castleId: string;
  name: string;
  capacity: number;
  beds: Bed[];
  amenities: string[];
  price: number;
};