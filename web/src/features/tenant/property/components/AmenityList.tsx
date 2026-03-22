import type { Amenity } from "../types/amenity.type";
import { useAmenities } from "../hooks/useAmenities";

function AmenityList({
  selectedAmenities,
  onChange,
  type,
}: {
  selectedAmenities: string[];
  onChange: (value: string[]) => void;
  type: "PROPERTY" | "ROOM";
}) {
  const { data: amenities = [], isLoading, error } = useAmenities(type);

  const handleAmenityClick = (amenityId: string) => {
    onChange(
      selectedAmenities.includes(amenityId)
        ? selectedAmenities.filter((id) => id !== amenityId)
        : [...selectedAmenities, amenityId],
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      {amenities.map((amenity: Amenity) => (
        <button
          type="button"
          key={amenity.id}
          onClick={() => handleAmenityClick(amenity.id)}
          className={`group flex flex-col items-center gap-3 p-5 rounded-2xl text-white   transition-all ${selectedAmenities.includes(amenity.id) ? "bg-primary text-white shadow-primary/20 shadow-xl" : "bg-primary-20 hover:bg-white text-slate-500 border-slate-100 hover:border-primary/30 border-3"}`}
        >
          <span
            className={`material-symbols-outlined text-3xl  ${selectedAmenities.includes(amenity.id) ? "text-white" : "text-slate-500 group-hover:text-primary"}`}
          >
            {amenity.icon}
          </span>
          <span
            className={` text-[10px] font-bold uppercase tracking-widest ${selectedAmenities.includes(amenity.id) ? "text-white" : "text-slate-500 group-hover:text-primary"}`}
          >
            {amenity.name}
          </span>
        </button>
      ))}
    </>
  );
}

export default AmenityList;
