import React, { useEffect, useState } from "react";
import type { Guests } from "./GuestsSelector";
import { useRoom } from "../contexts/RoomContext";
import { BookingSuccess } from "./BookingSuccess";
import { useBooking } from "../contexts/BookingContext";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  castle: Castle;
  selectedCheckInDate: string | undefined;
  selectedCheckOutDate: string | undefined;
  roomID: string;
  guests: Guests;
  onConfirm: () => void;
  onClose: () => void;
};

export const BookingSummary = ({
  castle,
  selectedCheckInDate,
  selectedCheckOutDate,
  roomID,
  guests,
  onConfirm,
  onClose,
}: Props) => {
  const { user } = useAuth()
  const { room, actions } = useRoom();
  const [isSuccessBooking, setIsSuccessBooking] = useState(false);
  const [bookingData, setBookingData] = useState<{
    bookingId: string;
    totalPrice: number;
  }>({
    bookingId: "",
    totalPrice: 0,
  });
  const bookingContext = useBooking();

  useEffect(() => {
    actions.getRoom(castle._id!, roomID);
  }, []);
  const totalCost = room?.price

  const handleConfirm = async () => {
    // TODO: show differnt view depending on the response from BE
    const guestsNumber = guests.adults + guests.children + guests.pets;
    const bookingData: Booking = {
      userId: user?.id!,
      castleId: castle._id!,
      roomID: roomID,
      checkInDate: selectedCheckInDate!,
      checkOutDate: selectedCheckOutDate!,
      guests: guestsNumber,
      // TODO: Modify total price, it should be price for all nights
      totalPrice: room?.price!
    }
    const res = await bookingContext.actions.createBooking(bookingData);
    // If an ID is return that means the booking was successful
    if (res._id) {
      setBookingData({
        bookingId: res._id,
        totalPrice: res.totalPrice,
      })
      setIsSuccessBooking(true)
    }
  }

  const handleClosePopup = () => {
    setIsSuccessBooking(false);
    onConfirm();
  }

  return isSuccessBooking ?
    <BookingSuccess
      castleName={castle.name}
      checkInDate={selectedCheckInDate!}
      checkOutDate={selectedCheckOutDate!}
      roomName={room?.name!}
      guests={guests}
      bookingId={bookingData.bookingId}
      totalPrice={bookingData.totalPrice}
      onClose={handleClosePopup}
    /> : (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
          <h3 className="font-bold text-xl mb-2">Booking Summary</h3>
          <div className="flex items-center gap-4 mb-4">
            {castle.images?.[0] && (
              <img src={castle.images[0].url} alt={castle.name} className="w-20 h-20 object-cover rounded" />
            )}
            <div>
              <div className="font-semibold">{castle.name}</div>
              <div className="text-sm text-gray-600">{castle.address}</div>
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Description:</span> {castle.description}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Check In Date:</span> {selectedCheckInDate}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Check Out Date:</span> {selectedCheckOutDate}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Room:</span>
            <p>{`${room?.capacity}, ${room?.name}`}</p>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Guests:</span> {guests.adults} Adult(s), {guests.children} Children, {guests.pets} Pets
          </div>
          <div className="mb-4">
            <span className="font-semibold">Total Cost:</span> ${totalCost}
          </div>
          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleConfirm}>Confirm Book</button>
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
};