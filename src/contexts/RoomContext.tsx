import { createContext, useContext, useState, type PropsWithChildren } from "react";
import { useAuth } from "./AuthContext";
import axios from "../api/axios";

type RoomState = {
  rooms: Room[];
  room?: Room;
  actions: {
    getRooms: (castleId: string) => Promise<void>;
    getRoom: (castleId: string, roomId: string) => Promise<void>;
    createRoom: (castleId: string, room: Partial<Room>) => Promise<Room>;
    updateRoom: (castleId: string, roomId: string, updates: Partial<Room>) => Promise<Room>;
    deleteRoom: (castleId: string, roomId: string) => Promise<void>;
  };
};

const RoomContext = createContext<RoomState | undefined>(undefined);

const RoomProvider = ({ children }: PropsWithChildren) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [room, setRoom] = useState<Room>();
  const { user } = useAuth();

  const getRooms = async (castleId: string) => {
    const res = await axios.get(`/castles/${castleId}/rooms`);
    setRooms(res.data);
  };

  const getRoom = async (castleId: string, roomId: string) => {
    const res = await axios.get(`/castles/${castleId}/rooms/${roomId}`);
    setRoom(res.data);
  };

  const createRoom = async (castleId: string, newRoom: Partial<Room>): Promise<Room> => {
    if (!user || (user.role !== "owner" && user.role !== "admin")) throw new Error("You must be logged in as owner or admin to create a room");
    // Add headers token
    const res = await axios.post(`/castles/${castleId}/rooms`, newRoom);
    setRooms(prev => [...prev, res.data]);
    return res.data;
  };

  const updateRoom = async (castleId: string, roomId: string, updates: Partial<Room>): Promise<Room> => {
    if (!user || (user.role !== "owner" && user.role !== "admin")) throw new Error("You must be logged in as owner or admin to update a room");
    // Add headers token
    const res = await axios.put(`/castles/${castleId}/rooms/${roomId}`, updates);
    setRooms(prev => prev.map(r => r._id === roomId ? res.data : r));
    setRoom(res.data);
    return res.data;
  };

  const deleteRoom = async (castleId: string, roomId: string): Promise<void> => {
    if (!user || (user.role !== "owner" && user.role !== "admin")) 
      throw new Error("You must be logged in as owner or admin to delete a room");
    // Add headers token
    await axios.delete(`/castles/${castleId}/rooms/${roomId}`);
    setRooms(prev => prev.filter(r => r._id !== roomId));
  };

  const actions: RoomState["actions"] = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
  };

    return (
    <RoomContext.Provider value={{ rooms, room, actions }}>
      { children }
    </RoomContext.Provider>
  );
};

const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("UseRoom must be used within a RoomProvider");
  }
  return context;
};

export { RoomProvider, useRoom };