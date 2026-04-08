import React, { useState } from "react";

// --- Sub-Components ---

const KPICard = ({ title, value, change, trend, progressColor, progressWidth }: any) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-[32px_0_48px_-4px_rgba(25,28,30,0.06)] group hover:translate-y-[-2px] transition-all duration-300 border border-slate-50 dark:border-slate-800">
    <div className="flex justify-between items-start mb-4">
      <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</span>
      {change && <span className="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md text-xs font-bold">{change}</span>}
    </div>
    <div className="text-3xl font-black font-headline text-slate-900 dark:text-white">{value}</div>
    <div className="mt-4 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full ${progressColor}`} style={{ width: progressWidth }}></div>
    </div>
  </div>
);

// --- Main Dashboard Component ---

export default function DashboardTenantPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-[#f8f9fb] dark:bg-slate-950 text-slate-900 dark:text-slate-100 ">
      {/* Main Content Area */}
      <main className=" flex-1">
        {/* Top Navigation Bar */}
        <header className="h-16 flex items-center sticky top-0 z-40 bg-[#f8f9fb]/80 dark:bg-slate-950/80 backdrop-blur-md justify-between px-10 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-xl">search</span>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white dark:bg-slate-900 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#b52330] w-64 shadow-sm"
              placeholder="Search analytics..."
            />
          </div>
        </header>

        <div className="px-10 py-8">
          {/* Hero Header */}
          <section className="mb-10">
            <h1 className="text-4xl font-black font-headline tracking-tight text-slate-900 dark:text-white mb-2">Welcome back, Name.</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Here's what's happening across your premium properties today.</p>
          </section>

          {/* KPI Cards Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <KPICard title="Total Revenue" value="$128,430" change="+12.5%" progressColor="bg-[#b52330]" progressWidth="75%" />
            <KPICard title="Total Bookings" value="842" change="+5.2%" progressColor="bg-blue-600" progressWidth="50%" />
            <KPICard title="Active Properties" value="12" change="" progressColor="bg-[#b52330]" progressWidth="80%" />
            <KPICard title="Avg. Occupancy" value="84%" change="+3.1%" progressColor="bg-emerald-500" progressWidth="84%" />
          </section>

          {/* Charts Row */}
          <div className="grid grid-cols-12 gap-8 mb-10">
            {/* Left Column: Revenue Chart Mock */}
            <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h3 className="font-headline font-bold text-xl mb-1">Revenue over Time</h3>
                  <p className="text-slate-500 text-sm font-medium">Financial performance across Q1-Q3</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-md">Daily</button>
                  <button className="px-4 py-1.5 bg-[#b52330] text-white text-xs font-bold rounded-md">Monthly</button>
                </div>
              </div>
              <div className="h-64 relative pt-4">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 Q10,75 20,60 T40,65 T60,40 T80,30 T100,10 L100,100 L0,100 Z" fill="rgba(181, 35, 48, 0.1)"></path>
                  <path d="M0,80 Q10,75 20,60 T40,65 T60,40 T80,30 T100,10" fill="none" stroke="#b52330" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                </svg>
              </div>
            </div>

            {/* Right Column: Spotlight */}
            <div className="col-span-12 lg:col-span-4">
              <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg flex flex-col justify-end p-8 text-white">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYYXzFHj1aJW6n8S3cBS8r5ScsqTql_umrJ3aYe-1gvm_pPaUbpIL3iKV-Q197EmKhC6J0adD4cHZDVFNWI9hYvikuLlfxoWdx_-WGGetIZedD3uw6E4CQLF2hEDs-qr2B9o-AxFtFpO2FB2_KJRsymHg8-aZM4WFEp5XvH1bj9jnYxPuBgRxhTJsyOQn2coRtp8GEj-_BcLqhDAVeXHB4Lt34FQh2TMFHSucKW4rDn-kKqMobZVw_FyA5atTC4EMxwaE3aFw-m0M')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-[#b52330] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Spotlight: High Yield</span>
                  <h4 className="text-2xl font-black font-headline mb-2">Penthouse VIII</h4>
                  <p className="text-sm text-slate-300 mb-6 font-medium">Reaching record occupancy levels this month with 98% booking rate.</p>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Monthly Rev</div>
                      <div className="text-lg font-black">$18,200</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Growth</div>
                      <div className="text-lg font-black text-emerald-400">+24%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="px-8 py-6 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
              <h3 className="font-headline font-bold text-xl">Recent Bookings</h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-lg">filter_list</span> Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto text-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-8 py-4 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Property</th>
                    <th className="px-8 py-4 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Guest</th>
                    <th className="px-8 py-4 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Dates</th>
                    <th className="px-8 py-4 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Amount</th>
                    <th className="px-8 py-4 font-bold uppercase tracking-wider text-slate-500 text-[10px] text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-8 py-5 font-bold">The Azure Loft</td>
                    <td className="px-8 py-5">David Miller</td>
                    <td className="px-8 py-5 text-slate-500">Oct 12 - Oct 15</td>
                    <td className="px-8 py-5 font-black">$1,240.00</td>
                    <td className="px-8 py-5 text-right">
                      <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">Confirmed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
