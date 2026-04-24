import {
  addMonths,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { generateCalendar } from "../../../../shared/utils/calendar.util";
import { useEffect, useState } from "react";
import { usePropertyRoomPricesDate } from "../../../tenant/property/hooks/useProperty";
import { getAvailableRoomTypesForRange } from "../../utils/availability.util";
import { formatRupiah } from "../../../../shared/utils/price.util";

function DatePicker({
  propertyId,
  propertyName,
  selectedRoomTypeId,
  handleSelectDateRoom,
}: {
  propertyId: string;
  propertyName?: string;
  selectedRoomTypeId: string | null;
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

  const [selectedDate, setSelectedDate] = useState<{
    checkInDate: Date | null;
    checkOutDate: Date | null;
    numberOfNights: number;
  }>({
    checkInDate: null,
    checkOutDate: null,
    numberOfNights: 0,
  });

  const { data: roomPricesDateRange } = usePropertyRoomPricesDate({
    propertyId,
    startDate: selectedDate.checkInDate
      ? format(selectedDate.checkInDate, "yyyy-MM-dd")
      : undefined,
    endDate: selectedDate.checkOutDate
      ? format(selectedDate.checkOutDate, "yyyy-MM-dd")
      : undefined,
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
        numberOfNights:
          (new Date(date).getTime() -
            new Date(selectedDate.checkInDate).getTime()) /
          (1000 * 60 * 60 * 24),
      });

      // const availableRooms = getAvailableRoomTypesForRange({
      //   checkInDate: selectedDate.checkInDate,
      //   checkOutDate: date,
      //   data: roomPricesDateRange!,
      // });

      // const availableRoomsDate = {
      //   checkInDate: selectedDate.checkInDate,
      //   checkOutDate: date,
      //   numberOfNights:
      //     (new Date(date).getTime() -
      //       new Date(selectedDate.checkInDate).getTime()) /
      //     (1000 * 60 * 60 * 24),
      //   availableRooms,
      // };

      // handleSelectDateRoom(availableRoomsDate);
    }
  }

  useEffect(() => {
    if (!roomPricesDateRange) return;

    const availableRooms = getAvailableRoomTypesForRange({
      checkInDate: selectedDate.checkInDate!,
      checkOutDate: selectedDate.checkOutDate!,
      data: roomPricesDateRange,
    });

    handleSelectDateRoom({
      checkInDate: selectedDate.checkInDate,
      checkOutDate: selectedDate.checkOutDate,
      numberOfNights: selectedDate.numberOfNights,
      availableRooms,
    });
  }, [roomPricesDateRange]);

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
              }) => {
                const today = startOfDay(new Date()).getTime();
                const current = startOfDay(day.date).getTime();

                const checkIn = selectedDate.checkInDate
                  ? startOfDay(selectedDate.checkInDate).getTime()
                  : null;

                const checkOut = selectedDate.checkOutDate
                  ? startOfDay(selectedDate.checkOutDate).getTime()
                  : null;

                const isDisabled = !day.isAvailable || current < today;

                const isSelected =
                  (checkIn && current === checkIn) ||
                  (checkOut && current === checkOut);

                const isInRange =
                  checkIn &&
                  checkOut &&
                  current > checkIn &&
                  current < checkOut;

                const baseClass = "py-2 rounded-lg";

                let stateClass = "";

                if (isDisabled) {
                  stateClass = "text-slate-300 cursor-not-allowed";
                } else if (!day.isCurrentMonth) {
                  stateClass = "text-slate-300";
                } else if (isSelected) {
                  stateClass =
                    "bg-primary text-white font-bold hover:bg-primary-container hover:text-primary cursor-pointer";
                } else if (isInRange) {
                  stateClass =
                    "bg-primary-container text-primary font-bold hover:bg-primary hover:text-white cursor-pointer";
                } else if (day.isWeekend) {
                  stateClass =
                    "text-red-500 hover:bg-surface-container hover:text-primary cursor-pointer";
                } else {
                  stateClass =
                    "hover:bg-surface-container hover:text-primary cursor-pointer";
                }
                return (
                  <button
                    onClick={() => handleSelect(day.date)}
                    disabled={!day.isAvailable || !day.isCurrentMonth}
                    key={day.date.toISOString()}
                    className={`${baseClass} ${stateClass}`}
                    // className={`py-2 rounded-lg ${
                    //   !day.isAvailable ||
                    //   day.date.getTime() < startOfDay(Date.now()).getTime() - 1
                    //     ? "text-slate-300 cursor-not-allowed"
                    //     : !day.isCurrentMonth
                    //       ? "text-slate-300"
                    //       : (selectedDate.checkInDate?.getMonth() ||
                    //             selectedDate.checkOutDate?.getMonth()) ===
                    //             day.date.getMonth() &&
                    //           (selectedDate.checkInDate?.getDate() ===
                    //             day.date.getDate() ||
                    //             selectedDate.checkOutDate?.getDate() ===
                    //               day.date.getDate())
                    //         ? "bg-primary text-white font-bold hover:bg-primary-container hover:text-primary cursor-pointer"
                    //         : (selectedDate.checkInDate?.getMonth() ||
                    //               selectedDate.checkOutDate?.getMonth()) ===
                    //               day.date.getMonth() &&
                    //             selectedDate.checkInDate?.getDate() &&
                    //             selectedDate.checkOutDate?.getDate() &&
                    //             day.date.getDate() >
                    //               selectedDate.checkInDate.getDate() &&
                    //             day.date.getDate() <
                    //               selectedDate.checkOutDate.getDate()
                    //           ? "bg-primary-container text-primary font-bold hover:bg-primary hover:text-white cursor-pointer"
                    //           : day.isWeekend
                    //             ? "text-red-500 hover:bg-surface-container hover:text-primary cursor-pointer"
                    //             : "hover:bg-surface-container hover:text-primary cursor-pointer"
                    // }`}
                  >
                    <div className="flex flex-col items-center">
                      {format(day.date, "d")}
                      {day.isAvailable && day.isCurrentMonth && (
                        <span className="text-xs text-on-surface-variant">
                          <div className="flex flex-col items-center">
                            {day.isAvailable && day.isCurrentMonth && (
                              <span className="text-xs text-on-surface-variant">
                                {(() => {
                                  const dateKey = format(
                                    day.date,
                                    "yyyy-MM-dd",
                                  );
                                  const roomTypeId =
                                    selectedRoomTypeId ??
                                    Object.keys(roomPricesDate ?? {})[0];
                                  const dayData =
                                    roomPricesDate?.[roomTypeId]?.dates[
                                      dateKey
                                    ];

                                  if (
                                    !dayData ||
                                    dayData.availableRooms <= 0 ||
                                    dayData.isClosed ||
                                    day.date.getTime() <
                                      startOfDay(Date.now()).getTime() - 1
                                  ) {
                                    return null;
                                  }

                                  return formatRupiah(dayData.price);
                                })()}
                              </span>
                            )}
                          </div>
                        </span>
                      )}
                    </div>
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DatePicker;
