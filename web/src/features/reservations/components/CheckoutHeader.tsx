function CheckoutHeader() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-primary font-semibold text-sm mb-2">
            SEWAHUNIAN CHECKOUT
          </p>

          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            Confirm & Pay
          </h1>

          <p className="text-slate-500 mt-2">
            Secure your booking before the timer ends.
          </p>
        </div>

        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
          Secure Checkout
        </div>
      </div>
    </div>
  );
}

export default CheckoutHeader;
