import { useNavigate, useParams } from "react-router-dom"
import { useCastle } from "../contexts/CastleContext";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowUp, MdOutlineMail, MdOutlinePhoneInTalk, MdOutlineShare } from "react-icons/md";
import { LocationMap } from "../components/Map/LocationMap";
import { isJsonString } from "../helper/helpers";
import EditableDetails from "./EditableDetails";
import { RoomView } from "../components/RoomView";
import DatePicker from "react-datepicker";
import { GuestsSelector, type Guests } from "../components/GuestsSelector";
import { BookingSummary } from "../components/BookingSummary";

const CastleDetails = () => {
  const { castleId } = useParams();
  const { castle, actions } = useCastle();

  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState<Date>();
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState<Date>();
  const [checkInDateForBooking, setcheckInDateForBooking] = useState<string>("");
  const [checkOutDateForBooking, setcheckOutDateForBooking] = useState<string>("");
  const [selectedRoomForBooking, setSelectedRoomForBookin] = useState<string>();
  const [guests, setGuests] = useState<Guests>({ adults: 1, children: 0, pets: 0 });
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (castleId) {
      actions.getCastle(castleId);
    }
  }, []);

  useEffect(() => {
    if (!castle?.description) return;
    const words = castle.description.trim().split(/\s+/);
    if (words.length > 40) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }

    const truncated = words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");
    setDisplayText(truncated);

  }, [castle?.description]);

  const handleBackBtn = () => {
    navigate(-1);
  }

  const handleCheckInDateSelection = (date: Date | null) => {
    if (!date) {
      return;
    }
    const formattedDate = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    setSelectedCheckInDate(date)
    setcheckInDateForBooking(formattedDate);

    // If check-out date is before new check-in, reset it
    if (selectedCheckOutDate && date >= selectedCheckOutDate) {
      setSelectedCheckOutDate(undefined);
      setcheckOutDateForBooking("");
    }
  }

  const handleCheckOutDateSelection = (date: Date | null) => {
    if (!date || (selectedCheckInDate && date <= selectedCheckInDate)) {
      return;
    }
    const formattedDate = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    setSelectedCheckOutDate(date)
    setcheckOutDateForBooking(formattedDate);
  }

  const onRoomSelectedForBooking = (newRoomID: string) => {
    setSelectedRoomForBookin(newRoomID);
  }

  if (!castle) {
    return <p className="page-margin">Loading castle details...</p>;
  }

  const coords = isJsonString(castle.address) ? JSON.parse(castle.address) : null;

  return (
    <div className="page-margin space-y-2">
      {/* Go back button */}
      <button onClick={handleBackBtn} className="flex items-center"><MdKeyboardArrowLeft className="h-8 w-8" /> Go back to listings</button>
      {editMode ? (
        <EditableDetails
          onSave={() => setEditMode(false)}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          {/* Castle images */}
          {castle.images.map(img => (
            <img className="max-h-64 w-full h-full object-cover rounded-xl" src={img.url} alt={img.name} />
          ))}
          {/* Castle info */}
          <div className="lg:flex gap-4 lg:border-b border-grey lg:mt-8">
            {/* Castle General info */}
            <div className="lg:border-r border-grey lg:mr-4 lg:mb-4 max-w-2/3 pr-4">
              {/* Castle name */}
              <div className="flex justify-between items-center pt-2">
                <h2 className="h2 max-w-3/4">{castle.name}</h2>
                <button className="flex items-center gap-1 max-h-fit rounded-full shadow-md px-4 py-1 lg:px-8 lg:py-2"><MdOutlineShare />Share</button>
              </div>
              {/* Events tag */}
              {castle.events && castle.events?.length > 0 && (
                <button className="outline-btn text-xs p-0.5">Event available</button>
              )}
              {/* Castle description */}
              <div className="py-4">
                <p>{isExpanded ? castle.description : displayText}</p>
                {showButton && (
                  <button className={"flex items-center cursor-pointer text-action font-display text-lg"} onClick={() => setIsExpanded(prev => !prev)}>{!isExpanded ? (<>Show more<MdKeyboardArrowDown className="w-8 h-8" /></>) : (<>Show less<MdKeyboardArrowUp className="w-8 h-8" /></>)}</button>
                )}
              </div>
              {/* Amenities */}
              {castle.amenities && castle.amenities.length > 0 && (
                <ul className="pb-4 space-y-2">
                  {castle.amenities?.map(amenity => (
                    <li className="text-xs">{amenity}</li>
                  ))}
                </ul>
              )}
              {/* Policies */}
              <div className="space-y-2">
                {/* House rules */}
                <ul className="text-grey space-y-2">
                  <h6 className="h6 text-dark-brown">House rules</h6>
                  <li>Check-in after {castle.checkIn}</li>
                  <li>Check-out before {castle.checkOut}</li>
                  <li>{castle.houseRules}</li>
                </ul>
                {/* Saftey */}
                {castle.safetyFeatures && castle.safetyFeatures.length > 0 && (
                  <ul className="text-grey space-y-2">
                    <h6 className="h6 text-dark-brown">Saftey and property</h6>
                    <p>{castle.safetyFeatures}</p>
                  </ul>
                )}
                {/* TODO: block the button if it's not owner or admin */}
                <button onClick={() => setEditMode(true)} className="bg-gray-600 text-white px-4 py-2 rounded">Edit</button>

                {/* Cancellation */}
                {castle.cancellationPolicy && castle.cancellationPolicy.length > 0 && (
                  <div className="text-grey">
                    <h6 className="h6 text-dark-brown">Saftey and property</h6>
                    <p>{castle.cancellationPolicy}</p>
                  </div>
                )}
              </div>
            </div>
            {/* Owner & location */}
            <div>
              {/* Owner */}
              <div className="flex items-center gap-6 py-4 my-4 border-y border-grey max-w-fit lg:border-0 lg:my-0">
                {/* Owner info */}
                <div className="space-y-1">
                  <h6 className="h5 text-dark-brown">Contact the owner</h6>
                  <p className="flex items-center gap-2"><MdOutlineMail />{castle.owner.email}</p>
                  <p className="flex items-center gap-2"><MdOutlinePhoneInTalk />{castle.owner.phone}</p>
                </div>
                <img className="w-18 h-18 rounded-full object-cover" src={castle.owner.image} alt="the castle owner" />
              </div>
              {/* Location */}
              <div className="py-4 my-4 border-y border-grey max-w-fit lg:border-0 lg:my-0">
                <h6 className="h5 text-dark-brown">Location</h6>
                <div className="min-w-3xs max-w-96 w-full h-60 border-2">
                  {coords && <LocationMap coords={coords} height={200} />}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label className="block font-semibold mb-1">Select Check-In Dates</label>
              <DatePicker
                selected={selectedCheckInDate}
                onChange={date => handleCheckInDateSelection(date)}
                dateFormat="yyyy/MM/dd"
                className="border px-2 py-1 rounded"
                placeholderText="Choose a date"
                minDate={new Date()} // Prevent past dates
              />
              <label className="block font-semibold mb-1">Select Check-Out Dates</label>
              <DatePicker
                selected={selectedCheckOutDate}
                onChange={date => handleCheckOutDateSelection(date)}
                dateFormat="yyyy/MM/dd"
                className="border px-2 py-1 rounded"
                placeholderText="Choose a date"
                minDate={selectedCheckInDate || new Date()} // Prevent dates before check-in
                disabled={!selectedCheckInDate} // Disable until check-in is picked
              />
            </div>
            <GuestsSelector value={guests} onChange={setGuests} />
            <RoomView castleID={castleId!} onRoomSelected={onRoomSelectedForBooking} />
          </div>
          <button
            className="primary-btn"
            disabled={
              !selectedCheckInDate ||
              !selectedCheckOutDate ||
              !selectedRoomForBooking ||
              !guests.adults ||
              !castle
            }
            onClick={() => setShowSummary(true)}
          >
            Reserve
          </button>
        </>
      )}
      {showSummary && (
        <BookingSummary
          castle={castle}
          selectedCheckInDate={checkInDateForBooking}
          selectedCheckOutDate={checkOutDateForBooking}
          guests={guests}
          roomID={selectedRoomForBooking!}
          onConfirm={() => setShowSummary(false)}
          onClose={() => setShowSummary(false)}
        />
      )}
    </div>
  )
}
export default CastleDetails