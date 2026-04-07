import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";

function DatePicker() {
  const [range, setRange] = useState<DateRange | undefined>();

  const mockCalendarData = [
    { date: "2026-04-06", price: 1200, isAvailable: false },
    { date: "2026-04-07", price: 1300, isAvailable: false },
    { date: "2026-04-08", price: 1400, isAvailable: true },
    { date: "2026-04-09", price: 1500, isAvailable: true },
    { date: "2026-04-10", price: 1600, isAvailable: true },
    { date: "2026-04-11", price: 1700, isAvailable: true },
    { date: "2026-04-12", price: 1800, isAvailable: true },
    { date: "2026-04-13", price: 2000, isAvailable: false },
    { date: "2026-04-14", price: 1200, isAvailable: false },
    { date: "2026-04-15", price: 1300, isAvailable: false },
    { date: "2026-04-16", price: 1400, isAvailable: true },
    { date: "2026-04-17", price: 1500, isAvailable: true },
    { date: "2026-04-18", price: 1600, isAvailable: true },
    { date: "2026-04-19", price: 1700, isAvailable: true },
    { date: "2026-04-20", price: 1800, isAvailable: true },
    { date: "2026-04-21", price: 2000, isAvailable: false },
  ];

  return (
    <section className="bg-surface p-8 rounded-3xl border border-outline shadow-sm ">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Select your stay</h2>
        <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
          4 Nights in Amalfi Coast
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="bg-surface-container-high px-4 py-3 flex justify-between items-center border-b border-slate-200">
            <span className="font-bold text-lg">October 2024</span>
            <div className="flex gap-4">
              <span className="material-symbols-outlined cursor-pointer hover:text-primary">
                chevron_left
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary">
                chevron_right
              </span>
            </div>
          </div>
          <div className="pt-4 px-4 grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
            <span>SU</span>
            <span>MO</span>
            <span>TU</span>
            <span>WE</span>
            <span>TH</span>
            <span>FR</span>
            <span>SA</span>
          </div>
          <div className="pb-4 px-4 grid grid-cols-7 gap-1 text-center">
            <DayPicker mode="range" selected={range} onSelect={setRange} />
            {/* <div className="py-2 text-slate-300">29</div>
            <div className="py-2 text-slate-300">30</div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              1
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              2
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              3
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              4
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              5
            </div>
            <div className="py-2 bg-primary text-white font-bold rounded-lg cursor-pointer">
              6
            </div>
            <div className="py-2 bg-primary-container text-primary font-bold cursor-pointer">
              7
            </div>
            <div className="py-2 bg-primary-container text-primary font-bold cursor-pointer">
              8
            </div>
            <div className="py-2 bg-primary-container text-primary font-bold cursor-pointer">
              9
            </div>
            <div className="py-2 bg-primary text-white font-bold rounded-lg cursor-pointer">
              10
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              11
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              12
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              13
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              14
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              15
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              16
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              17
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              18
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              19
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              20
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              21
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              22
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              23
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              24
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              25
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              26
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              27
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              28
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              29
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              30
            </div>
            <div className="py-2 hover:bg-surface-container rounded-lg cursor-pointer">
              31
            </div>
            <div className="py-2 text-slate-300">1</div>
            <div className="py-2 text-slate-300">2</div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DatePicker;
