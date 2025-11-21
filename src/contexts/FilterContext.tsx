import { createContext, useContext, useState, type PropsWithChildren } from "react";
import axios from "../api/axios";

type FilterState = {
  selectedCountry: string;
  selectedCheckInDate: string | null;
  selectedCheckOutDate: string | null;
  selectedGuestsCount: number;
  setSelectedCountry: (country: string) => void;
  setSelectedCheckInDate: (date: string | null) => void;
  setSelectedCheckOutDate: (date: string | null) => void;
  setSelectedGuestsCount: (count: number) => void;
  actions: {
    getAvailableRooms: (castleId: string, checkInDate: string | null, checkOutDate: string | null, guests: number) => Promise<Room[]>;
  };
};

const FilterContext = createContext<FilterState | undefined>(undefined);

const FilterProvider = ({ children }: PropsWithChildren) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCheckInDate, setSelectedCheckInDate] = useState<string | null>(null);
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState<string | null>(null);
  const [selectedGuestsCount, setSelectedGuestsCount] = useState<number>(0);

  const getAvailableRooms = async (castleId: string, checkInDate: string | null, checkOutDate: string | null, guests: number): Promise<Room[]> => {
    if (!checkInDate && !checkOutDate && !guests) {
      return [];
    }
    console.log("+++++", checkInDate, checkOutDate, guests)
    const response = await axios.get(
      `/castles/${castleId}/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}`
    );

    console.log("!!!!##", response.data)
    return response.data;
  }

  const actions: FilterState["actions"] = {
    getAvailableRooms,
  }

  return (
    <FilterContext.Provider value={{
      selectedCountry,
      selectedCheckInDate,
      selectedCheckOutDate,
      selectedGuestsCount,
      setSelectedCountry,
      setSelectedCheckInDate,
      setSelectedCheckOutDate,
      setSelectedGuestsCount,
      actions,
    }}>
      {children}
    </FilterContext.Provider>
  )
};

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("UseFilter must be used within a FilterProvider");
  }
  return context;
};

export { FilterProvider, useFilter };