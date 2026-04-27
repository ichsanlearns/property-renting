export default function TablePagination({ currentPage, totalPages, setCurrentPage }: any) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
      {/* Previous */}
      <button
        onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Number Pages */}
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

      {/* Next */}
      <button
        onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
