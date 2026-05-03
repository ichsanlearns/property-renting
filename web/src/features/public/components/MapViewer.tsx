import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../../shared/utils/price.util";

type Location = {
  lat: number;
  lng: number;
  label?: string;
  price?: number;
  id: string;
};

export default function MapViewer({ locations }: { locations: Location[] }) {
  const navigate = useNavigate();

  return (
    <MapContainer
      center={
        locations.length > 0
          ? [locations[0].lat, locations[0].lng]
          : [-6.9, 107.6]
      }
      zoom={13}
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]}>
          <Popup>
            <button
              onClick={() => navigate(`/property/${loc.id}`)}
              className="text-left w-full cursor-pointer"
            >
              {loc.label && <p className="font-semibold">{loc.label}</p>}

              {loc.price !== undefined && (
                <p className="text-sm text-primary">
                  {formatRupiah(loc.price)}
                </p>
              )}
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
