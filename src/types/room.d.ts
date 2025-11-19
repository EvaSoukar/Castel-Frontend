type Bed = {
  type: string;
  count: number;
};

type Room = {
  _id?: string,
  castleId: string;
  name: string;
  capacity: number;
  beds: Bed[];
  amenities: string[];
  price: number;
};