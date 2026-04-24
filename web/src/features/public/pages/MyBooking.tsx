import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/stores/auth.store";
import { useEffect, useState } from "react";
import { getMyReservationsRequest } from "../../reservations/api/reservations.service";
import { format } from "date-fns";
import { formatRupiah } from "../../../shared/utils/price.util";
import Footer from "../../../shared/ui/Footer";
import LoaderFetching from "../../../shared/ui/LoaderFetching";

function MyBooking() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyReservationsRequest();

        const mapped = res.data.map((item: any) => {
          let status = "";
          let statusColor = "";
          let dotColor = "";

          switch (item.status) {
            case "WAITING_PAYMENT":
              status = "Waiting for Payment";
              statusColor = "bg-amber-100 text-amber-700";
              dotColor = "bg-amber-500";
              break;

            case "WAITING_CONFIRMATION":
              status = "Waiting for Confirmation";
              statusColor = "bg-blue-100 text-blue-700";
              dotColor = "bg-blue-500";
              break;

            case "PAID":
              status = "Confirmed";
              statusColor = "bg-emerald-100 text-emerald-700";
              dotColor = "bg-emerald-500";
              break;

            case "REVIEWED":
              status = "Completed";
              statusColor = "bg-slate-100 text-slate-600";
              break;

            case "CANCELED":
              status = "Cancelled";
              statusColor = "bg-red-100 text-red-700";
              break;

            default:
              status = item.status;
              statusColor = "bg-slate-100 text-slate-600";
          }

          return {
            id: item.id,
            reservationCode: item.reservationCode,

            name: item.roomType.property.name,
            type: item.roomNameSnapshot,

            price: formatRupiah(Number(item.totalAmount)),

            date: `${format(new Date(item.checkInDate), "MMM dd")} - ${format(new Date(item.checkOutDate), "MMM dd, yyyy")}`,

            guests: item.guestCount || 2,

            status,
            statusColor,
            dotColor,

            img: item.roomType.roomTypeImages?.[0]?.imageUrl || "https://via.placeholder.com/300",

            isCancelled: item.status === "CANCELED",
            isReviewed: item.status === "REVIEWED",
            canReview: item.status === "PAID",
          };
        });

        setBookings(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchSearch = booking.name.toLowerCase().includes(search.toLowerCase()) || booking.reservationCode.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter ? booking.status === statusFilter : true;

    return matchSearch && matchStatus;
  });

  if (loading) {
    return <LoaderFetching />;
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">My Bookings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your current and past property reservations.</p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-primary/5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <div className="relative group flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Booking ID..."
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm appearance-none outline-none"
                >
                  <option value="">All Statuses</option>
                  <option>Waiting for Payment</option>
                  <option>Waiting for Confirmation</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                  <option>Completed</option>
                </select>

                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
              </div>
            </div>

            <div className="md:col-span-1">
              <button className="w-full h-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors py-2.5">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.length === 0 && <p className="text-center text-slate-500 col-span-full">No bookings found 😢</p>}

          {filteredBookings.map((booking) => (
            <div key={booking.id} className="cursor-pointer bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-primary/5 group hover:scale-[1.01]">
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
                    {booking.dotColor && <span className={`size-1.5 ${booking.dotColor} rounded-full ${booking.status === "Confirmed" ? "animate-pulse" : ""}`}></span>}
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
          ))}

          {/* CTA */}
          <div className="border-2 border-dashed border-primary/20 rounded-xl flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:bg-primary/5 transition-colors">
            <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">add</span>
            </div>

            <h3 className="font-bold text-lg mb-1">Book another stay?</h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Explore thousands of amazing properties.</p>

            <button onClick={() => navigate(`/`)} className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg text-sm active:scale-95 transition-transform">
              Explore Now
            </button>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button className="size-10 flex items-center justify-center rounded-lg border border-primary/10 hover:bg-white transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>

          <button className="size-10 flex items-center justify-center rounded-lg border border-primary/10 hover:bg-white transition-colors">2</button>

          <button className="size-10 flex items-center justify-center rounded-lg border border-primary/10 hover:bg-white transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyBooking;
