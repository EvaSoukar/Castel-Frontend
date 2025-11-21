import { createContext, useContext, useState, type PropsWithChildren } from "react";
import axios from "../api/axios";
import { useAuth } from "./AuthContext";

type BookingResponse = Booking & {
  _id: string;
};

type BookingState = {
  bookings: Booking[];
  actions: {
    createBooking: (bookingData: Booking) => Promise<BookingResponse>;
    getBookingsForUser: () => Promise<BookingResponse[]>;
  };
};

const BookingContext = createContext<BookingState | undefined>(undefined);

const BookingProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  const createBooking = async (bookingData: Booking): Promise<BookingResponse> => {
    if (!user)
      throw new Error("You must be logged in to create a booking");

    try {
      const res = await axios.post(`/castles/${bookingData.castleId}/rooms/${bookingData.roomId}/bookings`, bookingData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      });
      const newBooking = res.data;
      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (err) {
      console.error("Failed to create booking:", err);
      throw err;
    }
  };

  const getBookingsForUser = async (): Promise<BookingResponse[]> => {
    if (!user)
      throw new Error("You must be logged in or provide a userId to get bookings");

    const id = user._id;
    try {
      const res = await axios.get(`/bookings/user/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        },
      });
      setBookings(res.data);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch bookings by user:", err);
      throw err;
    }
  };

  const actions: BookingState["actions"] = {
    createBooking,
    getBookingsForUser
  };

  return (
    <BookingContext.Provider value={{ bookings, actions }}>{children}</BookingContext.Provider>
  )
};

const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export { BookingProvider, useBooking };