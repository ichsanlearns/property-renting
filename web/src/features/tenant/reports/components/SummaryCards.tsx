import { formatRupiah } from "../../../../shared/utils/price.util";

export default function SummaryCards({ summary }: any) {
  const cards = [
    {
      label: "Total Revenue",
      value: formatRupiah(summary.totalRevenue),
      icon: "payments",
      color: "primary",
    },
    {
      label: "Total Bookings",
      value: summary.totalBookings,
      icon: "confirmation_number",
      color: "blue-500",
    },
    {
      label: "Active Properties",
      value: summary.activeProperties,
      icon: "domain",
      color: "purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg ${card.color === "primary" ? "bg-primary/10 text-primary" : `bg-${card.color}/10 text-${card.color}`}`}>
              <span className="material-symbols-outlined">{card.icon}</span>
            </div>
          </div>

          <p className="text-slate-500 text-sm font-medium">{card.label}</p>
          <p className="text-2xl font-black mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
