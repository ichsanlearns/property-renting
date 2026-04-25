export default function BookingFilters({ search, setSearch, statusFilter, setStatusFilter }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-primary/5 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5">
          <div className="relative group flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Booking ID..."
              type="text"
              className="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm appearance-none outline-none"
            >
              <option value="">All Statuses</option>
              <option>Waiting for Payment</option>
              <option>Waiting for Confirmation</option>
              <option>Confirmed</option>
              <option>Ready to Review</option>
              <option>Cancelled</option>
              <option>Completed</option>
            </select>

            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">expand_more</span>
          </div>
        </div>

        <div className="md:col-span-1">
          <button className="w-full h-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors py-2.5">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>
    </div>
  );
}
