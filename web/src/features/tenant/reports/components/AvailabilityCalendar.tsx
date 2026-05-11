import { format } from "date-fns";
import { generateAvailabilityCalendar } from "../../../../shared/utils/availability-calendar.util";

export default function AvailabilityCalendar({ data, filters, onMonthChange }: any) {
  const calendar = generateAvailabilityCalendar({
    month: new Date(filters.month + "-01"),
    availabilityData: data,
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800">Property Report</h2>

        <input type="month" value={filters.month} onChange={(e) => onMonthChange(e.target.value)} className="border border-slate-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {/* DAYS */}
      <div className="grid grid-cols-7 text-[11px] text-center mb-3 font-semibold text-slate-400">
        {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-2">
        {calendar.map((day: any, idx: number) => (
          <div
            key={idx}
            className={`h-20 rounded-xl p-2 flex flex-col justify-between text-xs transition
              ${!day.isCurrentMonth ? "bg-slate-50 text-slate-300" : day.isFull ? "bg-red-100 text-red-600" : day.isAvailable ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"}
            `}
          >
            {/* TOP: DATE */}
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold">{format(day.date, "dd")}</span>

              {/* 🔴 BADGE FULL */}
              {day.isFull && day.isCurrentMonth && <span className="text-[9px] bg-red-500 text-white px-1.5 rounded-full">FULL</span>}
            </div>

            {/* MIDDLE: ROOM BADGE */}
            {day.availableRooms > 0 && day.isCurrentMonth && (
              <div className="flex justify-center">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white shadow-sm text-slate-700">{day.availableRooms} room</span>
              </div>
            )}

            {/* BOTTOM: PRICE */}
            {day.price && day.isCurrentMonth && (
              <div className="text-[11px] font-bold text-right tracking-tight">
                <span className="text-[9px] text-slate-400 mr-1">Rp</span>
                {Number(day.price).toLocaleString("id-ID")}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
