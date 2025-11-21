import { useEffect, useState } from "react";
import type { Guests } from "./GuestsSelector";
import { useRoom } from "../contexts/RoomContext";
import { BookingSuccess } from "./BookingSuccess";
import { useBooking } from "../contexts/BookingContext";
import { useAuth } from "../contexts/AuthContext";
import { isJsonString } from "../helper/helpers";
import type { LocationMapCoords } from "./Map/LocationMap";
import { fetchLocationFromCoords, type LocationData } from "./CastleCard";
import { MdArrowRightAlt, MdKeyboardArrowLeft, MdOutlineLocationOn } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { PiPaypalLogoDuotone } from "react-icons/pi";
import { FaApplePay } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
  const [bookingData, setBookingData] = useState<{ bookingId: string; totalPrice: number; }>({ bookingId: "", totalPrice: 0 });
  const bookingContext = useBooking();
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [doneLoading, setdoneLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("credit card");
  const [bookingError, setBookingError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(e.target.value);
  };

  useEffect(() => {
    actions.getRoom(castle._id!, roomID);

    if (isJsonString(castle.address)) {
      const coords: LocationMapCoords = JSON.parse(castle.address);
      fetchLocationFromCoords(coords.lat, coords.lng).then((locData) => {
        setLocationData(locData)
        setdoneLoading(true)
      });
    }
  }, []);

  const totalCost = room?.price;

  const handleConfirm = async () => {
    const guestsNumber = guests.adults + guests.children + guests.pets;
    const bookingData: Booking = {
      userId: user?._id!,
      castleId: castle._id!,
      roomId: roomID,
      checkInDate: selectedCheckInDate!,
      checkOutDate: selectedCheckOutDate!,
      guests: guestsNumber,
      totalPrice: room?.price!
    }
    setBookingError(null);
    try {
      const res = await bookingContext.actions.createBooking(bookingData);
      if (res._id) {
        setBookingData({ bookingId: res._id, totalPrice: res.totalPrice });
        setIsSuccessBooking(true);
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setBookingError(err.response.data.message);
      } else {
        setBookingError("Booking failed. Please try again.");
      }
    }
  };

  const handleClosePopup = () => {
    setIsSuccessBooking(false);
    onConfirm();
  };

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
      <div className="fixed z-[9999] inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm">
        <div className="max-h-screen overflow-y-auto p-6 min-w-6/12 w-full bg-secondary space-y-4">
          <button className="flex items-center" onClick={onClose}><MdKeyboardArrowLeft className="h-8 w-8" />Go back without booking</button>
          <h3 className="h3">Booking Summary</h3>
          <div className="rounded-xl overflow-hidden max-h-52">
            {castle.images && (
              <img className="object-cover max-h-52 w-full" src={castle.images[0].url} alt={castle.images[0].name} />
            )}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h5 className="h5 pb-2">{castle.name}</h5>
              <div className="text-sm text-gray-600 flex items-center gap-0.5">
                <span><MdOutlineLocationOn /></span>{doneLoading ? `${locationData?.city}, ${locationData?.country}` : "Loading..."}
              </div>
              <div className="text-grey text-sm">
                <p>Our cancellation policy is: <span className="capitalize">{castle.cancellationPolicy}</span></p>
                <p>Check In after: {castle.checkIn}</p>
                <p>Check Out before: {castle.checkOut}</p>
              </div>
            </div>
          </div>
          <div className="border-b max-w-3/4 border-grey"></div>
          <div className="mb-4">
            <h6 className="h6 text-dark-brown">Date:</h6>
            <p className="flex items-center gap-2">{selectedCheckInDate} <MdArrowRightAlt className="w-8 h-8" /> {selectedCheckOutDate}</p>
          </div>
          <div className="border-b max-w-3/4 border-grey"></div>
          <div className="mb-4">
            <h6 className="h6 text-dark-brown">Room:</h6>
            <p>{room?.name}</p>
          </div>
          <div className="border-b max-w-3/4 border-grey"></div>
          <div className="mb-2">
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
          <div className="border-b max-w-3/4 border-grey"></div>
          <div className="mb-4">
            <span className="font-semibold">Price per night:</span> ${totalCost}
          </div>
          <div className="space-y-4 flex flex-col items-center pb-2">
            <h5 className="h5">Select payment method</h5>
            <label className="border border-grey/30 input justify-between max-w-2xs">
              <span className="flex items-center gap-1"><CiCreditCard1 /> Credit card</span>
              <input
                type="radio"
                name="Credit card"
                value="credit card"
                className="radio-btn border-grey before:bg-primary"
                checked={selectedPayment === "credit card"}
                onChange={handleChange}
              />
            </label>
            <label className="border border-grey/30 input justify-between max-w-2xs">
              <span className="flex items-center gap-0.5"><PiPaypalLogoDuotone /> PayPal</span>
              <input
                type="radio"
                name="PayPal"
                value="paypal"
                className="radio-btn border-grey before:bg-primary"
                checked={selectedPayment === "paypal"}
                onChange={handleChange}
              />
            </label>
            <label className="border border-grey/30 input justify-between max-w-2xs">
              <span className="flex items-center gap-0.5"><FaApplePay /> Apple Pay</span>
              <input
                type="radio"
                name="Apple Pay"
                value="apple pay"
                className="radio-btn border-grey before:bg-primary"
                checked={selectedPayment === "apple pay"}
                onChange={handleChange}
              />
            </label>
          </div>
          {bookingError && (
            <div className="text-error text-sm mb-2 text-center">
              <p>{bookingError}</p>
              
            </div>
          )}
          {user ? (
            <div className="text-center">
              <button className="primary-btn bg-action hover:bg-action-hover text-dark-brown" onClick={handleConfirm}>Book</button>
            </div>
          ) : (
            <div className="text-center">
              <Link to="/login" className="primary-btn bg-action hover:bg-action-hover text-dark-brown">Login</Link>
            </div>
          )}
        </div>
      </div>
    );
};