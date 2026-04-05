import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

type Location = {
  lat: number;
  lng: number;
};

export default function MapPicker({
  onSelect,
}: {
  onSelect: (loc: Location) => void;
}) {
  const [position, setPosition] = useState<Location | null>(null);

  function MapClickHandler() {
    useMapEvents({
      click(e: any) {
        const { lat, lng } = e.latlng;

        setPosition({ lat, lng });
        onSelect({ lat, lng });
      },
    });

    return position ? <Marker position={position} /> : null;
  }

  return (
    <MapContainer
      // @ts-ignore
      center={[-6.9, 107.6]}
      zoom={13}
      className="h-[300px] w-full rounded-xl"
    >
      <TileLayer
        // @ts-ignore
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
    </MapContainer>
  );
}
