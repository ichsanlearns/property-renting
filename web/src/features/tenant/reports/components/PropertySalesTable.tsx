import { formatRupiah } from "../../../../shared/utils/price.util";

export default function PropertySalesTable({ data }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-bold text-lg">Sales by Property</h3>
      </div>

      <table className="w-full text-left">
        <tbody>
          {data.map((item: any, idx: number) => (
            <tr key={idx}>
              <td className="px-6 py-4">{item.name}</td>
              <td>{item.bookings}</td>
              <td>{formatRupiah(item.revenue)}</td>
              <td>{formatRupiah(item.avg)}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
