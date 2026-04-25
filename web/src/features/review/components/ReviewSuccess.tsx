export default function ReviewSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center space-y-5">
        <div className="mx-auto size-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
        </div>

        <h2 className="text-2xl font-black">Thank You!</h2>

        <p className="text-slate-500">Your review has been submitted successfully.</p>
      </div>
    </div>
  );
}
