import { useState } from "react";

import { Link } from "react-router-dom";

// --- Sub-Components ---

const PropertyCard = ({ title, location, price, rating, status, image }: any) => (
  <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 dark:border-slate-800">
    <div className="relative h-64 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 ${status === "Active" ? "bg-emerald-500/90" : "bg-blue-500/90"}`}>
        <span className={`w-2 h-2 rounded-full bg-white ${status === "Active" ? "animate-pulse" : ""}`}></span>
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
        <Link to="/tenant/detail-review">
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

// --- Main Page Component ---

export default function TenantReviewPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-[#f8f9fb] dark:bg-slate-950">
      {/* Main Content */}
      <main className=" flex-1">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex justify-between items-center w-full px-8 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-6">
            <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 w-80 items-center gap-2">
              <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none focus:ring-0 text-sm w-full" placeholder="Search properties..." />
            </div>
          </div>
        </header>

        {/* Dashboard Section */}
        <section className="p-8 max-w-7xl mx-auto">
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">My Properties</h3>
              <p className="text-slate-500 max-w-md">Overview of your current residential investments and active lease agreements.</p>
            </div>
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter
            </button>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <PropertyCard
              title="The Azure Loft"
              location="Biscayne Bay, Miami"
              price="$4,250"
              rating="4.9"
              status="Active"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDRaZKeSZC4UT6ZlXdD9XN9RPVEOQhJwUNW9FozDffkJDoRb2-I7kV9pXvmlQgUIJzFJGyd-88pOOIXfzu7-2lr_cd4LyhAosxQy1LqqBZvEacVRVFAXRGskn-wSY2zdTPp0OKfgYht6N2G8C1RVHA5lmR5Cozgl7OLlAu0a2DcCXXnM9bx7Q8K_tOScjai2d1EtqtS_3WaiHD2emrt-gci6r-7AUE4qJc0e6AKswpMJl83Ci9HelQs0TmjnW4ZyQ_T_zL6ASzU1eI"
            />
            <PropertyCard
              title="Skyline Penthouse"
              location="Upper East Side, NYC"
              price="$8,900"
              rating="4.8"
              status="Occurring"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuD-9-_zjG7Twa7uqzMNebj6BpGmdB5snPv10wUVYtOq02ujljSMDnsS_0KGwbscm7W2aFYDUO3uNx6JumDs7x-GhESkcIbnFzk6CZy2MowQYVOjx8lhaAjU01Qzcas8NRMJReUtoMDmS8RgUgM-Sctz5Rs-fUk8bZ0v3Y3xmiDUAWy3Ejfv_3wt2js0rvlYaf82nucllvYmPq6Wi28tnN-cMTFqpAJZ37d3rg3scE6PSv5_mihJ1X9VLbPrNtWviLfS8oLyOXHV71c"
            />
            <PropertyCard
              title="Ocean Breeze Villa"
              location="Malibu Coast, CA"
              price="$12,400"
              rating="5.0"
              status="Active"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuC9UEWNILwxs8aQzauuIWFIGbEBqgxgy8-0cbeJ1s7H4ckNlC9rWnABF-Wg0m8HYyFQXzsofO-2Uppm1vbPJRl97VqDbEUPTMZnX-y7tct-MCw14ZNaJ4HieETSba3c80DeivFBniA4ZrWvsAC1qPtwsFIldojx8w9HXSOl7p_VSMkvWC75fjXx6pfh3e_st-DNhjuISN5hCZwlpEGp_KAeq7AhZpn5HaiChrzYp5fvrlB-khXeuU8W0A1fQSV6UyvQwz90McJtPEA"
            />

            {/* Add New Button */}
            <div className="group border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center p-12 text-center transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">add_business</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Add New Property</h4>
              <p className="text-slate-500 text-sm px-4">Register a new asset to your portfolio and start managing leases.</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard label="Total Assets" value="03" />
            <StatCard label="Occupancy Rate" value="100%" colorClass="text-emerald-500" />
            <StatCard label="Annual Yield" value="6.4%" colorClass="text-blue-500" />
            <StatCard label="Maintenance" value="02" />
          </div>
        </section>
      </main>
    </div>
  );
}
