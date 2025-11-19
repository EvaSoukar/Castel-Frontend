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
        owner: user?.id,          // get this from AuthContext
        address,
        country,
        rooms,                // empty array for now if no rooms yet
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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 border rounded space-y-4">
      <h3 className="text-xl font-bold mb-2">Create Castle</h3>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Castle created successfully!</p>}

      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border px-2 py-1 rounded" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full border px-2 py-1 rounded" />
      </div>

      <label className="block mb-1 font-semibold">Add Images</label>
      <ImageSection onImageAdded={onImageAdded}/>

      {images.length > 0 && (
        <ul className="list-disc pl-5">
          {images.map((img, idx) => (
            <li key={idx}>{img.name} - <a href={img.url} target="_blank" rel="noopener noreferrer">{img.url}</a></li>
          ))}
        </ul>
      )}

      <div>
        <div>
        </div>
        <label className="block mb-1 font-semibold">Address</label>
        <label className="block mb-1">Country</label>
        <select value={country} onChange={e => setCountry(e.target.value)} className="w-full border px-2 py-1 rounded">
          {Object.values(COUNTRIES).map(c => (
            <option key={c.name} value={c.value}>{c.name}</option>
          ))}
        </select>
        <label className="block mb-1 font-semibold" >Street</label>
        <AddressAutocomplete country={country} onSelect={setCoords} />
        {coords && (
          <>
            <LocationMap coords={coords} height={400} />

            <button
              type="button"
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={() => setAddress(JSON.stringify(coords))}
            >
              Save Location
            </button>
          </>
        )}
      </div>


      <CheckboxList label="Events" options={Object.values(EVENTS)} selected={events} onChange={setEvents} />
      <CheckboxList label="Facilities" options={Object.values(FACILITIES)} selected={facilities} onChange={setFacilities} />
      <CheckboxList label="Amenities" options={Object.values(CASTLE_AMENITIES)} selected={amenities} onChange={setAmenities} />
      <CheckboxList label="House Rules" options={["No smoking", "No pets", "No parties"]} selected={houseRules} onChange={setHouseRules} />
      <CheckboxList label="Safety Features" options={["Fire extinguisher", "First aid kit", "Security cameras"]} selected={safetyFeatures} onChange={setSafetyFeatures} />

      <div className="flex gap-4">
        <div>
          <label className="block mb-1 font-semibold">Check-in</label>
          <input type="time" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="border px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Check-out</label>
          <input type="time" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="border px-2 py-1 rounded" />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Cancellation Policy</label>
        <select value={cancellationPolicy} onChange={e => setCancellationPolicy(e.target.value)} className="border px-2 py-1 rounded">
          <option value="flexible">Flexible</option>
          <option value="moderate">Moderate</option>
          <option value="strict">Strict</option>
        </select>
      </div>

      <hr className="my-4" />

      <h4 className="font-bold mb-2">Add Rooms</h4>
      <RoomSection handleAddRoom={handleAddRoom} />
      {rooms.length > 0 && (
        <div className="mt-4">
          <h5 className="font-semibold mb-2">Rooms Added:</h5>
          <ul className="list-disc pl-5">
            {rooms.map((r, idx) => (
              <li key={idx}>{r.name} - Capacity: {r.capacity} - Price: ${r.price}</li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">Create Castle</button>
    </form>
  );
};

export default CreateCastle;
