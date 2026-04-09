import {
  addMonths,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from "date-fns";
import { generateCalendar } from "../../../shared/utils/calendar.util";
import { useState } from "react";
import { usePropertyRoomPricesDate } from "../../tenant/property/hooks/useProperty";

function DatePicker({ propertyId }: { propertyId: string }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = generateCalendar({ month: currentMonth });

  const { data: roomPricesDate } = usePropertyRoomPricesDate({
    propertyId,
    startDate: format(startOfMonth(currentMonth), "yyyy-MM-dd"),
    endDate: format(endOfMonth(currentMonth), "yyyy-MM-dd"),
  });

  console.log(roomPricesDate);

  const [selectedDate, setSelectedDate] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  function handleSelect(date: Date) {
    if (
      !selectedDate.startDate ||
      (selectedDate.startDate && selectedDate.endDate)
    ) {
      setSelectedDate({ startDate: date, endDate: null });
      return;
    }

    if (date < selectedDate.startDate) {
      setSelectedDate({ startDate: date, endDate: null });
    } else {
      setSelectedDate({ startDate: selectedDate.startDate, endDate: date });
    }
  }

  return (
    <section className="bg-surface p-8 rounded-3xl border border-outline shadow-sm ">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Select your stay</h2>
        <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
          4 Nights in Amalfi Coast
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="bg-surface-container-high px-4 py-3 flex justify-between items-center border-b border-slate-200">
            <span className="font-bold text-lg">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <div className="flex gap-4">
              <span
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="material-symbols-outlined cursor-pointer hover:text-primary"
              >
                chevron_left
              </span>
              <span
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="material-symbols-outlined cursor-pointer hover:text-primary"
              >
                chevron_right
              </span>
            </div>
          </div>
          <div className="pt-4 px-4 grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
            <span>SU</span>
            <span>MO</span>
            <span>TU</span>
            <span>WE</span>
            <span>TH</span>
            <span>FR</span>
            <span>SA</span>
          </div>
          <div className="pb-4 px-4 grid grid-cols-7 gap-1 text-center">
            {days.map(
              (day: {
                date: Date;
                isCurrentMonth: boolean;
                isToday: boolean;
                isWeekend: boolean;
                isAvailable: boolean;
                price: number;
              }) => (
                <button
                  onClick={() => handleSelect(day.date)}
                  disabled={!day.isAvailable || !day.isCurrentMonth}
                  key={day.date.toISOString()}
                  className={`py-2 rounded-lg ${
                    !day.isAvailable
                      ? "text-slate-300 cursor-not-allowed"
                      : !day.isCurrentMonth
                        ? "text-slate-300"
                        : selectedDate.startDate?.getTime() ===
                              day.date.getTime() ||
                            selectedDate.endDate?.getTime() ===
                              day.date.getTime()
                          ? "bg-primary text-white font-bold hover:bg-primary-container hover:text-primary cursor-pointer"
                          : selectedDate.startDate?.getTime() &&
                              selectedDate.endDate?.getTime() &&
                              day.date.getTime() >
                                selectedDate.startDate.getTime() &&
                              day.date.getTime() <
                                selectedDate.endDate.getTime()
                            ? "bg-primary-container text-primary font-bold hover:bg-primary hover:text-white cursor-pointer"
                            : day.isWeekend
                              ? "text-red-500 hover:bg-surface-container hover:text-primary cursor-pointer"
                              : "hover:bg-surface-container hover:text-primary cursor-pointer"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {format(day.date, "d")}
                    {day.isAvailable && day.isCurrentMonth && (
                      <span className="text-xs text-on-surface-variant">
                        {roomPricesDate?.map((roomPrice) => (
                          <span key={roomPrice.date}>
                            {roomPrice.availableRooms > 0 &&
                              new Date(roomPrice.date).getTime() ===
                                day.date.getTime() && (
                                <span className="text-xs text-on-surface-variant">
                                  Rp. {roomPrice.price}
                                </span>
                              )}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </button>
              ),
            )}
            {/* <div className="py-2 text-slate-300">29</div>
            <div className="py-2 text-slate-300">30</div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              1
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              2
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              3
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              4
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              5
            </div>
            <div className="py-2 bg-primary text-white font-bold rounded-lg cursor-pointer">
              6
            </div>
            <div className="py-2 bg-primary-container text-primary font-bold cursor-pointer">
              7
            </div>
            <div className="py-2 bg-primary-container text-primary font-bold cursor-pointer">
              8
            </div>
            <div className="py-2 bg-primary-container text-primary font-bold cursor-pointer">
              9
            </div>
            <div className="py-2 bg-primary text-white font-bold rounded-lg cursor-pointer">
              10
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              11
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              12
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              13
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              14
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              15
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              16
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              17
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              18
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              19
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              20
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              21
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              22
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              23
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              24
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              25
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              26
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              27
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              28
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              29
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              30
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              31
            </div>
            <div className="py-2 text-slate-300">1</div>
            <div className="py-2 text-slate-300">2</div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DatePicker;
