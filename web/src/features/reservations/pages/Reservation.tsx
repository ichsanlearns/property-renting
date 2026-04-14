import { useParams, useNavigate } from "react-router";

function Reservation() {
  const { reservationCode } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center space-y-6">
        {/* ICON SUCCESS */}
        <div className="flex justify-center">
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-extrabold text-slate-800">Reservation Created 🎉</h1>

        <p className="text-slate-500">Your reservation has been successfully created. Please complete your payment before the deadline.</p>

        {/* RESERVATION CODE */}
        <div className="bg-slate-100 rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">Reservation Code</p>
          <p className="text-lg font-bold text-primary tracking-wider">{reservationCode}</p>
        </div>

        {/* INFO */}
        <div className="text-sm text-slate-500">
          <p>
            ⏳ Payment deadline: <span className="font-semibold text-slate-700">2 hours from now</span>
          </p>
          <p className="mt-1">Please upload your payment proof after completing the payment.</p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3 pt-4">
          <button onClick={() => navigate("/mybooking")} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition">
            Go to My Booking
          </button>

          <button onClick={() => navigate("/")} className="w-full border border-slate-300 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
