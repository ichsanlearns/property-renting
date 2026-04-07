import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

export function generateCalendar({ month }: { month: Date }) {
  const start = startOfWeek(startOfMonth(month));
  const end = endOfWeek(endOfMonth(month));

  return eachDayOfInterval({ start, end });
}
