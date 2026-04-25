export default function RatingSection({ rating, hoverRating, submitting, setRating, setHoverRating }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center border border-slate-100 dark:border-slate-800 shadow-sm">
      <p className="font-bold mb-6 text-lg">Overall Experience</p>

      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" disabled={submitting} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(star)} className="transition-all hover:scale-125">
            <span
              className={`material-symbols-outlined text-5xl ${star <= (hoverRating || rating) ? "text-primary" : "text-slate-300"}`}
              style={{
                fontVariationSettings: `'FILL' ${star <= (hoverRating || rating) ? 1 : 0}`,
              }}
            >
              star
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
