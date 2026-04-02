import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";

function Reports() {
  const summaryCards = [
    {
      label: "Total Revenue",
      value: "$128,430.00",
      trend: "+12.5%",
      icon: "payments",
      color: "primary",
    },
    {
      label: "Total Bookings",
      value: "842",
      trend: "+5.2%",
      icon: "confirmation_number",
      color: "blue-500",
    },
    {
      label: "Active Properties",
      value: "12",
      trend: "0%",
      icon: "domain",
      color: "purple-500",
    },
    {
      label: "Avg. Occupancy Rate",
      value: "84%",
      trend: "+3.1%",
      icon: "percent",
      color: "amber-500",
    },
  ];

  const propertySales = [
    {
      name: "Skyline Penthouse",
      bookings: 156,
      revenue: "$34,200.00",
      avg: "$219.23",
      status: "High Yield",
      imgId: 8,
    },
    {
      name: "Ocean Breeze Villa",
      bookings: 204,
      revenue: "$48,960.00",
      avg: "$240.00",
      status: "Popular",
      imgId: 9,
    },
    {
      name: "Mountain Retreat",
      bookings: 92,
      revenue: "$18,400.00",
      avg: "$200.00",
      status: "Stable",
      imgId: 10,
    },
    {
      name: "Urban Loft Studio",
      bookings: 188,
      revenue: "$22,560.00",
      avg: "$120.00",
      status: "High Volume",
      imgId: 11,
    },
  ];

  const revenueData = [
    { date: "01 Oct", revenue: 4000 },
    { date: "07 Oct", revenue: 3000 },
    { date: "14 Oct", revenue: 5000 },
    { date: "21 Oct", revenue: 4000 },
    { date: "28 Oct", revenue: 6000 },
  ];

  const bookingData = [
    { name: "Skyline", bookings: 156 },
    { name: "Ocean", bookings: 204 },
    { name: "Mountain", bookings: 92 },
    { name: "Urban", bookings: 188 },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8 font-display">
      {/* Page Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Sales Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Detailed overview of your rental performance and revenue.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            Last 30 Days
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">home</span>
            All Properties
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${card.color === "primary" ? "bg-primary/10 text-primary" : `bg-${card.color}/10 text-${card.color}`}`}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <span className={`text-sm font-bold flex items-center px-2 py-1 rounded-full ${card.trend === "0%" ? "bg-slate-100 dark:bg-slate-800 text-slate-500" : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500"}`}>
                {card.trend}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{card.label}</p>
            <p className="text-2xl font-black mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Revenue Chart Widget */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Revenue over Time</h3>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-xs text-slate-500">Revenue</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#ff5c61" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Chart Widget */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Bookings per Property</h3>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer">more_horiz</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#ff5c61" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-lg">Sales by Property</h3>
          <button className="text-sm font-semibold text-primary hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Property Name</th>
                <th className="px-6 py-4">Total Bookings</th>
                <th className="px-6 py-4">Total Revenue</th>
                <th className="px-6 py-4">Avg. Price/Booking</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {propertySales.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg bg-slate-200 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('http://googleusercontent.com/profile/picture/${item.imgId}')`,
                        }}
                      ></div>
                      <span className="text-sm font-bold">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{item.bookings}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{item.revenue}</td>
                  <td className="px-6 py-4 text-sm">{item.avg}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${
                        item.status === "Stable"
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-500"
                          : item.status === "High Volume"
                            ? "bg-amber-100 dark:bg-amber-500/10 text-amber-600"
                            : "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
