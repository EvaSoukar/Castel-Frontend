import { MdOutlineEvent, MdOutlineLocationOn } from "react-icons/md";
import CastleCard from "../components/CastleCard";
import { useCastle } from "../contexts/CastleContext"

const Castles = () => {

  const { castles } = useCastle();

  return (
    <div className="page-margin">
      <header className="mt-6 space-y-2 pb-4">
        <h3 className="h3">Showing results for:</h3>
        <p className="flex gap-1 items-center"><MdOutlineLocationOn /> Scandinavia</p>
        <p className="flex gap-1 items-center"><MdOutlineEvent /> Dec 12 2025 - Dec 18 2025</p>
        <div className="flex justify-between items-center">
          <p>34 found</p>
          <button className="outline-btn">Filter</button>
        </div>
      </header>
      <div className="flex flex-col gap-8 items-center md:flex-row md:items-start flex-wrap">
        {
          castles.length > 0 && 
            castles.map(castle => (
              <CastleCard castle={castle} />
            ))
        }
      </div>
    </div>
  )
}
export default Castles