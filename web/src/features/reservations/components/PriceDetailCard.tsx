import { formatRupiah } from "../../../shared/utils/price.util";

type Props = {
  nights: number;
  tax: number;
  pricePerNight: number;
  totalAmount: number;
  handlePay: () => void;
};

function PriceDetailCard({
  nights,
  tax,
  pricePerNight,
  totalAmount,
  handlePay,
}: Props) {
  return (
    <div className="sticky top-28 rounded-3xl p-px bg-linear-to-b from-primary to-indigo-500">
      <div className="bg-white rounded-3xl p-6 shadow-xl">
        <h2 className="text-xl font-black text-slate-900 mb-6">
          Price Details
        </h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">
              {formatRupiah(pricePerNight)} x {nights} nights
            </span>

            <span className="font-semibold text-slate-900">
              {formatRupiah(pricePerNight * nights)}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-slate-500">Taxes & fees</span>

            <span className="font-semibold text-slate-900">
              {formatRupiah(tax)}
            </span>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-slate-900">Total</span>

            <span className="text-2xl font-black text-primary">
              {formatRupiah(totalAmount)}
            </span>
          </div>
        </div>

        <button
          onClick={handlePay}
          className="w-full mt-7 py-4 rounded-2xl bg-linear-to-r from-primary to-indigo-600 text-white font-bold text-lg hover:opacity-95 transition-all shadow-lg"
        >
          Pay Now
        </button>

        <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-emerald-600">
            verified_user
          </span>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Secure Payment
            </p>

            <p className="text-xs text-slate-500">
              Powered by SewaHunian & Midtrans
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          By continuing, you agree to our booking terms.
        </p>
      </div>
    </div>
  );
}

export default PriceDetailCard;
