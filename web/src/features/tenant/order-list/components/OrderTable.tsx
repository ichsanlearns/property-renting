import { Link } from "react-router";

export default function OrderTable({ orders }: any) {
  return (
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
            {orders.map((order: any, index: number) => (
              <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">{order.code}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-200 overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={order.roomType?.roomTypeImages?.find((img: any) => img.isCover)?.imageUrl || order.roomType?.roomTypeImages?.[0]?.imageUrl || "https://via.placeholder.com/40"}
                        alt={order.property}
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
    </div>
  );
}
