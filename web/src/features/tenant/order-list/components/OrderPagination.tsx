export default function OrderPagination() {
  return (
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
  );
}
