import type { GetPropertyAllBasicResponse } from "../../tenant/property/api/property.response";
import { useNavigate } from "react-router-dom";

function PropertyCard({
  properties,
  page,
}: {
  properties: GetPropertyAllBasicResponse;
  page?: "search" | "home";
}) {
  const navigate = useNavigate();
  const handleCardClick = (id: string) => {
    navigate(`/property/${id}`);
  };

  return properties?.map((property) => (
    <div
      onClick={() => handleCardClick(property.id)}
      key={property.id}
      className="group cursor-pointer"
    >
      <div
        className={`relative ${page === "search" ? "aspect-4/3" : "aspect-4/5"} rounded-3xl overflow-hidden transition-all duration-300 transform group-hover:scale-[1.02]`}
      >
        <img
          alt="Modern wood cabin"
          className="w-full h-full object-cover"
          data-alt="Architectural wood and glass cabin nestled in a snowy pine forest with warm interior lights glowing against the blue dusk"
          src={property.coverImage}
        />
        {/* <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors">
                  <span
                    className="material-symbols-outlined text-white group-hover:text-[#ff5c61]"
                    data-icon="favorite"
                  >
                    favorite
                  </span>
                </button> */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-white/30">
            Rare find
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="font-bold text-on-surface text-lg">{property.name}</h3>
          <p className="text-on-surface-variant text-sm">
            {property.city}, {property.country}
          </p>
          <p className="mt-2 font-bold text-[#ff5c61]">
            Rp. {property.price}
            <span className="text-on-surface-variant font-normal">/ night</span>
          </p>
        </div>
        {property.averageRating && (
          <div className="flex items-center gap-1 h-fit">
            <span
              className="material-symbols-outlined text-sm"
              data-icon="star"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-sm font-bold">{property.averageRating}</span>
          </div>
        )}
      </div>
    </div>
  ));
}

export default PropertyCard;
