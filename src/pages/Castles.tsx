import CastleCard from "../components/CastleCard";
import { useCastle } from "../contexts/CastleContext";

const Castles = () => {
  const { castles } = useCastle();

  return (
    <div className="page-margin">
      <div className="flex flex-col gap-8 items-center md:flex-row md:items-start flex-wrap">
        {castles.length && (
          castles.map(c => (
            <CastleCard key={c._id} castle={c} />
          ))
        )}
      </div>
    </div>
  )
}
export default Castles