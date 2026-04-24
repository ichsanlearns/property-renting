import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function DateRangePicker() {
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
  };

  return <DayPicker mode="range" selected={range} onSelect={handleSelect} />;
}
