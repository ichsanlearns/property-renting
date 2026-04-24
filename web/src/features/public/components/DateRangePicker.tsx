import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function DateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>();

  return <DayPicker mode="range" selected={range} onSelect={setRange} />;
}
