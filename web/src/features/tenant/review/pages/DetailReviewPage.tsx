import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import api from "../../../../api/client";
import { useQuery } from "@tanstack/react-query";
import LoaderFetching from "../../../../shared/ui/LoaderFetching";

const ReviewCard = ({ review }: { review: any }) => {
  const [openReply, setOpenReply] = useState(false);
  const [reply, setReply] = useState("");

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl border border-slate-50 dark:border-slate-800">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="shrink-0">
          <img src={review.customer?.profileImage || "https://ui-avatars.com/api/?name=Guest"} alt="avatar" className="w-14 h-14 rounded-full object-cover border border-slate-100" />
        </div>

        <div className="grow">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white inline-block mr-2">{review.customer?.firstName || "Guest"}</h4>

              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600">Verified Guest</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex text-primary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined text-sm"
                    style={{
                      fontVariationSettings: star <= review.rating ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    star
                  </span>
                ))}
              </div>

              <span className="text-xs text-slate-400 font-medium">{format(new Date(review.createdAt), "dd MMM yyyy")}</span>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{review.comment}</p>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <button onClick={() => setOpenReply(!openReply)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 text-primary font-bold rounded-lg text-xs hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">reply</span>
              Reply
            </button>
          </div>

          {openReply && (
            <div className="mt-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
              <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write your reply..." className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />

              <div className="flex justify-end mt-3">
                <button
                  onClick={() => {
                    console.log(reply);
                    setReply("");
                    setOpenReply(false);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-xs"
                >
                  Send Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function DetailReviewPage() {
  const { propertyId } = useParams();

  const [search, setSearch] = useState("");
  const [filterStar, setFilterStar] = useState("ALL");

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", propertyId],
    queryFn: async () => {
      const res = await api.get(`/reviews/property/${propertyId}`);
      return res.data.data;
    },
    enabled: !!propertyId,
  });

  const reviews = data?.reviews || [];

  const filteredReviews = useMemo(() => {
    return reviews.filter((item: any) => {
      const matchSearch = item.comment.toLowerCase().includes(search.toLowerCase()) || item.customer?.firstName?.toLowerCase().includes(search.toLowerCase());

      const matchStar = filterStar === "ALL" ? true : item.rating === Number(filterStar);

      return matchSearch && matchStar;
    });
  }, [reviews, search, filterStar]);

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

        {/* FILTER */}
        <div className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-4 flex flex-wrap gap-3 mb-8">
          {["ALL", "5", "4", "3", "2", "1"].map((item) => (
            <button key={item} onClick={() => setFilterStar(item)} className={`px-4 py-2 text-xs font-bold rounded-lg ${filterStar === item ? "bg-primary text-white" : "bg-white dark:bg-slate-800 text-slate-500"}`}>
              {item === "ALL" ? "All Reviews" : `${item} ★`}
            </button>
          ))}
        </div>

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
