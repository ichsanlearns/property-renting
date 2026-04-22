export default function AdditionalDetailCards() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card icon="account_balance" title="Source Bank" text1="First National Merchant Bank" text2="Acc ending: **** 4902" />

      <Card icon="calendar_today" title="Transfer Date" text1="October 12, 2023" text2="14:32 PM UTC" />

      <Card icon="receipt_long" title="Ref Number" text1="Internal Reference" text2="TXN-0988776655-SH" />
    </div>
  );
}

function Card({ icon, title, text1, text2 }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-primary">{icon}</span>

        <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
      </div>

      <p className="text-sm text-slate-500">{text1}</p>

      <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{text2}</p>
    </div>
  );
}
