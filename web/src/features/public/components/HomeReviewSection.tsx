import { useEffect, useState } from "react";
import api from "../../../api/client";
import { format } from "date-fns";

export default function HomeReviewSection() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get("/reviews");
      setReviews(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold">What guests say</h2>

        <p className="text-slate-500 mt-2">Real experiences from our travelers</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-3xl border border-primary/10 p-6 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <img src={review.customer?.profileImage || `https://ui-avatars.com/api/?name=${review.customer?.firstName}`} className="w-12 h-12 rounded-full object-cover" />

              <div>
                <h4 className="font-bold">{review.customer?.firstName}</h4>

                <p className="text-xs text-slate-400">{format(new Date(review.createdAt), "dd MMM yyyy")}</p>
              </div>
            </div>

            <div className="flex text-primary mb-3">
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

            <p className="text-slate-700 leading-relaxed mb-4">"{review.comment}"</p>

            <div className="text-sm font-semibold text-primary">{review.property?.name}</div>

            <div className="text-xs text-slate-400">
              {review.property?.city}, {review.property?.country}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
