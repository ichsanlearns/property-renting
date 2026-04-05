export const isWeekend = ({ date }: { date: Date }): boolean => {
  const local = new Date(date);
  local.setHours(0, 0, 0, 0);

  const day = local.getDay();
  return day === 0 || day === 6;
};
