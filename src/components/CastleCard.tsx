import { useNavigate } from "react-router-dom";
import type { LocationMapCoords } from "./Map/LocationMap";
import { useEffect, useState } from "react";
import { isJsonString } from "../helper/helpers";

type CastleCardProps = {
  castle: Castle;
}

export interface LocationData {
  country?: string;
  country_code?: string;
  city?: string;
  town?: string;
  village?: string;
  road?: string;
  postcode?: string;
  [key: string]: any;
};

export async function fetchLocationFromCoords(
  lat: number,
  lng: number
): Promise<LocationData | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?` +
      new URLSearchParams({
        lat: lat.toString(),
        lon: lng.toString(),
        format: "json",
        addressdetails: "1",
      });

    const res = await fetch(url, {
      headers: { "User-Agent": "myapp-example/1.0" },
    });

    if (!res.ok) return null;

    const data = await res.json();

    const { address } = data;
    if (!address) return null;

    return {
      country: address.country,
      country_code: address.country_code,
      city: address.city,
      town: address.town,
      village: address.village,
      road: address.road,
      postcode: address.postcode,
    };
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return null;
  }
};

const CastleCard = ({ castle }: CastleCardProps) => {
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
    navigate(`/castles/${castle._id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer max-w-80 w-full flex flex-col gap-2 shadow-xl rounded-md overflow-hidden">
      <img className="max-h-52 h-full object-cover" src={castle.images[0].url} alt={castle.images[0].name} />
      <div className="px-4 space-y-4">
        <div>
          <h5 className="h5">{castle.name}</h5>
            {doneLoading ? (
            <span className="text-xs">{locationData?.city}, {locationData?.country}</span>
            ) : (
            <span className="text-xs text-gray-400">Loading location...</span>
            )}
        </div>
        <p className="line-clamp-2">{castle.description}</p>
        <div className="w-full border-b-1 border-dark-brown mx-auto"></div>
        <div className="flex justify-between items-center pb-4">
          <p>{castle.rooms[0]?.price} €</p>
          <button className="primary-btn">Read more</button>
        </div>
      </div>
    </div>
  )
};
export default CastleCard;