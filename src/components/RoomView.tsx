import { useEffect, useState } from "react";
import { useRoom } from "../contexts/RoomContext";

type RoomViewProps = {
  castleID: string;
  onRoomSelected: (newRoomID: string) => void;
}

export const RoomView = ({ castleID, onRoomSelected }: RoomViewProps) => {
  const { rooms, actions } = useRoom();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);


  const handleToggle = (roomId: string | undefined) => {
    if (selectedRoom === roomId || !roomId) {
      setSelectedRoom(null);
      return;
    }
    setSelectedRoom(roomId);
    onRoomSelected(roomId);
  }

  useEffect(() => {
    actions.getRooms(castleID)
  }, []);

  return (
    <div>
      {rooms.length > 0 && (
        <div className="mt-4">
          <h5 className="font-semibold mb-2">Rooms Added:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room, idx) => (
              <div key={idx} className="border rounded-lg p-4 shadow bg-white">
                <h6 className="font-bold text-lg mb-2">{room.name}</h6>
                <p><span className="font-semibold">Capacity:</span> {room.capacity}</p>
                <p><span className="font-semibold">Price:</span> ${room.price}</p>
                <p><span className="font-semibold">Beds:</span> {room.beds.map((b, i) => (
                  <span key={i}>{b.type} x{b.count}{i < room.beds.length - 1 ? ', ' : ''}</span>
                ))}</p>
                <p><span className="font-semibold">Amenities:</span> {room.amenities.join(", ")}</p>
                <label key={room._id!} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={selectedRoom === room._id}
                    onChange={() => handleToggle(room._id)}
                  />
                  Select this room
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}