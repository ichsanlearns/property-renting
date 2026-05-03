type Props = {
  selectedPayment: string;
  setSelectedPayment: (value: string) => void;
};

function PaymentMethodCard({ selectedPayment, setSelectedPayment }: Props) {
  const paymentMethods = [
    {
      label: "Manual Transfer",
      value: "MANUAL_TRANSFER",
      icon: "account_balance",
      desc: "Upload transfer receipt manually",
    },
    {
      label: "Midtrans",
      value: "E_WALLET",
      icon: "wallet",
      desc: "Credit/Debit, QRIS & more",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Payment Method</h2>

      <p className="text-sm text-slate-500 mb-6">Choose your preferred payment option</p>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const active = selectedPayment === method.value;

          return (
            <button
              key={method.value}
              onClick={() => setSelectedPayment(method.value)}
              className={`w-full text-left rounded-2xl border p-5 transition-all duration-200 ${active ? "border-primary bg-primary/5 shadow-md" : "border-slate-200 hover:border-primary/30 hover:shadow-sm"}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${active ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}>
                    <span className="material-symbols-outlined">{method.icon}</span>
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">{method.label}</p>

                    <p className="text-sm text-slate-500">{method.desc}</p>
                  </div>
                </div>

                {active && <span className="material-symbols-outlined text-primary">check_circle</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentMethodCard;
