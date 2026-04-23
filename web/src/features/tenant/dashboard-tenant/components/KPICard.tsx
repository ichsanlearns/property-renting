type Props = {
  title: string;
  value: string | number;
  change?: string;
  progressColor: string;
  progressWidth: string;
};

export default function KPICard({ title, value, change, progressColor, progressWidth }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-[32px_0_48px_-4px_rgba(25,28,30,0.06)] group hover:-translate-y-0.5 transition-all duration-300 border border-slate-50 dark:border-slate-800">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</span>

        {change && <span className="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md text-xs font-bold">{change}</span>}
      </div>

      <div className="text-3xl font-black font-headline text-slate-900 dark:text-white">{value}</div>

      <div className="mt-4 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${progressColor}`} style={{ width: progressWidth }} />
      </div>
    </div>
  );
}
