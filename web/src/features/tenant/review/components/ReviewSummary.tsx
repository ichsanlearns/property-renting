// src/features/tenant/review/components/ReviewSummary.tsx

export default function ReviewSummary({ data }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 mb-8">
      <p className="text-sm text-slate-500 mb-2">Overall Rating</p>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl font-black">{Number(data.averageRating || 0).toFixed(1)}</span>

        <span className="material-symbols-outlined text-[#ffb300] text-2xl">star</span>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full"
          style={{
            width: `${(Number(data.averageRating || 0) / 5) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
