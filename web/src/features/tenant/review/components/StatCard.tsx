export default function StatCard({ label, value, colorClass = "text-slate-900" }: any) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
      <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest mb-1">{label}</p>

      <p className={`text-3xl font-black ${colorClass}`}>{value}</p>
    </div>
  );
}
