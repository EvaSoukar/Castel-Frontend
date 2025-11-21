import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isJsonString } from "../helper/helpers";
import type { LocationMapCoords } from "./Map/LocationMap";
import { fetchLocationFromCoords, type LocationData } from "./CastleCard";

type CarouselCardProps = {
  castle: Castle;
}
const CarouselCard = ({ castle }: CarouselCardProps) => {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [doneLoading, setdoneLoading] = useState(false);

  useEffect(() => {
    if (isJsonString(castle.address)) {
      const coords: LocationMapCoords = JSON.parse(castle.address);
      fetchLocationFromCoords(coords.lat, coords.lng).then((locData) => {
        setLocationData(locData)
        setdoneLoading(true)
      });
    }
  }, []);

  const handleClick = () => {
    navigate(`/castles/${castle._id}`)
  };
  
  return (
    <div onClick={handleClick} className="cursor-pointer min-w-40 max-w-48 lg:max-w-64 flex-shrink-0 bg-white shadow-md rounded-xl overflow-visible">
      <div className="aspect-[4/3] w-full rounded-t-xl overflow-hidden">
        <img className="h-full w-full object-cover" src={castle.images[0].url} alt={castle.images[0].name} />
      </div>
      <div className="space-y-1 p-3">
        <h6 className="h6 text-dark-brown">{castle.name}</h6>
        <div>
          {doneLoading ? (
            <span className="text-xs">{locationData?.city}, {locationData?.country}</span>
          ) : (
            <span className="text-xs text-gray-400">Loading location...</span>
          )}
        </div>
        <p className="text-xs">From {castle.rooms[0]?.price}€</p>
      </div>
    </div>
  )
};
export default CarouselCard;