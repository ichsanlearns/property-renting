import { useState } from "react";
import { Link } from "react-router-dom";
import { usePropertyByTenantId } from "../../property/hooks/useProperty";
import LoaderFetching from "../../../../shared/ui/LoaderFetching";
import { formatRupiah } from "../../../../shared/utils/price.util";

const PropertyCard = ({ title, location, price, rating, status, image, id }: any) => (
  <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 dark:border-slate-800">
    <div className="relative h-64 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

      <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 ${status === "Published" ? "bg-emerald-500/90" : "bg-blue-500/90"}`}>
        <span className="w-2 h-2 rounded-full bg-white"></span>
        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{status}</span>
      </div>
    </div>

    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h4>

        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[#ffb300] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-slate-500 mb-6">
        <span className="material-symbols-outlined text-sm">location_on</span>
        <span className="text-sm font-medium">{location}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Monthly Rent</p>
          <p className="text-lg font-black text-primary">{price}</p>
        </div>

        <Link to={`/tenant/detail-review/${id}`}>
          <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#92001b] transition-all active:scale-95">Manage</button>
        </Link>
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, colorClass = "text-slate-900" }: any) => (
  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
    <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest mb-1">{label}</p>
    <p className={`text-3xl font-black ${colorClass}`}>{value}</p>
  </div>
);

export default function TenantReviewPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: properties, isLoading } = usePropertyByTenantId();

  if (isLoading) return <LoaderFetching />;

  const filteredProperties = properties?.filter((property: any) => property.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];

  const totalAssets = properties?.length || 0;

  const totalPublished = properties?.filter((item: any) => item.isPublished).length || 0;

  const avgRating = properties && properties.length > 0 ? (properties.reduce((acc: number, item: any) => acc + Number(item.averageRating || 0), 0) / properties.length).toFixed(1) : "0.0";

  return (
    <div className="flex min-h-screen bg-[#f8f9fb] dark:bg-slate-950">
      <main className="flex-1">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex justify-between items-center w-full px-8 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-6">
            <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 w-80 items-center gap-2">
              <span className="material-symbols-outlined text-slate-400 text-sm">search</span>

              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none focus:ring-0 text-sm w-full" placeholder="Search properties..." />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <section className="p-8 max-w-7xl mx-auto">
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">My Properties</h3>

              <p className="text-slate-500 max-w-md">Overview of your properties and guest reviews.</p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProperties.map((property: any) => {
              const cover = property.coverImage || "https://via.placeholder.com/600x400";

              const cheapestRoom = property.roomTypes?.[0];

              return (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.name}
                  location={`${property.city}, ${property.country}`}
                  price={formatRupiah(Number(cheapestRoom?.basePrice || 0))}
                  rating={property.averageRating ? property.averageRating : "0.0"}
                  status={property.isPublished ? "Published" : "Draft"}
                  image={cover}
                />
              );
            })}
          </div>

          {/* STATS */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard label="Total Assets" value={totalAssets} />
            <StatCard label="Published" value={totalPublished} colorClass="text-emerald-500" />
            <StatCard label="Average Rating" value={avgRating} colorClass="text-blue-500" />
            <StatCard label="Draft" value={totalAssets - totalPublished} />
          </div>
        </section>
      </main>
    </div>
  );
}
