import { format } from "date-fns";
import { formatRupiah } from "../../../../shared/utils/price.util.ts";

export default function BookingInformationCard({ data }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
        <h3 className="font-bold text-slate-900 dark:text-white">Booking Information</h3>
      </div>

      <div className="p-6 space-y-5">
        <Row label="Booking ID" value={data.reservationCode} />

        <Row label="Guest Name" value={data.customer?.name || "Guest"} />

        <div className="flex justify-between items-start">
          <span className="text-sm text-slate-500">Property</span>

          <div className="text-right">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{data.roomType.property.name}</p>

            <p className="text-xs text-slate-500">{data.roomNameSnapshot}</p>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <span className="text-sm text-slate-500">Stay Dates</span>

          <div className="text-right">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {format(new Date(data.checkInDate), "MMM dd")} - {format(new Date(data.checkOutDate), "MMM dd, yyyy")}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Total Price</span>

          <span className="text-xl font-black text-primary">{formatRupiah(Number(data.totalAmount))}</span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="text-sm font-bold text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}
