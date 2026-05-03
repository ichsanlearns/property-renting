export default function OrderPagination({ currentPage, totalPages, setCurrentPage, totalData, itemsPerPage }: any) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalData);

  return (
    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
      <p className="text-sm text-slate-500">
        Showing <span className="font-bold text-slate-700">{start}</span> to <span className="font-bold text-slate-700">{end}</span> of <span className="font-bold text-slate-700">{totalData}</span> bookings
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev: number) => prev - 1)}
          disabled={currentPage === 1}
          className="px-4 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;

          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`size-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                currentPage === page ? "bg-primary text-white shadow-md scale-105" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage((prev: number) => prev + 1)}
          disabled={currentPage === totalPages}
          className="px-4 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
