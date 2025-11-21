import { useEffect, useState } from "react";
import { useRoom } from "../contexts/RoomContext";
import { MdOutlineKingBed } from "react-icons/md";

type RoomViewProps = {
  castleID: string;
  onRoomSelected: (newRoomID: string) => void;
};

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
  };

  useEffect(() => {
    actions.getRooms(castleID)
  }, []);

  return (
    <div className="md:max-w-2/4">
      {rooms.length > 0 && (
        <div className="mt-4">
          <h6 className="h6 text-dark-brown flex items-center gap-0.5 pb-2"><MdOutlineKingBed />Select a room</h6>
          <div className="grid grid-cols-1 gap-4">
            {rooms.map((room, idx) => (
              <div key={idx} className="rounded-xl p-4 border border-grey/30 shadow-md">
                <h6 className="h6 pb-2">{room.name}</h6>
                <p>Capacity: {room.capacity}</p>
                <p>Beds: {room.beds.map((b, i) => (
                  <span key={i}>{b.type} x{b.count}{i < room.beds.length - 1 ? ', ' : ''}</span>
                ))}</p>
                <p>Amenities: {room.amenities.join(", ")}</p>
                <div className="border-t border-grey/30 flex justify-between items-center pt-2 mt-2">
                  <p>{room.price}€ / night</p>
                  <label key={room._id!} className="flex items-center gap-1">
                    Select this room
                    <input
                      type="checkbox"
                      checked={selectedRoom === room._id}
                      onChange={() => handleToggle(room._id)}
                      className="radio-btn"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
};