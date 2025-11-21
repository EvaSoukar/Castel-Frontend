import { useState } from "react";
import { useCastle } from "../contexts/CastleContext";
import EVENTS from "../constants/events";
import FACILITIES from "../constants/facilities";
import CASTLE_AMENITIES from "../constants/castleAmenities";
import COUNTRIES from "../constants/countries";
import { useAuth } from "../contexts/AuthContext";
import { AddressAutocomplete } from "../components/Map/AdressAutoCompleter";
import { LocationMap, type LocationMapCoords } from "../components/Map/LocationMap";
import { CheckboxList } from "../components/CheckboxList";
import { RoomSection } from "../components/RoomSection";
import { ImageSection } from "../components/ImageSection";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";

export type RoomForm = {
  name: string;
  capacity: number;
  beds: Bed[];
  amenities: string[];
  price: number;
};

const CreateCastle = () => {
  const { actions } = useCastle();
  const { user } = useAuth()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState<string | null>(null);
  const [country, setCountry] = useState(Object.values(COUNTRIES)[0].value);
  const [coords, setCoords] = useState<LocationMapCoords | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [checkIn, setCheckIn] = useState("15:00");
  const [checkOut, setCheckOut] = useState("11:00");
  const [cancellationPolicy, setCancellationPolicy] = useState("moderate");
  const [houseRules, setHouseRules] = useState<string[]>([]);
  const [safetyFeatures, setSafetyFeatures] = useState<string[]>([]);
  const [rooms, setRooms] = useState<RoomForm[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  }

  const handleAddRoom = (newRoom: RoomForm) => {
    setRooms(prev => [
      ...prev,
      newRoom,
    ]);
  };

  const onImageAdded = (newImage: Image) => {
    setImages(prev => [...prev, newImage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const castleData = {
        name,
        description,
        owner: user,
        address,
        country,
        rooms,
        events,
        images,
        facilities,
        amenities,
        checkIn: "15:00",
        checkOut: "11:00",
        cancellationPolicy: "moderate",
        houseRules,
        safetyFeatures,
      };

      await actions.createCastle(castleData as any);
      setSuccess(true);
      // reset form
      setName("");
      setDescription("");
      setAddress(null);
      setEvents([]);
      setFacilities([]);
      setAmenities([]);
      setImages([]);
      setCheckIn("15:00");
      setCheckOut("11:00");
      setCancellationPolicy("moderate");
      setHouseRules([]);
      setSafetyFeatures([]);
      setRooms([]);
    } catch (err: any) {
      setError(err.message || "Failed to create castle");
    }
  };

  return (
    <>
      {success ? (
        <div onClick={handleClose} className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="relative py-16 min-w-6/12 w-full max-w-11/12 md:max-w-3/5 bg-secondary space-y-4 flex flex-col justify-center items-center shadow-md rounded-lg">
            <button onClick={handleClose} className="absolute top-3 right-3 cursor-pointer"><MdOutlineClose className="w-6 h-6" /></button>
            <span className="text-success">Castle created successfully!</span>
          </div>
        </div>
      ) : (
        <div className="page-margin space-y-6">
          <h2 className="h2">Create Castle</h2>
          <form onSubmit={handleSubmit} className="max-w-4x p-4 shadow-md rounded-lg space-y-6">
            {error && <p className="text-error text-sm max-w-4/5 px-6">{error}</p>}
            <Input
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required={true}
            />
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required className="input w-full" />
            </div>
            <ImageSection onImageAdded={onImageAdded} />
            {images.length > 0 && (
              <ul className="list-disc pl-5">
                {images.map((img, idx) => (
                  <li key={idx}>{img.name} - <a href={img.url} target="_blank" rel="noopener noreferrer">{img.url}</a></li>
                ))}
              </ul>
            )}
            <div>
              <h6 className="h6 pb-2">Address</h6>
              {!address ? (
                <>
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="input"
                  >
                    {Object.values(COUNTRIES).map(c => (
                      <option key={c.name} value={c.value}>{c.name}</option>
                    ))}
                  </select>
                  <AddressAutocomplete country={country} onSelect={setCoords} />
                  {coords && (
                    <>
                      <LocationMap coords={coords} height={200} />
                      <button
                        type="button"
                        className="outline-btn mt-4"
                        onClick={() => setAddress(JSON.stringify(coords))}
                      >
                        Save Location
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="m-2">
                  <p>Address saved succesfully</p>
                  {coords && (
                    <>
                      <LocationMap coords={coords} height={200} />
                    </>
                  )}
                </div>
              )}
            </div>
            <CheckboxList 
              label="Events" 
              options={Object.values(EVENTS)} 
              selected={events} 
              onChange={setEvents} 
            />
            <CheckboxList 
              label="Facilities" 
              options={Object.values(FACILITIES)} 
              selected={facilities} 
              onChange={setFacilities} 
            />
            <CheckboxList 
              label="Amenities" 
              options={Object.values(CASTLE_AMENITIES)} 
              selected={amenities} 
              onChange={setAmenities} 
            />
            <CheckboxList 
              label="House Rules" 
              options={["No smoking", "No pets", "No parties"]} 
              selected={houseRules} 
              onChange={setHouseRules} 
            />
            <CheckboxList 
              label="Safety Features" 
              options={["Fire extinguisher", "First aid kit", "Security cameras"]} 
              selected={safetyFeatures} 
              onChange={setSafetyFeatures} 
            />
            <div className="flex gap-4">
              <Input
                label="Check-in"
                type="time"
                name="chech-in"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                required={true}
              />
              <Input
                label="Check-out"
                type="time"
                name="chech-out"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                required={true}
              />
            </div>
            <div>
              <label htmlFor="policy">Cancellation Policy</label>
              <select id="policy" value={cancellationPolicy} onChange={e => setCancellationPolicy(e.target.value)} className="input">
                <option value="flexible">Flexible</option>
                <option value="moderate">Moderate</option>
                <option value="strict">Strict</option>
              </select>
            </div>
            <RoomSection handleAddRoom={handleAddRoom} />
            {rooms.length > 0 && (
              <div className="mt-4">
                <h6 className="h6">Rooms Added:</h6>
                <ul className="list-disc pl-5">
                  {rooms.map((r, idx) => (
                    <li key={idx}>{r.name} - Capacity: {r.capacity} - Price: ${r.price}</li>
                  ))}
                </ul>
              </div>
            )}
            <button type="submit" className="primary-btn">Create Castle</button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateCastle;