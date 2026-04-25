import { useState } from "react";
import { format } from "date-fns";

export default function ReviewCard({ review }: { review: any }) {
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
}
