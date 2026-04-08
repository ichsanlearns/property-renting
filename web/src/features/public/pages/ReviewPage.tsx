import { useState } from "react";
import { useNavigate } from "react-router";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // State tambahan untuk efek hover
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating!");

    const payload = { rating, review };
    console.log("Submit Review:", payload);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#1a0b0b] flex flex-col items-center py-12 px-4 font-display">
      <div className="max-w-xl w-full flex flex-col gap-10">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">How was your stay?</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Your feedback helps the StayHub community make better choices.</p>
        </div>

        {/* Property Summary Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5">
          <div className="w-24 h-24 md:w-32 md:h-24 bg-cover bg-center rounded-xl shadow-inner shrink-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1505693416388-ac5ce068fe85")' }} />
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Past Stay</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Azure Bay Villa</h3>
            <p className="text-sm text-slate-500">Master Suite • Apr 1 - Apr 3, 2026</p>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rating Card */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
            <p className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Overall Experience</p>

            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-all duration-200 transform hover:scale-125 focus:outline-none"
                >
                  <span
                    className={`material-symbols-outlined text-5xl select-none ${star <= (hoverRating || rating) ? "text-primary fill-1" : "text-slate-200 dark:text-slate-700"}`}
                    style={{ fontVariationSettings: `'FILL' ${star <= (hoverRating || rating) ? 1 : 0}` }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 h-6">
              {rating > 0 && (
                <p className="text-sm font-bold text-primary transition-all animate-in fade-in slide-in-from-bottom-2">
                  {rating === 5 ? "Excellent! Love it 😍" : rating === 4 ? "Very Good! 😊" : rating === 3 ? "It was okay 😐" : rating === 2 ? "Could be better 😕" : "Poor experience 😞"}
                </p>
              )}
            </div>
          </div>

          {/* Review Text Area */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Care to share more?</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell us about the location, the host, or the amenities..."
              className="w-full p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all min-h-40 text-slate-700 dark:text-slate-200 outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]">
              Submit Review
            </button>
            <button onClick={() => navigate("/mybooking")} type="button" className="w-full bg-transparent text-slate-400 font-bold py-2 hover:text-slate-600 transition-colors text-sm">
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
