import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/stores/auth.store";
import Footer from "../../../shared/ui/Footer";

function MyBooking() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to={`/login`} replace />;
  }

  // Data Mockup untuk Booking
  const bookings = [
    {
      id: 1,
      name: "Azure Bay Villa",
      type: "Master Suite",
      price: "$2,000.00",
      date: "Oct 24 - Oct 29, 2023",
      guests: 4,
      status: "Confirmed",
      statusColor: "bg-emerald-100 text-emerald-700",
      dotColor: "bg-emerald-500",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDo92aF5C_JfKo11SyMhXRMbTRuq0Vw_1ToI7LYpZ8MK2o9_MubIY7Nor1A3qEK0y1n0-DEnnkBiJGF2u3EOQt7Ju0R19y2NhcUkLeAlfVSUDRRPZGbPOxkfXq56Oe_xmrMWeDsZcCdRU9S-poGLYHWJKdFTS5_Jv6u3wG4ZoR0ctUpbbH2QvrM4PUqrbg3_-0WSVMWKp5oVx_Bf2_Ksqku6GN-q4nnhlfwD8WIFCP37qi5MCo4gQz7wOjsWXIvf7dgbfHLWbL196Fp",
    },
    {
      id: 2,
      name: "Ocean Breeze Villa",
      type: "Entire House",
      price: "$1,450.00",
      date: "Nov 12 - Nov 15, 2023",
      guests: 2,
      status: "Waiting for Payment",
      statusColor: "bg-amber-100 text-amber-700",
      dotColor: "bg-amber-500",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjyuD8j1U9Kd8DVudpgMUh5DCWJ1r_l7a94NjjLvB-gz5h44pilX_FMqk6R7UaYEP6491IpKnLQE7k3_6h_KEuMTVp19Rh_Eu5lYVOMHwLhNeW5CKMNdCE2xQ88OvJt-wu9Izni8KZlSjztHNAIoQ6PV37dp8x5DsZerdVlzmZg41Gmlakc8EdQv4G_p_hzkOVHsSS1hVlIAl-1CVA85x6-S6oe22iM3zTTvOik3xnajcbG65MOwffE2MlO7jWc5FQrrhMP_YqNl4s",
    },
    {
      id: 3,
      name: "Cedar Ridge Cabin",
      type: "Forest Loft",
      price: "$850.00",
      date: "Sep 01 - Sep 05, 2023",
      guests: 2,
      status: "Completed",
      statusColor: "bg-slate-100 text-slate-600",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA10pneZgn6iPJz5EIZ90LP1M771uYbp5XCIteSGO7tV2a_NkgfGSnZMxW7hVSgigi21YZgsqebwCWA4rK2y41SDcy1EGub9xk6QBdE2Ij4u-8MOnK9eGXMK094LZG5-59mHAbLvDYDs-RESFFqYtz8ujh6ah2LFYLpiUceK2n5v2t8SDxHuVVIZYZ0WaOTfy7GqCScs4jvbtYKwnXepdno5FdUtTWw5slveDmOgtaA0Tp7CHYnB69qYen-6peUeE23KBFz79A6vQCr",
      isCompleted: true,
    },
    {
      id: 4,
      name: "Urban Heights Penthouse",
      type: "Sky View Suite",
      price: "$3,200.00",
      date: "Dec 24 - Dec 28, 2023",
      guests: 6,
      status: "Cancelled",
      statusColor: "bg-red-100 text-red-700",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcAykTC5ORzhnBuy0OFzMKl8tgzoajibLhTUlM8YDaXJjGycXGygEtosl2BvDaGIML_orU3lSRdMjwvZOaEPIkNXY4E9icl2k_ugMMYxhrmzjBiFFcOF-EIuOJ5YDrFiCEGw0vwP2XG58xC5wPMSAGmWYWuYeCCLfCu2EVBlVLsIfFthh2XBohDWyDJzpTVmQasuDFOonCtTVPATtGDkl8RTqJs91lDS7NSpr1lJZdpcfQW_sle-hIZKy0suJ0PizmVvxqK1chjJvQ",
      isCancelled: true,
    },
    {
      id: 5,
      name: "Nordic Light Loft",
      type: "Entire Apartment",
      price: "$980.00",
      date: "Jan 15 - Jan 18, 2024",
      guests: 2,
      status: "Confirmed",
      statusColor: "bg-emerald-100 text-emerald-700",
      dotColor: "bg-emerald-500",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMg_bzQZF4clCVMVoMD0uUSiFn6wJ5O1laNWj6GpGCfq7fjgaGQnlHcUJ5blHnnemjrAfQmGYOIUnsRV8ynHHsfES5HEmNjsLOVE7-cMObmjTN_Hxo1XBme1E_d4NKkdC75tqLs3mVW7DQWInoxrLPKSiOc3VLV0T5opmQwid8X2jVbGrYOl2DoWuKVHsZoM5qLrm1FzRzwJFTBNITcczOukQ27WCbJCRxywNiYedwLG5NeAWAlM_SPElXK4dEnAW809ijlNY7pFgR",
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">My Bookings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your current and past property reservations.</p>
        </div>

        {/* Filter & Search Section */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-primary/5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                <input className="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Search by Booking ID..." type="text" />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="relative">
                <select className="w-full pl-4 pr-10 py-2.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm appearance-none outline-none">
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
            <div className="md:col-span-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">calendar_today</span>
                <input className="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Select Date Range" type="text" />
              </div>
            </div>
            <div className="md:col-span-1">
              <button className="w-full h-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors py-2.5">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className={`bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-primary/5 group ${booking.isCancelled ? "opacity-80" : ""}`}>
              <div className="relative h-48 overflow-hidden">
                {booking.isCompleted && <div className="absolute inset-0 bg-slate-900/10 z-10"></div>}
                <img
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${booking.isCompleted ? "grayscale-[0.3]" : ""} ${booking.isCancelled ? "grayscale opacity-60" : ""}`}
                  src={booking.img}
                  alt={booking.name}
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
                  <p className={`font-extrabold ${booking.isCancelled || booking.isCompleted ? "text-slate-400" : "text-primary"}`}>{booking.price}</p>
                </div>
                <div className="space-y-2 mb-6">
                  <div className={`flex items-center gap-2 text-sm ${booking.isCompleted ? "text-slate-500 line-through" : "text-slate-600 dark:text-slate-300"}`}>
                    <span className="material-symbols-outlined text-base">calendar_month</span>
                    {booking.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-base">group</span>
                    {booking.guests} Guests
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {booking.status === "Waiting for Payment" ? (
                    <>
                      <button className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm">Pay Now</button>
                      <button className="w-full text-slate-500 hover:text-red-500 font-semibold py-2 transition-colors text-sm">Cancel Booking</button>
                    </>
                  ) : booking.isCompleted ? (
                    <div className="flex gap-3">
                      <button onClick={() => navigate("/review")} className="flex-1 border border-primary text-primary font-bold py-2.5 rounded-lg hover:bg-primary/5 transition-colors text-sm">
                        Review Stay
                      </button>
                      <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-2.5 rounded-lg hover:bg-slate-200 transition-colors text-sm">Receipt</button>
                    </div>
                  ) : (
                    <button className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm">View Details</button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* New Booking CTA */}
          <div className="border-2 border-dashed border-primary/20 rounded-xl flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:bg-primary/5 transition-colors">
            <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">add</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Book another stay?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Explore thousands of amazing properties.</p>
            <button className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg text-sm active:scale-95 transition-transform">Explore Now</button>
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
