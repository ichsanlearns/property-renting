export default function BookingPagination({ currentPage, totalPages, setCurrentPage }: any) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="size-10 flex items-center justify-center rounded-lg border border-primary/10 hover:bg-white disabled:opacity-40">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {pages.map((page) => (
        <button key={page} onClick={() => setCurrentPage(page)} className={`size-10 rounded-lg font-bold transition-colors ${currentPage === page ? "bg-primary text-white" : "border border-primary/10 hover:bg-white"}`}>
          {page}
        </button>
      ))}

      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="size-10 flex items-center justify-center rounded-lg border border-primary/10 hover:bg-white disabled:opacity-40">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}
