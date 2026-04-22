type Props = {
  reservationCode: string;
};

export default function PaymentHeader({ reservationCode }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <div className="flex flex-wrap justify-between gap-4 items-start">
        <div>
          <p className="text-primary font-semibold text-sm mb-2">STAYHUB PAYMENT</p>

          <h1 className="text-3xl md:text-4xl font-black text-slate-900">Payment Status</h1>

          <p className="text-slate-500 mt-2">Track your booking payment easily.</p>
        </div>

        <div className="bg-slate-100 px-4 py-2 rounded-full text-sm font-semibold text-slate-700">#{reservationCode}</div>
      </div>
    </div>
  );
}
