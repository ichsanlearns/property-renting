export default function RevenueChart() {
  return (
    <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h3 className="font-headline font-bold text-xl mb-1">Revenue over Time</h3>

          <p className="text-slate-500 text-sm font-medium">Financial performance across Q1-Q3</p>
        </div>

        <div className="flex space-x-2">
          <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-md">Daily</button>

          <button className="px-4 py-1.5 bg-[#b52330] text-white text-xs font-bold rounded-md">Monthly</button>
        </div>
      </div>

      <div className="h-64 relative pt-4">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0,80 Q10,75 20,60 T40,65 T60,40 T80,30 T100,10 L100,100 L0,100 Z" fill="rgba(181,35,48,.1)" />

          <path d="M0,80 Q10,75 20,60 T40,65 T60,40 T80,30 T100,10" fill="none" stroke="#b52330" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
