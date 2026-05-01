import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../../../api/client";

export default function PropertyReviewSection({ propertyId }: { propertyId: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/property/${propertyId}`);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return (
      <section className="border-b border-primary/10 pb-8 mb-8">
        <p className="text-sm text-slate-400">Loading reviews...</p>
      </section>
    );
  }

  if (!data || data.reviews.length === 0) {
    return (
      <section className="border-b border-primary/10 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <p className="text-slate-500">No reviews yet.</p>
      </section>
    );
  }

  return (
    <section className="border-b border-primary/10 pb-8 mb-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          star
        </span>

        <h2 className="text-2xl font-bold">
          {Number(data.averageRating).toFixed(1)} · {data.totalReviews} Reviews
        </h2>
      </div>

      {/* Review List */}
      <div className="grid md:grid-cols-2 gap-6">
        {data.reviews.map((review: any) => (
          <div key={review.id} className="space-y-4">
            {/* User */}
            <div className="flex items-center gap-3">
              <img src={review.customer?.profileImage || `https://ui-avatars.com/api/?name=${review.customer?.firstName || "Guest"}`} className="w-12 h-12 rounded-full object-cover" />

              <div>
                <h4 className="font-bold">{review.customer?.firstName || "Guest"}</h4>

                <p className="text-sm text-slate-400">{format(new Date(review.createdAt), "dd MMMM yyyy")}</p>
              </div>
            </div>

            {/* Rating */}
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

            {/* Comment */}
            <p className="text-slate-700 leading-relaxed">{review.comment}</p>

            {/* Reply */}
            {review.tenantReply && (
              <div className="mt-4 rounded-2xl border border-primary/10 bg-linear-to-br from-primary/5 to-white dark:to-slate-900 p-5">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <img src={review.property?.tenant?.profileImage || "https://ui-avatars.com/api/?name=Host"} alt="tenant" className="w-11 h-11 rounded-full object-cover border border-white shadow-sm" />

                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{review.property?.tenant?.firstName || "Property Owner"}</h4>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider">Tenant</span>
                    </div>

                    {/* Message */}
                    <div className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{review.tenantReply}</div>

                    {/* Footer */}
                    {review.repliedAt && <div className="mt-3 text-[11px] text-slate-400">{format(new Date(review.repliedAt), "dd MMM yyyy")}</div>}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
