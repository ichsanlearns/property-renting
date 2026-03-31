import { Link } from "react-router";

function OrderList() {
  const orders = [
    {
      id: "#BK-9021",
      property: "Skyline Penthouse",
      room: "Master Suite 01",
      guest: "Sarah Jenkins",
      checkIn: "Oct 24, 2023",
      checkOut: "Oct 28, 2023",
      price: "$1,420.00",
      status: "Waiting Payment",
      statusClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      id: "#BK-8842",
      property: "Sunset Villa",
      room: "Ocean View A",
      guest: "Michael Ross",
      checkIn: "Oct 20, 2023",
      checkOut: "Oct 25, 2023",
      price: "$2,850.00",
      status: "Waiting Confirmation",
      statusClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      id: "#BK-8751",
      property: "Garden Studio",
      room: "Standard Room",
      guest: "Emily Blunt",
      checkIn: "Oct 18, 2023",
      checkOut: "Oct 19, 2023",
      price: "$185.00",
      status: "Confirmed",
      statusClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    {
      id: "#BK-8519",
      property: "Skyline Penthouse",
      room: "Guest Suite 04",
      guest: "John Doe",
      checkIn: "Oct 15, 2023",
      checkOut: "Oct 17, 2023",
      price: "$640.00",
      status: "Cancelled",
      statusClass: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    },
  ];

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Order Management</h2>
        <p className="text-slate-500 mt-1">Manage and monitor all tenant bookings and payments across your property portfolio.</p>
      </div>

      {/* Filters Area */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto max-w-full">
            <button className="px-4 py-1.5 text-sm font-semibold rounded-md bg-white dark:bg-slate-700 shadow-sm text-primary">All</button>
            {["Waiting Payment", "Waiting Confirmation", "Confirmed", "Cancelled"].map((tab) => (
              <button key={tab} className="px-4 py-1.5 text-sm font-medium rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900">
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-3">
            <select className="text-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg focus:ring-primary focus:border-primary">
              <option>All Properties</option>
              <option>Skyline Penthouse</option>
              <option>Sunset Villa</option>
              <option>Garden Studio</option>
            </select>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_today</span>
              <input className="pl-9 pr-4 py-2 text-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg w-48" readOnly type="text" defaultValue="Oct 12 - Oct 19, 2023" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                {["Booking ID", "Property", "Room", "Guest Name", "Check-in", "Check-out", "Total Price", "Status", "Actions"].map((header) => (
                  <th key={header} className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${header === "Actions" ? "text-right" : ""}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-slate-200 overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" src={`https://picsum.photos/seed/${index}/40/40`} alt={order.property} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{order.property}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.room}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.guest}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.checkOut}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">{order.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${order.statusClass}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to="/tenant/paymentproof">
                        <button className="px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 rounded-md">Review</button>
                      </Link>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 material-symbols-outlined">visibility</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-700 dark:text-slate-300">1</span> to <span className="font-medium text-slate-700 dark:text-slate-300">4</span> of{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">12</span> bookings
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-md text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 text-sm bg-primary text-white rounded-md">1</button>
            <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50">2</button>
            <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        {[
          {
            label: "Total Volume",
            value: "$45,210.00",
            trend: "+12.5%",
            icon: "analytics",
            color: "blue",
          },
          {
            label: "Confirmed",
            value: "128",
            trend: "+4.2%",
            icon: "check_circle",
            color: "emerald",
          },
          {
            label: "Pending",
            value: "14",
            trend: "Alert",
            icon: "pending_actions",
            color: "amber",
          },
          {
            label: "Cancellations",
            value: "8",
            trend: "-1.1%",
            icon: "cancel",
            color: "rose",
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`size-10 rounded-full flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase ${stat.trend.includes("-") ? "text-rose-500" : "text-emerald-500"}`}>{stat.trend}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-2xl font-black mt-1">{stat.value}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
