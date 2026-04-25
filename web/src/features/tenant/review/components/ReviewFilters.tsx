export default function ReviewFilters({ filterStar, setFilterStar }: any) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-4 flex flex-wrap gap-3 mb-8">
      {["ALL", "5", "4", "3", "2", "1"].map((item) => (
        <button key={item} onClick={() => setFilterStar(item)} className={`px-4 py-2 text-xs font-bold rounded-lg ${filterStar === item ? "bg-primary text-white" : "bg-white dark:bg-slate-800 text-slate-500"}`}>
          {item === "ALL" ? "All Reviews" : `${item} ★`}
        </button>
      ))}
    </div>
  );
}
