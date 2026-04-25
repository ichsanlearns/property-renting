import LoaderFetching from "../../../../shared/ui/LoaderFetching";

import useDetailReview from "../hooks/useDetailReview";

import ReviewSummary from "../components/ReviewSummary";
import ReviewFilters from "../components/ReviewFilters";
import ReviewCard from "../components/ReviewCard";

export default function DetailReviewPage() {
  const {
    search,
    setSearch,

    filterStar,
    setFilterStar,

    data,
    isLoading,

    filteredReviews,
  } = useDetailReview();

  if (isLoading) return <LoaderFetching />;

  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-slate-950">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex justify-between items-center w-full px-8 py-4 border-b border-slate-100 dark:border-slate-800">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reviews..." className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm w-72" />
      </header>

      <section className="p-8 max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Property Reviews</h1>

          <div className="flex items-center gap-3">
            <div className="flex text-primary">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: i <= Math.round(data.averageRating) ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  star
                </span>
              ))}
            </div>

            <span className="text-xl font-bold">{Number(data.averageRating || 0).toFixed(1)}</span>

            <span className="text-slate-400 text-sm">• {data.totalReviews} verified reviews</span>
          </div>
        </div>

        {/* SUMMARY */}
        <ReviewSummary data={data} />

        {/* FILTER */}
        <ReviewFilters filterStar={filterStar} setFilterStar={setFilterStar} />

        {/* LIST */}
        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review: any) => <ReviewCard key={review.id} review={review} />)
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border">
              <p className="text-slate-500">No reviews found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
