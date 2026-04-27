import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import LoaderFetching from "../../../shared/ui/LoaderFetching";
import { useReservationDetail } from "../hooks/useReservations";
import api from "../../../api/client";

import CheckoutHeader from "../components/CheckoutHeader";
import CountdownCard from "../components/CountdownCard";
import TripDetailCard from "../components/TripDetailCard";
import PaymentMethodCard from "../components/PaymentMethodCard";
import PriceDetailCard from "../components/PriceDetailCard";

function Reservation() {
  const { reservationCode } = useParams();

  const { data, isLoading } = useReservationDetail(reservationCode!);

  const [selectedPayment, setSelectedPayment] = useState("MANUAL_TRANSFER");

  const [timeLeft, setTimeLeft] = useState("");

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

  const grandTotal = Number(data?.totalAmount || 0) + tax;

  const handlePay = async () => {
    try {
      if (selectedPayment === "MANUAL_TRANSFER") {
        window.location.href = `/payment/${reservationCode}`;
        return;
      }

      if (!data) {
        toast.error("Reservation data not found");
        return;
      }

      const res = await api.post("/payments/midtrans", {
        reservationId: data.id,
      });

      const snapToken = res.data.data.token;

      if (!window.snap) {
        toast.error("Midtrans not loaded");
        return;
      }

      window.snap.pay(snapToken, {
        onSuccess: async () => {
          toast.success("Payment Success!");
          window.location.href = "/mybooking";
        },
        onPending: () => toast("Waiting for payment..."),
        onError: () => toast.error("Payment failed!"),
        onClose: () => toast("Payment cancelled"),
      });
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  if (isLoading) return <LoaderFetching />;

  if (!data) return <div>No reservation data found</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CheckoutHeader />
          <CountdownCard timeLeft={timeLeft} />
          <TripDetailCard data={data} />

          <PaymentMethodCard selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />
        </div>

        <div>
          <PriceDetailCard nights={nights} tax={tax} pricePerNight={pricePerNight} totalAmount={grandTotal} handlePay={handlePay} />
        </div>
      </div>
    </div>
  );
}

export default Reservation;
