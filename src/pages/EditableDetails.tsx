import { useCastle } from "../contexts/CastleContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

type EditableProps = {
  onSave: () => void;
  onCancel: () => void;
}
const EditableDetails = ({onSave, onCancel}: EditableProps) => {
  const { castleId } = useParams();
  const { castle, actions } = useCastle();

  // Local state for all editable fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [houseRules, setHouseRules] = useState<string[]>([]);
  const [safetyFeatures, setSafetyFeatures] = useState<string[]>([]);
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  // Add other fields as needed

  useEffect(() => {
    if (castle) {
      setName(castle.name || "");
      setDescription(castle.description || "");
      setCheckIn(castle.checkIn || "");
      setCheckOut(castle.checkOut || "");
      setHouseRules(castle.houseRules || []);
      setSafetyFeatures(castle.safetyFeatures || []);
      setCancellationPolicy(castle.cancellationPolicy || "");
      setAmenities(castle.amenities || []);
      setEvents(castle.events || []);
      setFacilities(castle.facilities || []);
      setAddress(castle.address || "");
      setCountry(castle.country || "");
      // Add other fields as needed
    }
  }, [castle]);

  const handleSave = async () => {
    if (!castleId) {
      return
    }
    const updatedCastle = {
      ...castle,
      name,
      description,
      checkIn,
      checkOut,
      houseRules,
      safetyFeatures,
      amenities,
      events,
      facilities,
      address,
      country,
      // Add other fields as needed
    };
    await actions.updateCastle(castleId, updatedCastle);
    onSave();
  };

  return (
    <div className="space-y-4 p-4 border rounded">
      <h3 className="text-xl font-bold mb-2">Edit Castle Details</h3>
      <div>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>Check-in</label>
        <input value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>Check-out</label>
        <input value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>House Rules</label>
        <input value={houseRules.join(", ")} onChange={e => setHouseRules(e.target.value.split(",").map(s => s.trim()))} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>Safety Features</label>
        <input value={safetyFeatures.join(", ")} onChange={e => setSafetyFeatures(e.target.value.split(",").map(s => s.trim()))} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>Cancellation Policy</label>
        <input value={cancellationPolicy} onChange={e => setCancellationPolicy(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>Amenities</label>
        <input value={amenities.join(", ")} onChange={e => setAmenities(e.target.value.split(",").map(s => s.trim()))} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>Events</label>
        <input value={events.join(", ")} onChange={e => setEvents(e.target.value.split(",").map(s => s.trim()))} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>Facilities</label>
        <input value={facilities.join(", ")} onChange={e => setFacilities(e.target.value.split(",").map(s => s.trim()))} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>Address</label>
        <input value={address} onChange={e => setAddress(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label>Country</label>
        <input value={country} onChange={e => setCountry(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      {/* Add more fields as needed */}
      <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
      <button onClick={onCancel} className="bg-red-600 text-white px-4 py-2 rounded">Cancel</button>
    </div>
  );
};

export default EditableDetails;