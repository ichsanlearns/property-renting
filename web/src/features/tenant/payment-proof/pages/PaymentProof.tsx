import { useParams } from "react-router";
import { useNavigate } from "react-router";

import usePaymentProof from "../hooks/usePaymentProof";

import PaymentProofHeader from "../components/PaymentProofHeader";
import BookingInformationCard from "../components/BookingInformationCard";
import RejectionNotesCard from "../components/RejectionNotesCard";
import ReceiptPreviewCard from "../components/ReceiptPreviewCard";
import AdditionalDetailCards from "../components/AdditionalDetailCards";

function PaymentProof() {
  const { code } = useParams();
  const navigate = useNavigate();

  const { data, note, setNote, loadingApprove, handleApprove, handleReject } = usePaymentProof(code!, navigate);

  if (!data) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-bold">Data not found ❌</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 font-display">
      <PaymentProofHeader data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <BookingInformationCard data={data} />

          <RejectionNotesCard data={data} note={note} setNote={setNote} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ReceiptPreviewCard data={data} loadingApprove={loadingApprove} handleApprove={handleApprove} handleReject={handleReject} />
        </div>
      </div>

      <AdditionalDetailCards />
    </div>
  );
}

export default PaymentProof;
