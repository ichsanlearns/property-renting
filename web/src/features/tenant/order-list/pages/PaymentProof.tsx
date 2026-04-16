import { useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "../../../../api/client.ts";
import { format } from "date-fns";
import { formatRupiah } from "../../../../shared/utils/price.util";
import { useNavigate } from "react-router";

function PaymentProof() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loadingApprove, setLoadingApprove] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get("/reservations/tenant");

      const found = res.data.data.find((item: any) => item.reservationCode === code);
      setData(found);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async () => {
    try {
      setLoadingApprove(true);
      await api.patch("/payments/confirm", {
        reservationId: data.id,
      });
      setData((prev: any) => ({
        ...prev,
        status: "PAID",
      }));

      alert("Payment approved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to approve payment");
    } finally {
      setLoadingApprove(false);
    }
    setTimeout(() => {
      navigate("/tenant/orderslist");
    }, 1000);
  };

  if (!data) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-bold">Data not found ❌</p>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 font-display">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <a className="hover:text-primary transition-colors" href="#">
          Orders
        </a>
        <span className="material-symbols-outlined text-base">chevron_right</span>
        <span className="text-slate-900 dark:text-slate-200 font-medium">Review Payment Proof</span>
      </div>

      {/* Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Review Payment Proof</h2>
          <p className="text-slate-500 mt-1 font-medium">Verify guest bank transfer for booking #BK-9021</p>
        </div>
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border
  ${data.status === "WAITING_CONFIRMATION" ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"}`}
        >
          <span className="material-symbols-outlined">{data.status === "PAID" ? "check_circle" : "pending"}</span>
          <span className="text-sm font-bold">{data.status === "PAID" ? "Confirmed" : "Waiting for Confirmation"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Booking Info & Rejection Notes */}
        <div className="lg:col-span-1 space-y-6">
          {/* Booking Information Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-900 dark:text-white">Booking Information</h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-start">
                <span className="text-sm text-slate-500">Booking ID</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{data.reservationCode}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-slate-500">Guest Name</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{data.customer?.name || "Guest"}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-slate-500">Property</span>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{data.roomType.property.name}</p>
                  <p className="text-xs text-slate-500">{data.roomNameSnapshot}</p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-slate-500">Stay Dates</span>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {" "}
                    {format(new Date(data.checkInDate), "MMM dd")} - {format(new Date(data.checkOutDate), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Total Price</span>
                <span className="text-xl font-black text-primary">{formatRupiah(Number(data.totalAmount))}</span>
              </div>
            </div>
          </div>

          {/* Rejection Notes Area */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3" htmlFor="rejection-notes">
              Notes for Rejection (Optional)
            </label>
            <textarea
              className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-sm focus:ring-primary focus:border-primary outline-none transition-all"
              id="rejection-notes"
              placeholder="e.g. Account name mismatch, amount incorrect..."
              rows={4}
            />
          </div>
        </div>

        {/* Right Column: Payment Proof Preview & Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Receipt Preview</h3>
              <button className="flex items-center gap-2 text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors text-sm font-bold">
                <span className="material-symbols-outlined text-lg">zoom_in</span>
                <span>Zoom</span>
              </button>
            </div>
            <div className="p-8 flex-1 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <div className="relative group cursor-pointer max-w-lg w-full">
                <img alt="Payment Proof" className="w-full h-auto rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700" src={data.paymentProof || "https://via.placeholder.com/400"} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined">zoom_in</span>
                    Click to Expand
                  </div>
                </div>
              </div>
            </div>
            {/* Actions Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-4 px-6 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
                <span className="material-symbols-outlined">close</span>
                Reject Payment
              </button>
              <button
                onClick={handleApprove}
                disabled={loadingApprove || data.status === "PAID"}
                className={`flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold transition-all
  ${data.status === "PAID" ? "bg-emerald-200 text-emerald-700 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90"}`}
              >
                <span className="material-symbols-outlined">check_circle</span>
                {loadingApprove ? "Processing..." : data.status === "PAID" ? "Approved" : "Approve Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Detail Sections */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">account_balance</span>
            <h4 className="font-bold text-slate-900 dark:text-white">Source Bank</h4>
          </div>
          <p className="text-sm text-slate-500">First National Merchant Bank</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Acc ending: **** 4902</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">calendar_today</span>
            <h4 className="font-bold text-slate-900 dark:text-white">Transfer Date</h4>
          </div>
          <p className="text-sm text-slate-500">October 12, 2023</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">14:32 PM UTC</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">receipt_long</span>
            <h4 className="font-bold text-slate-900 dark:text-white">Ref Number</h4>
          </div>
          <p className="text-sm text-slate-500">Internal Reference</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">TXN-0988776655-SH</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentProof;
