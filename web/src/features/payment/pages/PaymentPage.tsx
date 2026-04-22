import { useParams } from "react-router";
import { usePayment } from "../hooks/usePayment";

import PaymentHeader from "../components/PaymentHeader";
import PaymentStatusSection from "../components/PaymentStatusSection";
import PropertySummaryCard from "../components/PropertySummaryCard";
import UploadProofCard from "../components/UploadProofCard";
import PaymentSummaryCard from "../components/PaymentSummaryCard";
import HelpCard from "../components/HelpCard";

export default function PaymentPage() {
  const { reservationCode } = useParams();

  const { data, loading, refetch } = usePayment(reservationCode);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">progress_activity</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
          <p className="text-2xl font-black text-slate-900 mb-2">Booking Not Found</p>

          <p className="text-slate-500">{reservationCode}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          <PaymentHeader reservationCode={reservationCode || ""} />

          <PaymentStatusSection data={data} />

          <PropertySummaryCard data={data} />

          {(data.status === "WAITING_PAYMENT" || data.status === "REJECTED") && <UploadProofCard data={data} onUploaded={refetch} />}
        </div>

        {/* RIGHT */}
        <div>
          <div className="sticky top-28 space-y-6">
            <PaymentSummaryCard data={data} />

            <HelpCard />
          </div>
        </div>
      </div>
    </div>
  );
}
