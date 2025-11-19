import React from "react";
import { MdCheckCircle } from "react-icons/md";
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
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg text-center">
      <MdCheckCircle className="mx-auto text-green-500" size={60} />
      <h2 className="font-bold text-2xl mt-2 mb-4 text-green-700">Booking Completed</h2>
      <div className="border rounded-lg p-4 mb-4 text-left bg-gray-50">
        <div className="mb-2">
          <span className="font-semibold">Castle:</span> {castleName}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Dates:</span> {checkInDate} &rarr; {checkOutDate}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Room:</span> {roomName}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Guests:</span> {guests.adults} Adult(s), {guests.children} Children, {guests.pets} Pets
        </div>
        <div className="mb-2">
          <span className="font-semibold">Booking ID:</span> {bookingId}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Total Price:</span> ${totalPrice}
        </div>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);