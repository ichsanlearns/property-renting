type Props = {
  data: any;
  note: string;
  setNote: (v: string) => void;
};

export default function RejectionNotesCard({ data, note, setNote }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
      <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3" htmlFor="rejection-notes">
        Notes for Rejection (Optional)
      </label>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-sm focus:ring-primary focus:border-primary outline-none transition-all"
        id="rejection-notes"
        placeholder="e.g. Account name mismatch, amount incorrect..."
        rows={4}
      />

      {data.status === "REJECTED" && (
        <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
          <p className="text-sm font-bold text-red-700">Previous Rejection Reason</p>

          <p className="text-sm text-red-600 mt-1">{data.rejectionReason}</p>
        </div>
      )}
    </div>
  );
}
