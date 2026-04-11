export const isWeekend = ({ date }: { date: Date }): boolean => {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
};
