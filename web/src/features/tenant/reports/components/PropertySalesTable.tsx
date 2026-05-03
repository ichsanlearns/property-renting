import { format } from "date-fns";
import { formatRupiah } from "../../../../shared/utils/price.util";

export default function SalesReportTable({ data, filters, onChange, onSearch }: any) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-slate-800">Sales Report</h1>
        </div>

        {/* Filter Card */}
        <div className="bg-transparent border border-slate-200 rounded-xl px-4 py-3 flex flex-wrap items-end gap-3 justify-center">
          {/* Start Date */}
          <div className="flex flex-col text-xs">
            <label className="text-slate-500 mb-1">Start Date</label>
            <input name="startDate" value={filters.startDate} onChange={onChange} type="date" className="border border-slate-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>

          {/* End Date */}
          <div className="flex flex-col text-xs">
            <label className="text-slate-500 mb-1">End Date</label>
            <input name="endDate" value={filters.endDate} onChange={onChange} type="date" className="border border-slate-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>

          {/* Sort */}
          <div className="flex flex-col text-xs">
            <label className="text-slate-500 mb-1">Sort</label>
            <select name="sort" value={filters.sort} onChange={onChange} className="border border-slate-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary">
              <option>Sort by Date</option>
              <option value="highest">Highest Sales</option>
              <option value="lowest">Lowest Sales</option>
            </select>
          </div>

          {/* Button */}
          <button onClick={onSearch} className="bg-primary text-white px-4 py-1.5 rounded-md text-xs font-semibold hover:opacity-90 transition">
            Cari
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left mt-6">
          <thead className="text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th>User</th>
              <th>Properties</th>
              <th className="text-right pr-6">Total Sales</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item: any, idx: number) => (
              <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-100"}`}>
                {/* Date */}
                <td className="px-6 py-4 text-sm">{item.date ? format(new Date(item.date), "dd/MM/yyyy") : "-"}</td>

                {/* User */}
                <td>
                  <div className="font-semibold text-sm">{item.userName}</div>
                  <div className="text-xs text-slate-400">{item.userEmail}</div>
                </td>

                {/* Property */}
                <td>
                  <div className="text-sm font-medium">{item.propertyName}</div>
                  <div className="text-xs text-slate-400">{formatRupiah(item.total)}</div>
                </td>

                {/* Total */}
                <td className="text-right pr-6 font-semibold">{formatRupiah(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.length === 0 && <div className="p-10 text-center text-slate-400">No transactions yet</div>}
    </div>
  );
}
