import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import axios from "../api/axios";

type CastleState = {
  castles: Castle[];
  castle?: Castle;
  getCastles: () => Promise<void>;
  getCastle: (id:string) => Promise<void>;
  // actions: {
  //   createCastle: (castle: Castle) => Pronise(void);
  // }
};

// type CastleActions = CastleState["actions"];

const CastleContext = createContext<CastleState | undefined>(undefined);

const CastleProvider = ({ children }: PropsWithChildren) => {
  const [castles, setCastles] = useState<Castle[]>([]);
  const [castle, setCastle] = useState<Castle>();

  useEffect(() => {
    getCastles();
  }, []);

  const getCastles = async () => {
    const res = await axios.get("/castles");
    const data = res.data;
    setCastles(data);
  }

  const getCastle = async (id: string) => {
    const res = await axios.get(`/castles/${id}`);
    const data = res.data;
    setCastle(data);
  }

  // const actions: CastleActions = {
    
  // }

  return (
    <CastleContext.Provider value={{ castles, castle, getCastles, getCastle }}>
      { children }
    </CastleContext.Provider>
  )
};

const useCastle = () => {
  const context = useContext(CastleContext);
  if (!context) {
    throw new Error("UseCastle must be used within a CastleProvider");
  }
  return context
};

export { CastleProvider, useCastle };