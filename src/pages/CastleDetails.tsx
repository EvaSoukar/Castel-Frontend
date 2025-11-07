import { useParams } from "react-router-dom"
import { useCastle } from "../contexts/CastleContext";
import { useEffect } from "react";

const CastleDetails = () => {
  const { castleId } = useParams();
  const { castle, getCastle } = useCastle();

  useEffect(() => {
    if (castleId) {
      getCastle(castleId);
    }
  }, []);
  if (!castle) return;
  return (
    <div>
      {castle.images.map(img => (
        <img className="max-h-52 h-full object-cover" src={img.url} alt={img.name} />
      ))}
      <h1>{castle.name}</h1>
    </div>
  )
}
export default CastleDetails