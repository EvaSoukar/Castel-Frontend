import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type LocationMapCoords = {
  lat: number;
  lng: number;
};

export interface LocationMapProps {
  coords: LocationMapCoords;
  height: number;
}

export function LocationMap(props: LocationMapProps) {
  const { coords, height } = props
  return (
    <MapContainer
      center={[coords.lat, coords.lng]}
      zoom={14}
      style={{ height: `${height}px` }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[coords.lat, coords.lng]} />
    </MapContainer>
  );
}