import { Link } from "react-router";
import { useEffect, useState } from "react";
import api from "../../../../api/client.ts";
import { format } from "date-fns";
import { formatRupiah } from "../../../../shared/utils/price.util.ts";
import LoaderFetching from "../../../../shared/ui/LoaderFetching.tsx";

function OrderList() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterProperty, setFilterProperty] = useState("ALL");
  const uniqueProperties = ["ALL", ...new Set(orders.map((o) => o.property))];

  const filteredOrders = orders.filter((order) => {
    const matchStatus = filterStatus === "ALL" || order.status === filterStatus;

    const matchProperty = filterProperty === "ALL" || order.property === filterProperty;

    return matchStatus && matchProperty;
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/reservations/tenant");

        const mapped = res.data.data.map((item: any) => {
          let status = "";
          let statusClass = "";

          switch (item.status) {
            case "WAITING_PAYMENT":
              status = "Waiting Payment";
              statusClass = "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
              break;
            case "WAITING_CONFIRMATION":
              status = "Waiting Confirmation";
              statusClass = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
              break;
            case "PAID":
              status = "Confirmed";
              statusClass = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
              break;
            case "CANCELED":
              status = "Cancelled";
              statusClass = "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
              break;
            default:
              status = item.status;
              statusClass = "bg-slate-100 text-slate-600";
          }

          return {
            id: item.id,
            code: item.reservationCode,
            property: item.roomType.property.name,
            room: item.roomNameSnapshot,
            guest: item.customer?.name || "Guest",
            checkIn: format(new Date(item.checkInDate), "MMM dd, yyyy"),
            checkOut: format(new Date(item.checkOutDate), "MMM dd, yyyy"),
            price: formatRupiah(Number(item.totalAmount)),
            status,
            statusClass,
            paymentProof: item.paymentProof,
            roomType: item.roomType,
          };
        });

        setOrders(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((acc, o) => {
    if (o.status === "Confirmed") {
      return acc + Number(o.price.replace(/[^\d]/g, ""));
    }
    return acc;
  }, 0);

  const totalConfirmed = orders.filter((o) => o.status === "Confirmed").length;
  const totalPending = orders.filter((o) => o.status === "Waiting Payment" || o.status === "Waiting Confirmation").length;
  const totalCancelled = orders.filter((o) => o.status === "Cancelled").length;

  if (loading) {
    return <LoaderFetching />;
  }

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
            {["ALL", "Waiting Payment", "Waiting Confirmation", "Confirmed", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-4 py-1.5 text-sm rounded-md ${filterStatus === tab ? "bg-white dark:bg-slate-700 shadow-sm text-primary font-semibold" : "text-slate-600 dark:text-slate-400"}`}
              >
                {tab === "ALL" ? "All" : tab}
              </button>
            ))}
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-3">
            <select value={filterProperty} onChange={(e) => setFilterProperty(e.target.value)} className="text-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg">
              {uniqueProperties.map((prop) => (
                <option key={prop} value={prop}>
                  {prop === "ALL" ? "All Properties" : prop}
                </option>
              ))}
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
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">{order.code}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-slate-200 overflow-hidden shrink-0">
                        <img
                          className="w-full h-full object-cover"
                          src={order.roomType?.roomTypeImages?.find((img: any) => img.isCover)?.imageUrl || order.roomType?.roomTypeImages?.[0]?.imageUrl || "https://via.placeholder.com/40"}
                          alt={order.propertyNameSnapshot}
                        />
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
                      <Link to={`/tenant/paymentproof/${order.code}`}>
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
            value: formatRupiah(totalRevenue),
            trend: "+12.5%",
            icon: "analytics",
            color: "blue",
          },
          {
            label: "Confirmed",
            value: totalConfirmed,
            trend: "+4.2%",
            icon: "check_circle",
            color: "emerald",
          },
          {
            label: "Pending",
            value: totalPending,
            trend: "Alert",
            icon: "pending_actions",
            color: "amber",
          },
          {
            label: "Cancellations",
            value: totalCancelled,
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
