import { eachDayOfInterval, addDays, format } from "date-fns";

export const isWeekend = ({ date }: { date: Date }): boolean => {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
};

export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y!, m! - 1, d!);
}

export function toLocalFromDb(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function getDatesInRangeExclusive(
  startStr: string,
  endStr: string,
): Date[] {
  const start = parseLocalDate(startStr);
  const end = parseLocalDate(endStr);

  return eachDayOfInterval({
    start,
    end,
  });
}

export function buildDateKey(roomTypeId: string, date: Date): string {
  return `${roomTypeId}-${toDateKey(date)}`;
}
