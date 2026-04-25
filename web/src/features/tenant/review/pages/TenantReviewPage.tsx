import LoaderFetching from "../../../../shared/ui/LoaderFetching";

import useTenantReview from "../hooks/useTenantReview";

import PropertyCard from "../components/PropertyCard";
import StatCard from "../components/StatCard";

export default function TenantReviewPage() {
  const {
    searchQuery,
    setSearchQuery,

    filteredProperties,
    isLoading,

    totalAssets,
    totalPublished,
    avgRating,
  } = useTenantReview();

  if (isLoading) return <LoaderFetching />;

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
            {filteredProperties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
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
