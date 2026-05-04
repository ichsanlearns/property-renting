import { startOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";

export function generateAvailabilityCalendar({ month, availabilityData }: { month: Date; availabilityData: any[] }) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });

  return Array.from({ length: 42 }, (_, i) => {
    const date = addDays(start, i);

    const found = availabilityData.find((item) => isSameDay(new Date(item.date), date));

    return {
      date,
      isCurrentMonth: isSameMonth(date, month),
      isToday: isSameDay(date, new Date()),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,

      // 🔥 logic khusus availability
      isAvailable: found ? found.availableRooms > 0 && !found.isClosed : false,

      isFull: found ? found.availableRooms === 0 || found.isClosed : false,

      price: found ? found.price : null,
      availableRooms: found ? found.availableRooms : 0,
    };
  });
}
