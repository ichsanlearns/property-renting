import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function DateRangePicker({
  handleDateRangeChange,
}: {
  handleDateRangeChange: (range: DateRange) => void;
}) {
  const [range, setRange] = useState<DateRange | undefined>();

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

  return (
    <DayPicker
      captionLayout="dropdown"
      mode="range"
      selected={range}
      onSelect={handleSelect}
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
      numberOfMonths={2}
    />
  );
}
