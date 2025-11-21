import { MdArrowRightAlt, MdDone } from "react-icons/md";
import type { Guests } from "./GuestsSelector";

type Props = {
  castleName: string;
  checkInDate: string;
  checkOutDate: string;
  roomName: string;
  guests: Guests;
  bookingId: string;
  totalPrice: number;
  onClose: () => void;
};

export const BookingSuccess = ({
  castleName,
  checkInDate,
  checkOutDate,
  roomName,
  guests,
  bookingId,
  totalPrice,
  onClose,
}: Props) => (
  <div className="z-[9999] fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-secondary rounded-lg p-6 max-w-md w-full shadow-xl text-center">
      <MdDone className="mx-auto text-success w-14 h-14" />
      <h2 className="h2">Booking Completed!</h2>
      <p className="text-xs py-2">A booking confirmation has been sent to your mail.</p>
      <div className="border border-grey/30 rounded-lg p-4 mb-4 text-left">
        <h6 className="h6 pb-2">{castleName}</h6> 
        <div className="py-2">
          <h6 className="h6 text-dark-brown">Date:</h6>
          <p className="flex items-center gap-2 text-sm">{checkInDate} <MdArrowRightAlt className="w-8 h-8" /> {checkOutDate}</p>
        </div>
        <div className="border-b border-grey"></div>
        <div className="py-2">
          <h6 className="h6 pb-1 text-dark-brown">Room:</h6>
          <p className="text-sm">{roomName}</p>
        </div>
        <div className="border-b border-grey"></div>
        <div className="py-2">
          <h6 className="h6 text-dark-brown">Guests:</h6>
          {guests.adults > 0 && (
            <p>{guests.adults} {guests.adults > 1 ? <span>Adults</span> : <span>Adult</span>}</p>
          )}
          {guests.children > 0 && (
            <p>{guests.children} {guests.children > 1 ? <span>Children</span> : <span>Child</span>}</p>
          )}
          {guests.pets > 0 && (
            <p>{guests.pets} {guests.pets > 1 ? <span>Pets</span> : <span>Pet</span>}</p>
          )}
        </div>
        <div className="border-b border-grey"></div>
        <div className="py-2">
          <h6 className="h6 pb-1 text-dark-brown">Booking ID:</h6>
          <p className="text-sm">{bookingId}</p>
        </div>
        <div className="border-b border-grey"></div>
        <div className="py-2">
          <h6 className="h6 pb-1 text-dark-brown">Total price:</h6>
          <p className="text-sm">{totalPrice}€</p>
        </div>
      </div>
      <button className="outline-btn" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);