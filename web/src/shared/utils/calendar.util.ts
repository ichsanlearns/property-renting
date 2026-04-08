import {
  startOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";

export function generateCalendar({ month }: { month: Date }) {
  const start = startOfWeek(startOfMonth(month));

  const days = Array.from({ length: 42 }, (_, i) => {
    const date = addDays(start, i);

    return {
      date,
      isCurrentMonth: isSameMonth(date, month),
      isToday: isSameDay(date, new Date()),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isAvailable: true,
      price: 100,
    };
  });

  return days;
}
