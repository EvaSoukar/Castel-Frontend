import { useState } from "react";
import { CheckboxList } from "./CheckboxList";
import ROOM_AMENITIES from "../constants/roomAmenities";
import type { RoomForm } from "../pages/CreateCastle";
import Input from "./Input";

type RoomSectionProps = {
  handleAddRoom: (newRoom: RoomForm) => void;
}
export const RoomSection = ({ handleAddRoom }: RoomSectionProps) => {
  const [roomName, setRoomName] = useState("");
  const [roomCapacity, setRoomCapacity] = useState(1);
  const [roomBeds, setRoomBeds] = useState<Bed[]>([]);
  const [roomAmenities, setRoomAmenities] = useState<string[]>([]);
  const [roomPrice, setRoomPrice] = useState(1);
  const [bedType, setBedType] = useState<string>("");
  const [bedCount, setBedCount] = useState<number>(0);

  const resetRoomData = () => {
    setRoomName("");
    setRoomCapacity(1);
    setRoomBeds([]);
    setRoomAmenities([]);
    setRoomPrice(1);
  }

  const onAddRoom = () => {
    const newRoom: RoomForm = {
      name: roomName,
      capacity: roomCapacity,
      beds: roomBeds,
      amenities: roomAmenities,
      price: roomPrice
    }
    handleAddRoom(newRoom);
    resetRoomData();
  }

  const handleAddBed = () => {
    if (bedCount && bedType) {
      const newBed: Bed = {
        type: bedType,
        count: bedCount,
      }
      setRoomBeds(prev => [...prev, newBed]);
      setBedCount(0);
      setBedType("");
    }
  }
  return (
    <div className="space-y-4">
      <h5 className="h5 mb-2">Add Rooms</h5>
      <Input
        label="Room Name"
        type="text"
        name="room-name"
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
        required={true}
      />
      {/* <input type="text" placeholder="Room name" value={roomName} onChange={e => setRoomName(e.target.value)} className="border px-2 py-1 rounded w-full" /> */}
      <label htmlFor="capacity">Capacity</label>
      <input
        id="capacity" 
        type="number" 
        min={1} 
        value={roomCapacity} 
        onChange={e => setRoomCapacity(Number(e.target.value))} 
        className="input" 
      />
      <div className="space-y-2">
        <h6 className="h6">Beds</h6>
        <div className="flex gap-2">
          <Input
            label="Bed Type"
            type="text"
            name="bed-type"
            value={bedType}
            onChange={e => setBedType(e.target.value)}
          />
          <Input
            label="Beds count"
            type="number"
            name="bed-count"
            value={bedCount.toString()}
            onChange={e => setBedCount(parseInt(e.target.value))}
          />
        </div>
        {/* <input
          type="text"
          placeholder="Bed Type"
          value={bedType}
          onChange={e => setBedType(e.target.value)}
          className="input"
        /> */}
        {/* <input
          type="text"
          placeholder="Beds count"
          value={bedCount}
          onChange={e => setBedCount(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-1/2"
        /> */}
        <button type="button" onClick={handleAddBed} className="outline-btn">Add Bed</button>
      </div>
      {roomBeds.length > 0 && (
        <ul className="list-disc pl-5">
          {roomBeds.map((bed, idx) => (
            <li key={idx}>{`Type: ${bed.type}, Count: ${bed.count}`} </li>
          ))}
        </ul>
      )}
      <CheckboxList label="Amenities" options={Object.values(ROOM_AMENITIES)} selected={roomAmenities} onChange={setRoomAmenities} />
      <label htmlFor="price">Price</label>
      <input 
        id="price"
        type="number" 
        min={1} 
        placeholder="Price"
        value={roomPrice} 
        onChange={e => setRoomPrice(Number(e.target.value))} 
        className="input" 
      />

      <button type="button" className="outline-btn" onClick={onAddRoom}>Add Room</button>
    </div>
  )
}