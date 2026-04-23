import { useState } from "react";
import LoaderFetching from "../../../shared/ui/LoaderFetching";
import { formatRupiah } from "../../../shared/utils/price.util";

import useDashboardTenant from "../dashboard-tenant/hooks/useDashboardTenant";

import KPICard from "../dashboard-tenant/components/KPICard";
import RevenueChart from "../dashboard-tenant/components/RevenueCharts";
import SpotlightCard from "../dashboard-tenant/components/SpotlightCard";
import RecentBookingsTable from "../dashboard-tenant/components/RecentBookingTable";

export default function DashboardTenant() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading } = useDashboardTenant();

  if (loading) return <LoaderFetching />;

  return (
    <div className="bg-[#f8f9fb] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <main className="flex-1">
        <header className="h-16 flex items-center sticky top-0 z-40 bg-[#f8f9fb]/80 dark:bg-slate-950/80 backdrop-blur-md justify-between px-10 border-b border-slate-200/50 dark:border-slate-800/50">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white dark:bg-slate-900 rounded-lg px-4 py-2 text-sm w-64" placeholder="Search analytics..." />
        </header>

        <div className="px-10 py-8">
          <section className="mb-10">
            <h1 className="text-4xl font-black font-headline tracking-tight mb-2"> Welcome back, {data?.firstName}.</h1>

            <p className="text-slate-500 text-lg">Here's what's happening across your premium properties today.</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <KPICard title="Total Revenue" value={formatRupiah(data.totalRevenue)} change="+12.5%" progressColor="bg-[#b52330]" progressWidth="75%" />

            <KPICard title="Total Bookings" value={data.totalBookings} change="+5.2%" progressColor="bg-blue-600" progressWidth="50%" />

            <KPICard title="Active Properties" value={data.activeProperties} progressColor="bg-[#b52330]" progressWidth="80%" />

            <KPICard title="Avg. Occupancy" value={`${data.occupancyRate}%`} change="+3.1%" progressColor="bg-emerald-500" progressWidth="84%" />
          </section>

          <div className="grid grid-cols-12 gap-8 mb-10">
            <RevenueChart />
            <SpotlightCard data={data} />
          </div>

          <RecentBookingsTable bookings={data.recentBookings} />
        </div>
      </main>
    </div>
  );
}
