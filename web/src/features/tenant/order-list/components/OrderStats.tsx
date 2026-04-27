import { formatRupiah } from "../../../../shared/utils/price.util.ts";

export default function OrderStats({ totalRevenue, totalConfirmed, totalPending, totalCancelled }: any) {
  const stats = [
    {
      label: "Total Volume",
      value: formatRupiah(totalRevenue),
      icon: "analytics",
      color: "blue",
    },
    {
      label: "Confirmed",
      value: totalConfirmed,
      icon: "check_circle",
      color: "emerald",
    },
    {
      label: "Pending",
      value: totalPending,
      icon: "pending_actions",
      color: "amber",
    },
    {
      label: "Cancellations",
      value: totalCancelled,
      icon: "cancel",
      color: "rose",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-primary">
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
          </div>

          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>

          <h4 className="text-2xl font-black mt-1">{stat.value}</h4>
        </div>
      ))}
    </div>
  );
}
