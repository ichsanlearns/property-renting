import { Link } from "react-router-dom";
import { formatRupiah } from "../../../../shared/utils/price.util";

export default function PropertyCard({ property }: any) {
  const cover = property.coverImage || "https://via.placeholder.com/600x400";

  const cheapestRoom = property.roomTypes?.[0];

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 dark:border-slate-800">
      <div className="relative h-64 overflow-hidden">
        <img src={cover} alt={property.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

        <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 ${property.isPublished ? "bg-emerald-500/90" : "bg-blue-500/90"}`}>
          <span className="w-2 h-2 rounded-full bg-white"></span>

          <span className="text-[10px] font-bold text-white uppercase tracking-wider">{property.isPublished ? "Published" : "Draft"}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">{property.name}</h4>

          <div className="flex items-center gap-1">
            <span
              className="material-symbols-outlined text-[#ffb300] text-lg"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              star
            </span>

            <span className="text-sm font-bold text-slate-900 dark:text-white">{property.averageRating ? property.averageRating : "0.0"}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 mb-6">
          <span className="material-symbols-outlined text-sm">location_on</span>

          <span className="text-sm font-medium">
            {property.city}, {property.country}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Monthly Rent</p>

            <p className="text-lg font-black text-primary">{formatRupiah(Number(cheapestRoom?.basePrice || 0))}</p>
          </div>

          <Link to={`/tenant/detail-review/${property.id}`}>
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#92001b] transition-all active:scale-95">Manage</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
