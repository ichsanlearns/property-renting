import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { formatRupiah } from "../../../shared/utils/price.util";
import LoaderFetching from "../../../shared/ui/LoaderFetching";
import toast from "react-hot-toast";
import { useReservationDetail } from "../hooks/useReservations";

function Reservation() {
  const { reservationCode } = useParams();

  const { data, isLoading } = useReservationDetail(reservationCode!);

  const [selectedPayment, setSelectedPayment] = useState("MANUAL_TRANSFER");
  const [timeLeft, setTimeLeft] = useState("");

  // ⏳ Countdown timer
  useEffect(() => {
    if (!data?.paymentDeadline) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const deadline = new Date(data.paymentDeadline).getTime();

      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const nights = data?.numberOfNights || 0;
  const pricePerNight = Number(data?.averageRoomPerNightSnapshot || 0);

  const tax = useMemo(() => pricePerNight * nights * 0.1, [pricePerNight, nights]);

  if (isLoading) return <LoaderFetching />;

  if (!data) return <div>No reservation data found</div>;

  return (
    <div className="bg-background text-on-surface min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-10">
          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Confirm & Pay</h1>
            <p className="text-on-surface-variant">Complete your booking before time runs out</p>
          </div>

          {/* COUNTDOWN */}
          <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-sm text-on-surface-variant">Time remaining to complete payment</p>
              <p className="text-xl font-bold text-primary">{timeLeft}</p>
            </div>
            <span className="material-symbols-outlined text-primary text-3xl">timer</span>
          </div>

          {/* BOOKING DETAIL */}
          <div className="bg-white border border-primary/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Your Trip</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Property</span>
                <span className="font-semibold">{data.propertyNameSnapshot}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-on-surface-variant">Room</span>
                <span className="font-semibold">{data.roomNameSnapshot}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-on-surface-variant">Dates</span>
                <span className="font-semibold">
                  {format(new Date(data.checkInDate), "dd MMM yyyy")} - {format(new Date(data.checkOutDate), "dd MMM yyyy")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-on-surface-variant">Nights</span>
                <span className="font-semibold">{data.numberOfNights}</span>
              </div>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white border border-primary/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>

            <div className="space-y-3">
              {[
                { label: "Manual Transfer", value: "MANUAL_TRANSFER" },
                { label: "E-Wallet", value: "E_WALLET" },
                { label: "Credit Card", value: "CREDIT_CARD" },
              ].map((method) => (
                <div
                  key={method.value}
                  onClick={() => setSelectedPayment(method.value)}
                  className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center ${selectedPayment === method.value ? "border-primary bg-primary/5" : "border-primary/10"}`}
                >
                  <span className="font-semibold">{method.label}</span>
                  {selectedPayment === method.value && <span className="material-symbols-outlined text-primary">check_circle</span>}
                </div>
              ))}
            </div>

            {/* Upload proof */}
            {selectedPayment === "MANUAL_TRANSFER" && (
              <div className="mt-4">
                <label className="text-sm font-semibold">Upload Payment Proof</label>
                <input type="file" className="mt-2 block w-full border border-primary/20 rounded-lg p-2" />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div>
          <div className="sticky top-28 bg-white border border-primary/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Price Details</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="underline">
                  {formatRupiah(pricePerNight)} x {nights} nights
                </span>
                <span>{formatRupiah(pricePerNight * nights)}</span>
              </div>

              <div className="flex justify-between">
                <span className="underline">Taxes & fees</span>
                <span>{formatRupiah(tax)}</span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-extrabold">
                <span>Total</span>
                <span>{formatRupiah(data.totalAmount)}</span>
              </div>
            </div>

            <button onClick={() => toast.success("Proceed to payment")} className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90">
              Pay Now
            </button>

            <p className="text-xs text-center text-on-surface-variant mt-3">Secure payment powered by your platform</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
