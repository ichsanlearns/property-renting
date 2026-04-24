import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, type SearchSchema } from "../../schema/search.schema";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "../DateRangePicker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

function SearchBar() {
  const navigate = useNavigate();
  const calendarRef = useRef<HTMLDivElement>(null);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const { register, handleSubmit, watch } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  const handleSearch = (data: SearchSchema) => {
    navigate(
      `/search?search=${data.param}${range?.from && range?.to ? `&checkIn=${format(range.from, "yyyy-MM-dd")}&checkOut=${format(range.to, "yyyy-MM-dd")}` : ""}`,
    );
  };

  const handleDateRangeChange = (range: DateRange) => {
    setRange(range);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setOpenCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleSearch, (errors) => console.error(errors))}
      className="glass-search hover:-translate-y-2 w-[50%] max-w-3xl mx-auto rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 group transition-all duration-500 hover:h-20  h-16 p-2"
    >
      <div className="flex-1 w-full flex items-center px-6 py-3 border-r border-slate-200/50">
        <span
          className="material-symbols-outlined text-slate-400 mr-3"
          data-icon="search"
        >
          search
        </span>
        <input
          {...register("param")}
          className="w-full bg-transparent border-none outline-none focus:ring-0 text-slate-800 placeholder-slate-400 font-medium text-base"
          placeholder="Search city, country, or property"
          type="text"
        />
      </div>
      <button
        type="button"
        disabled={openCalendar}
        className="text-left px-4 py-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setOpenCalendar((prev) => !prev)}
      >
        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
          Dates
        </p>
        <p className="text-sm font-semibold text-slate-800">
          {range?.from ? format(range.from, "dd MMM") : "Add dates"}
          {range?.to ? `- ${format(range.to, "dd MMM")}` : ""}
        </p>
      </button>
      {openCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-full md:w-[720px] left-1/2 -translate-x-1/2 mt-2 z-50 bg-white rounded-xl shadow-xl p-4"
        >
          <DateRangePicker handleDateRangeChange={handleDateRangeChange} />
        </div>
      )}

      <button
        disabled={!watch("param")}
        type="submit"
        className="w-full md:w-auto bg-[#ff5c61] text-white p-3 rounded-full flex items-center justify-center hover:bg-[#e64a50] transition-colors shadow-lg shadow-[#ff5c61]/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined" data-icon="search">
          search
        </span>

        <span className="md:hidden ml-2 font-bold">Search</span>
      </button>
    </form>
  );
}

export default SearchBar;
