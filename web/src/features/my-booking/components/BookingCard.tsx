import { useNavigate } from "react-router-dom";

export default function BookingCard({ booking }: any) {
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-primary/5 group hover:scale-[1.01]">
      <div className="relative h-48 overflow-hidden">
        {booking.isReviewed && <div className="absolute inset-0 bg-slate-900/10 z-10"></div>}

        <img
          src={booking.img}
          alt={booking.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500
          ${booking.isReviewed ? "grayscale-[0.3]" : ""}
          ${booking.isCancelled ? "grayscale opacity-60" : ""}`}
        />

        <div className="absolute top-3 right-3 z-20">
          <span className={`${booking.statusColor} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm`}>
            {booking.dotColor && <span className={`size-1.5 ${booking.dotColor} rounded-full`}></span>}
            {booking.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{booking.name}</h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">{booking.type}</p>
          </div>

          <p className={`font-extrabold ${booking.isCancelled || booking.isReviewed ? "text-slate-400" : "text-primary"}`}>{booking.price}</p>
        </div>

        <div className="space-y-2 mb-6">
          <div className={`flex items-center gap-2 text-sm ${booking.isReviewed ? "text-slate-500 line-through" : "text-slate-600 dark:text-slate-300"}`}>
            <span className="material-symbols-outlined text-base">calendar_month</span>
            {booking.date}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-base">group</span>
            {booking.guests} Guests
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {booking.status === "Waiting for Payment" ? (
            <>
              <button onClick={() => navigate(`/reservations/${booking.reservationCode}`)} className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                Pay Now
              </button>

              <button className="w-full text-slate-500 hover:text-red-500 font-semibold py-2 transition-colors text-sm">Cancel Booking</button>
            </>
          ) : booking.canReview ? (
            <div className="flex gap-3">
              <button onClick={() => navigate(`/review/${booking.id}`)} className="flex-1 border border-primary text-primary font-bold py-2.5 rounded-lg hover:bg-primary/5 transition-colors text-sm">
                Review Stay
              </button>

              <button
                onClick={() => navigate(`/payment/${booking.reservationCode}`)}
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-2.5 rounded-lg hover:bg-slate-200 transition-colors text-sm"
              >
                Receipt
              </button>
            </div>
          ) : booking.isReviewed ? (
            <button disabled className="w-full bg-emerald-100 text-emerald-700 font-bold py-2.5 rounded-lg text-sm">
              Reviewed ✓
            </button>
          ) : (
            <button onClick={() => navigate(`/payment/${booking.reservationCode}`)} className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
