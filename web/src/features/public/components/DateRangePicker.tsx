import { useEffect, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

const today = new Date();
today.setHours(0, 0, 0, 0);

export function DateRangePicker({
  handleDateRangeChange,
}: {
  handleDateRangeChange: (range: DateRange) => void;
}) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [months, setMonths] = useState(1);

  const handleSelect = (_: DateRange | undefined, selectedDay: Date) => {
    if (!selectedDay) return;

    if (range?.from && range?.to) {
      setRange({ from: selectedDay, to: undefined });
      return;
    }

    if (!range?.from) {
      setRange({ from: selectedDay, to: undefined });
      return;
    }

    if (selectedDay < range.from) {
      setRange({ from: selectedDay, to: undefined });
      return;
    }
    setRange({ from: range.from, to: selectedDay });
    handleDateRangeChange({ from: range.from, to: selectedDay });
  };

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      setMonths(media.matches ? 2 : 1);
    };

    handleResize();
    media.addEventListener("change", handleResize);

    return () => media.removeEventListener("change", handleResize);
  }, []);

  return (
    <DayPicker
      captionLayout="dropdown"
      mode="range"
      selected={range}
      onSelect={handleSelect}
      disabled={{
        before: today,
      }}
      modifiersClassNames={{
        selected: "!bg-primary !border-none !text-white",
        today: " border border-black",
        range_start: "!bg-primary !border-none !text-white rounded-l-full",
        range_end: "!bg-primary !border-none !text-white rounded-r-full",
        range_middle: "!bg-primary/60 !border-none",
      }}
      className="z-60"
      classNames={{
        chevron: "!text-primary",
        button: "hover:!bg-primary/10 rounded-md",
      }}
      numberOfMonths={months}
    />
  );
}
