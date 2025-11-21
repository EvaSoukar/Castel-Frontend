import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import axios from "../api/axios";
import { useAuth } from "./AuthContext";

type CastleState = {
  castles: Castle[];
  castle?: Castle;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  actions: {
    getCastles: () => Promise<void>;
    getCastle: (id: string) => Promise<void>;
    createCastle: (castle: Castle) => Promise<Castle>;
    updateCastle: (id: string, updates: Partial<Castle>) => Promise<Castle>;
    deleteCastle: (id: string) => Promise<void>
  };
};

const CastleContext = createContext<CastleState | undefined>(undefined);

const CastleProvider = ({ children }: PropsWithChildren) => {
  const [castles, setCastles] = useState<Castle[]>([]);
  const [castle, setCastle] = useState<Castle>();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    actions.getCastles();
  }, []);

  const getCastles = async () => {
    const res = await axios.get("/castles");
    setCastles(res.data);
  };

  const getCastle = async (id: string) => {
    const res = await axios.get(`/castles/${id}`);

    setCastle(res.data);
  };

  const createCastle = async (castle: Castle): Promise<Castle> => {
    if (!user || (user.role !== "owner" && user.role !== "admin"))
      throw new Error("You must be logged in to create a castle");

    try {
      const res = await axios.post("/castles", castle, {
        headers: {
          Authorization: `Bearer ${user.token}` // attach token here
        },
      });
      const newCastle = res.data;
      setCastles(prev => [...prev, newCastle]);
      return newCastle;
    } catch (err) {
      console.error("Failed to create castle:", err);
      throw err;
    }
  };

  const updateCastle = async (id: string, updates: Partial<Castle>): Promise<Castle> => {
    if (!user || (user.role !== "owner" && user.role !== "admin"))
      throw new Error("You must be logged in as an owner or admin to update a castle");

    try {
      const res = await axios.put(`/castles/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const updatedCastle = res.data;
      setCastles(prev => prev.map(c => (c._id === id ? updatedCastle : c)));
      setCastle(updatedCastle);
      return updatedCastle;
    } catch (err) {
      throw err;
    }
  };

  const deleteCastle = async (id: string): Promise<void> => {
    if (!user || (user.role !== "owner" && user.role !== "admin"))
      throw new Error("You must be logged in as an owner or admin to delete a castle");

    try {
      await axios.delete(`/castles/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setCastles(prev => prev.filter(c => c._id !== id));
      setCastle(prev => (prev?._id === id ? undefined : prev));
    } catch (err) {
      throw err;
    }
  };

  const actions: CastleState["actions"] = {
    getCastles,
    getCastle,
    createCastle,
    updateCastle,
    deleteCastle
  };

  return (
    <CastleContext.Provider value={{ castles, castle, selectedCountry, setSelectedCountry, actions }}>
      {children}
    </CastleContext.Provider>
  )
};

const useCastle = () => {
  const context = useContext(CastleContext);
  if (!context) {
    throw new Error("UseCastle must be used within a CastleProvider");
  }
  return context;
};

export { CastleProvider, useCastle };