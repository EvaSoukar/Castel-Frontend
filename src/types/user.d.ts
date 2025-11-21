type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "guest" | "owner";
  image?: string; 
  token?: string;
};