import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

import api from "../../../api/client";
import LoaderFetching from "../../../shared/ui/LoaderFetching";

export default function ReviewPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchReservation();
  }, []);

  const fetchReservation = async () => {
    try {
      const res = await api.get(`/reservations/${reservationId}`);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reservation");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      return toast("Please select a rating first");
    }

    try {
      setSubmitting(true);

      await api.post("/reviews", {
        reservationId,
        rating,
        comment: review,
      });

      setSuccess(true);
      toast.success("Review submitted successfully!");

      setTimeout(() => {
        navigate("/mybooking");
      }, 2200);
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoaderFetching />;

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Reservation not found</div>;
  }

  const image = data.roomType?.roomTypeImages?.find((img: any) => img.isCover)?.imageUrl || data.roomType?.roomTypeImages?.[0]?.imageUrl;

  /* SUCCESS PAGE */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center space-y-5">
          <div className="mx-auto size-20 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900">Thank You!</h2>

          <p className="text-slate-500 leading-relaxed">Your review has been submitted successfully and will help future guests make better choices.</p>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-emerald-500 animate-pulse w-full"></div>
          </div>

          <p className="text-xs text-slate-400">Redirecting to My Booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#1a0b0b] flex flex-col items-center py-12 px-4 font-display">
      <div className="max-w-xl w-full flex flex-col gap-10">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">How was your stay?</h1>

          <p className="text-slate-500 dark:text-slate-400">Your feedback helps others choose better places.</p>
        </div>

        {/* PROPERTY CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5">
          <div
            className="w-24 h-24 md:w-32 md:h-24 bg-cover bg-center rounded-xl"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />

          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Past Stay</span>

            <h3 className="text-lg font-bold mt-1 text-slate-900 dark:text-white">{data.propertyNameSnapshot}</h3>

            <p className="text-sm text-slate-500">
              {data.roomNameSnapshot} • {format(new Date(data.checkInDate), "MMM dd")} - {format(new Date(data.checkOutDate), "MMM dd, yyyy")}
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* RATING */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="font-bold mb-6 text-lg text-slate-900 dark:text-white">Overall Experience</p>

            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={submitting}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-all hover:scale-125 disabled:opacity-60"
                >
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

            {rating > 0 && (
              <p className="mt-4 text-sm font-semibold text-primary">
                {rating === 5 && "Excellent stay 😍"}
                {rating === 4 && "Very good 😊"}
                {rating === 3 && "Good enough 🙂"}
                {rating === 2 && "Needs improvement 😕"}
                {rating === 1 && "Poor experience 😞"}
              </p>
            )}
          </div>

          {/* COMMENT */}
          <textarea
            value={review}
            disabled={submitting}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us about your stay..."
            className="w-full p-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-40 disabled:opacity-60"
          />

          {/* BUTTON */}
          <div className="space-y-3">
            <button type="submit" disabled={submitting} className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting && <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>}

              {submitting ? "Submitting..." : "Submit Review"}
            </button>

            <button type="button" disabled={submitting} onClick={() => navigate("/mybooking")} className="w-full text-slate-400 font-bold disabled:opacity-50">
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
