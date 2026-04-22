type Props = {
  data: any;
  loadingApprove: boolean;
  handleApprove: () => void;
  handleReject: () => void;
};

export default function ReceiptPreviewCard({ data, loadingApprove, handleApprove, handleReject }: Props) {
  return (
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

      <div className="p-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleReject}
          disabled={data.status === "PAID"}
          className="flex items-center justify-center gap-2 py-4 px-6 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
        >
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
  );
}
