import {
  addMonths,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from "date-fns";
import { generateCalendar } from "../../../shared/utils/calendar.util";
import { useState, useMemo } from "react";
import { usePropertyRoomPricesDate } from "../../tenant/property/hooks/useProperty";
import type { GetPropertyRoomPricesDateResponse } from "../../tenant/property/api/property.response";
import { getAvailableRoomTypesForRange } from "../utils/availability.util";
import { formatRupiah } from "../../../shared/utils/price.util";

function DatePicker({
  propertyId,
  propertyName,
  handleSelectDateRoom,
}: {
  propertyId: string;
  propertyName?: string;
  handleSelectDateRoom: (selectedDateRoom: {
    checkInDate: Date | null;
    checkOutDate: Date | null;
    numberOfNights: number;
    availableRooms: {
      roomTypeId: string;
      averagePrice: number;
    }[];
  }) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = generateCalendar({ month: currentMonth });

  const { data: roomPricesDate } = usePropertyRoomPricesDate({
    propertyId,
    startDate: format(startOfMonth(currentMonth), "yyyy-MM-dd"),
    endDate: format(endOfMonth(currentMonth), "yyyy-MM-dd"),
  });

  const roomTypeIds = useMemo(() => {
    return [...new Set((roomPricesDate ?? []).map((item) => item.roomTypeId))];
  }, [roomPricesDate]);

  const availabilityMap = useMemo(() => {
    const map = new Map<string, GetPropertyRoomPricesDateResponse>();

    for (const item of roomPricesDate ?? []) {
      const dateKey = format(new Date(item.date), "yyyy-MM-dd");
      map.set(`${item.roomTypeId}-${dateKey}`, item);
    }

    return map;
  }, [roomPricesDate]);

  const [selectedDate, setSelectedDate] = useState<{
    checkInDate: Date | null;
    checkOutDate: Date | null;
    numberOfNights: number;
  }>({
    checkInDate: null,
    checkOutDate: null,
    numberOfNights: 0,
  });

  function handleSelect(date: Date) {
    if (!(selectedDate.checkInDate && selectedDate.checkOutDate)) {
      if (date.getDate() === selectedDate.checkInDate?.getDate()) {
        setSelectedDate({
          checkInDate: null,
          checkOutDate: null,
          numberOfNights: 0,
        });
        handleSelectDateRoom({
          checkInDate: null,
          checkOutDate: null,
          numberOfNights: 0,
          availableRooms: [],
        });
        return;
      }
    }

    if (
      !selectedDate.checkInDate ||
      (selectedDate.checkInDate && selectedDate.checkOutDate)
    ) {
      setSelectedDate({
        checkInDate: date,
        checkOutDate: null,
        numberOfNights: 0,
      });
      handleSelectDateRoom({
        checkInDate: null,
        checkOutDate: null,
        numberOfNights: 0,
        availableRooms: [],
      });
      return;
    }

    if (date < selectedDate.checkInDate) {
      setSelectedDate({
        checkInDate: date,
        checkOutDate: null,
        numberOfNights: 0,
      });
      handleSelectDateRoom({
        checkInDate: null,
        checkOutDate: null,
        numberOfNights: 0,
        availableRooms: [],
      });
    } else {
      setSelectedDate({
        checkInDate: selectedDate.checkInDate,
        checkOutDate: date,
        numberOfNights: date.getDate() - selectedDate.checkInDate.getDate(),
      });

      const availableRooms = getAvailableRoomTypesForRange({
        checkInDate: selectedDate.checkInDate,
        checkOutDate: date,
        availabilityMap,
        roomTypeIds,
      });

      const availableRoomsDate = {
        checkInDate: selectedDate.checkInDate,
        checkOutDate: date,
        numberOfNights: date.getDate() - selectedDate.checkInDate.getDate(),
        availableRooms,
      };

      handleSelectDateRoom(availableRoomsDate);
    }
  }

  return (
    <section className="bg-surface p-8 rounded-3xl border border-outline shadow-sm ">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Select your stay</h2>
        {selectedDate.checkInDate && selectedDate.checkOutDate && (
          <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
            {selectedDate.numberOfNights} Nights in{" "}
            <span className="text-primary text-lg">
              {propertyName?.split(" ")[0]}
            </span>
          </span>
        )}
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
                        : selectedDate.checkInDate?.getDate() ===
                              day.date.getDate() ||
                            selectedDate.checkOutDate?.getDate() ===
                              day.date.getDate()
                          ? "bg-primary text-white font-bold hover:bg-primary-container hover:text-primary cursor-pointer"
                          : selectedDate.checkInDate?.getDate() &&
                              selectedDate.checkOutDate?.getDate() &&
                              day.date.getDate() >
                                selectedDate.checkInDate.getDate() &&
                              day.date.getDate() <
                                selectedDate.checkOutDate.getDate()
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
                              new Date(roomPrice.date).getDate() ===
                                day.date.getDate() && (
                                <span className="text-xs text-on-surface-variant">
                                  {formatRupiah(roomPrice.price)}
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default DatePicker;
