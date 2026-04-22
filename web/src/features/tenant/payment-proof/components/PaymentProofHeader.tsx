type Props = {
  data: any;
};

export default function PaymentProofHeader({ data }: Props) {
  return (
    <>
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
          ${data.status === "PAID" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : data.status === "REJECTED" ? "bg-red-50 text-red-600 border-red-200" : "bg-amber-50 text-amber-600 border-amber-200"}`}
        >
          <span className="material-symbols-outlined">{data.status === "PAID" ? "check_circle" : data.status === "REJECTED" ? "cancel" : "pending"}</span>

          <span className="text-sm font-bold">{data.status === "PAID" ? "Confirmed" : data.status === "REJECTED" ? "Rejected" : "Waiting for Confirmation"}</span>
        </div>
      </div>
    </>
  );
}
