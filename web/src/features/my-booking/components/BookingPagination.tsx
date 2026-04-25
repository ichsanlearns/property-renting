export default function BookingPagination() {
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button className="size-10 flex items-center justify-center rounded-lg border border-primary/10 hover:bg-white transition-colors">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>

      <button className="size-10 flex items-center justify-center rounded-lg border border-primary/10 hover:bg-white transition-colors">2</button>

      <button className="size-10 flex items-center justify-center rounded-lg border border-primary/10 hover:bg-white transition-colors">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}
