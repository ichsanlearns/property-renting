export default function RecentBookingsTable({ bookings }: any) {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="px-8 py-6 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
        <h3 className="font-headline font-bold text-xl">Recent Bookings</h3>

        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
          <span className="material-symbols-outlined text-lg">filter_list</span>
          Filter
        </button>
      </div>

      <div className="overflow-x-auto text-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              {["Property", "Guest", "Dates", "Amount", "Status"].map((item) => (
                <th key={item} className="px-8 py-4 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {bookings?.map((item: any, i: number) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <td className="px-8 py-5 font-bold">{item.property}</td>

                <td className="px-8 py-5">{item.guest}</td>

                <td className="px-8 py-5 text-slate-500">
                  {item.checkIn} - {item.checkOut}
                </td>

                <td className="px-8 py-5 font-black">{item.amount}</td>

                <td className="px-8 py-5 ">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
