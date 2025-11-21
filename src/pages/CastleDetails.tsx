import { Link, useNavigate, useParams } from "react-router-dom"
import { useCastle } from "../contexts/CastleContext";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowUp, MdOutlineEvent, MdOutlineMail, MdOutlinePhoneInTalk, MdOutlineShare } from "react-icons/md";
import { LocationMap } from "../components/Map/LocationMap";
import { isJsonString } from "../helper/helpers";
import EditableDetails from "./EditableDetails";
import { RoomView } from "../components/RoomView";
import DatePicker from "react-datepicker";
import { GuestsSelector, type Guests } from "../components/GuestsSelector";
import { BookingSummary } from "../components/BookingSummary";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { GoDiamond } from "react-icons/go";
import { useAuth } from "../contexts/AuthContext";

const CastleDetails = () => {
  const { castleId } = useParams();
  const { castle, actions } = useCastle();
  const { user } = useAuth();

  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState<Date | null>(new Date());
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState<Date | null>();
  const [checkInDateForBooking, setcheckInDateForBooking] = useState<string>("");
  const [checkOutDateForBooking, setcheckOutDateForBooking] = useState<string>("");
  const [selectedRoomForBooking, setSelectedRoomForBookin] = useState<string>();
  const [guests, setGuests] = useState<Guests>({ adults: 1, children: 0, pets: 0 });
  const [showSummary, setShowSummary] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

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
  };

  const onDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setSelectedCheckInDate(start);
    setSelectedCheckOutDate(end);

    if (start) {
      const formattedCheckInDate = start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      setcheckInDateForBooking(formattedCheckInDate);
    }
    if (end) {
      const formattedCheckOutDate = end.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      setcheckOutDateForBooking(formattedCheckOutDate);
    }

  };

  const onRoomSelectedForBooking = (newRoomID: string) => {
    setSelectedRoomForBookin(newRoomID);
  };

  if (!castle) {
    return <p className="page-margin">Loading castle details...</p>;
  };

  const handlePrevImg = () => setCurrentImgIdx(idx => idx > 0 ? idx - 1 : castle.images.length - 1);
  const handleNextImg = () => setCurrentImgIdx(idx => idx < castle.images.length - 1 ? idx + 1 : 0);
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
          {castle?.images && castle.images.length > 0 && (
            <div className="relative w-full h-[50vh] flex items-center overflow-hidden rounded-xl justify-center bg-black mb-8">
              <img
                src={castle.images[currentImgIdx].url}
                alt={castle.images[currentImgIdx].name}
                className="w-full h-full object-cover"
                style={{ maxHeight: "60vh" }}
              />
              {castle.images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-secondary/90 rounded-full p-2 text-white"
                    onClick={handlePrevImg}
                    aria-label="Previous image"
                  >
                    <TfiArrowCircleLeft className="w-6 h-6 fill-primary cursor-pointer" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary/90 rounded-full p-2 text-white"
                    onClick={handleNextImg}
                    aria-label="Next image"
                  >
                    <TfiArrowCircleRight className="w-6 h-6 fill-primary cursor-pointer" />
                  </button>
                </>
              )}
            </div>
          )}
          {/* Castle info */}
          <div className="md:flex gap-4 md:border-b border-grey/30 md:mt-8">
            {/* Castle General info */}
            <div className="md:border-r border-grey/30 md:mr-4 md:mb-4 md:max-w-2/3 pr-4">
              {/* Castle name */}
              <div className="flex justify-between items-center pt-2">
                <h2 className="h2 max-w-3/4">{castle.name}</h2>
                <button className="flex items-center gap-1 max-h-fit rounded-full shadow-md px-4 py-1 md:px-8 md:py-2"><MdOutlineShare />Share</button>
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
              <h6 className="h6 pb-2 text-dark-brown">Amenities</h6>
              {castle.amenities && castle.amenities.length > 0 && (
                <ul className="pb-4 flex flex-wrap gap-2">
                  {castle.amenities?.map(amenity => (
                    <li key={amenity} className="text-xs capitalize flex items-center gap-1"><GoDiamond className="text-primary" />{amenity}</li>
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
                  {castle.houseRules && castle.houseRules.length > 0 && castle.houseRules.map(r => (
                    <li key={r} className="text-xs capitalize flex items-center gap-1"><GoDiamond className="text-primary" />{r}</li>
                  ))}
                </ul>
                {/* Saftey */}
                {castle.safetyFeatures && castle.safetyFeatures.length > 0 && (
                  <ul className="text-grey space-y-2">
                    <h6 className="h6 text-dark-brown">Saftey and property</h6>
                    {castle.safetyFeatures.map(f => (
                      <li key={f} className="text-xs capitalize flex items-center gap-1"><GoDiamond className="text-primary" />{f}</li>
                    ))}
                  </ul>
                )}
                {/* Cancellation */}
                {castle.cancellationPolicy && castle.cancellationPolicy.length > 0 && (
                  <div className="text-grey">
                    <h6 className="h6 text-dark-brown">Cancellation policy</h6>
                    <p className="capitalize">{castle.cancellationPolicy}</p>
                  </div>
                )}
              </div>
            </div>
            {/* Owner & location */}
            <div>
              {/* Owner */}
              <div className="flex items-center gap-6 py-4 my-4 border-y border-grey/30 max-w-fit md:border-0 md:my-0">
                {/* Owner info */}
                <div className="space-y-1">
                  <h6 className="h5 text-dark-brown">Contact the owner</h6>
                  <p className="flex items-center gap-2"><MdOutlineMail />{castle.owner.email}</p>
                  <p className="flex items-center gap-2"><MdOutlinePhoneInTalk />{castle.owner.phone}</p>
                </div>
                <img className="w-18 h-18 rounded-full object-cover" src={castle.owner.image} alt="the castle owner" />
              </div>
              {/* Location */}
              <div className="my-4 border-b border-grey/30 max-w-fit md:border-0 md:my-0 space-y-1">
                <h6 className="h5 text-dark-brown">Location</h6>
                <div className="min-w-3xs max-w-96 w-full h-60">
                  {coords && <LocationMap coords={coords} height={200} />}
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex justify-between md:mt-8">
            <div>
              <div className="md:border border-grey/30 md:p-6 rounded-xl">
                <h6 className="h6 text-dark-brown flex items-center gap-0.5 pb-2"><MdOutlineEvent />Select dates</h6>
                <DatePicker
                  selected={selectedCheckInDate}
                  onChange={onDateChange}
                  minDate={new Date()}
                  startDate={selectedCheckInDate}
                  endDate={selectedCheckOutDate}
                  selectsRange
                  inline
                  showDisabledMonthNavigation
                />
              </div>
              <GuestsSelector value={guests} onChange={setGuests} />
            </div>
            <RoomView castleID={castleId!} onRoomSelected={onRoomSelectedForBooking} />
          </div>
          <div className="grid items-baseline-last">
            {user ? (
              <button
                className="primary-btn mt-4 max-w-fit justify-self-end"
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
            ) : (
              <div className="justify-self-end text-center space-y-4">
                <p>Please Login or <Link to="/register" className="text-action underline text-base">SIGN UP</Link> to book a room.</p>
                <Link to="/login" className="primary-btn bg-action hover:bg-action-hover text-dark-brown">Login</Link>
              </div>
            )}
          </div>
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
};
export default CastleDetails;