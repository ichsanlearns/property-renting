export default function ReviewForm({ review, submitting, setReview }: any) {
  return (
    <textarea
      value={review}
      disabled={submitting}
      onChange={(e) => setReview(e.target.value)}
      placeholder="Tell us about your stay..."
      className="w-full p-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-40"
    />
  );
}
