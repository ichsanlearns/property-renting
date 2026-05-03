type Props = {
  filterStatus: string;
  setFilterStatus: (v: string) => void;
  filterProperty: string;
  setFilterProperty: (v: string) => void;
  uniqueProperties: string[];
};

export default function OrderFilters({ filterStatus, setFilterStatus, filterProperty, setFilterProperty, uniqueProperties }: Props) {
  return (
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

          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined text-sm">filter_list</span>
          </button>
        </div>
      </div>
    </div>
  );
}
