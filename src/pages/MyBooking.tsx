
import { useEffect } from "react";
import { useBooking } from "../contexts/BookingContext";

export const MyBooking = () => {
  const { bookings, actions } = useBooking();
  useEffect(() => {
    actions.getBookingsForUser();
  }, []);

  return (
    <div className="page-margin">
      <h2 className="h2 mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {bookings.map(booking => (
            <div key={booking._id} className="border rounded-lg p-4 shadow bg-white">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <span className="font-bold text-primary">Booking ID:</span>
                <span>{booking._id}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <span className="font-bold">Castle ID:</span>
                <span>{booking.castleId}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <span className="font-bold">Room ID:</span>
                <span>{booking.roomId}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <span className="font-bold">Check-in Date:</span>
                <span>{new Date(booking.checkInDate).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <span className="font-bold">Check-out Date:</span>
                <span>{new Date(booking.checkOutDate).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <span className="font-bold">Guests:</span>
                <span>{booking.guests}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <span className="font-bold">Total Price:</span>
                <span>{booking.totalPrice} €</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}