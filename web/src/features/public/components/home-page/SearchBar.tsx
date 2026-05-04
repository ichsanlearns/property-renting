import { useForm } from "react-hook-form";
import { type SearchSchema } from "../../schema/search.schema";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "../DateRangePicker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useCities } from "../../../tenant/property/hooks/useProperty";

type CityOption = {
  id: string | null;
  name: string;
  count: number | null;
};

function SearchBar({
  sentParams,
  search,
  city,
  checkIn,
  checkOut,
  guests,
}: {
  sentParams?: ({
    search,
    checkIn,
    checkOut,
    city,
    guests,
  }: {
    search: string;
    checkIn: string;
    checkOut: string;
    city: string;
    guests: number;
  }) => void;
  search?: string;
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}) {
  const navigate = useNavigate();
  const calendarRef = useRef<HTMLDivElement>(null);

  const { data: cities } = useCities();

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  const [cityName, setCityName] = useState<string | null>(city ?? null);
  const [range, setRange] = useState<DateRange | undefined>(
    checkIn && checkOut
      ? {
          from: new Date(checkIn),
          to: new Date(checkOut),
        }
      : undefined,
  );

  const { register, handleSubmit, watch } = useForm();

  const handleSearch = (data: SearchSchema) => {
    if (sentParams) {
      sentParams({
        search: data.param ?? "",
        checkIn: range?.from ? format(range.from, "yyyy-MM-dd") : "",
        checkOut: range?.to ? format(range.to, "yyyy-MM-dd") : "",
        city: cityName ?? "",
        guests: data.guests ?? 0,
      });
      return;
    }
    const params = new URLSearchParams();

    if (data.param) {
      params.set("search", data.param);
    }

    if (cityName) {
      params.set("city", cityName);
    }

    if (range?.from && range?.to) {
      params.set("checkIn", format(range.from, "yyyy-MM-dd"));
      params.set("checkOut", format(range.to, "yyyy-MM-dd"));
    }

    if (data.guests) {
      params.set("guests", data.guests.toString());
    }

    navigate(`/search?${params.toString()}`);
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

  const cityOptions: CityOption[] = [
    { name: "Select city", count: null, id: null },
    ...(cities?.map((c) => ({
      name: c.name,
      count: c.count,
      id: c.name,
    })) ?? []),
  ];

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="glass-search hover:-translate-y-2 w-full rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 group transition-all duration-500 hover:h-20 border-2 border-gray-200 h-16 p-2"
    >
      <div className="w=40 flex items-center pl-6 py-3 border-r border-slate-200/50">
        <span
          className="material-symbols-outlined text-slate-400 mr-3"
          data-icon="search"
        >
          search
        </span>
        <input
          {...register("param")}
          defaultValue={search}
          className="w-full bg-transparent border-none outline-none focus:ring-0 text-slate-800 placeholder-slate-400 font-medium text-base"
          autoComplete="off"
          placeholder="Search property..."
          type="text"
        />
      </div>
      <div className="relative">
        <div
          onClick={() => cities && setOpenCity((prev) => !prev)}
          className={`flex h-full w-50 items-center px-6 py-3 border-r border-slate-200/50 hover:bg-slate-100/50 rounded-l-full transition-colors group/city justify-between ${!cities ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          <span
            className={`material-symbols-outlined mr-2 group-hover/city:text-primary ${!cities ? "text-slate-400" : "text-primary"}`}
            data-icon="location_on"
          >
            location_on
          </span>
          <span className="text-slate-800 font-semibold text-sm whitespace-nowrap">
            {!cities
              ? "Loading..."
              : cityName === null
                ? "Select city"
                : cityName}
          </span>
          <span
            className="material-symbols-outlined text-slate-400 ml-2 text-sm"
            data-icon="keyboard_arrow_down"
          >
            keyboard_arrow_down
          </span>
        </div>
        {openCity && (
          <div className="absolute top-full left-0 mt-4 w-[360px] bg-white rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col border border-slate-100">
            <div className="max-h-[280px] overflow-y-auto py-2 z-40">
              {cityOptions.map((city) => (
                <div
                  onClick={(e) => {
                    setOpenCity((prev) => !prev);
                    setCityName(city.id);
                    e.stopPropagation();
                  }}
                  key={city.id}
                  className="flex items-center px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mr-3 shrink-0">
                    <span className="material-symbols-outlined text-slate-500">
                      location_on
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      {city.name}
                    </p>
                    {city.count && (
                      <p className="text-xs text-slate-500">
                        {city.count}{" "}
                        {city.count > 1 ? "Properties" : "Property"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        disabled={openCalendar}
        className="text-left px-4 py-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50 w-40 "
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
          <DateRangePicker
            handleDateRangeChange={handleDateRangeChange}
            initialRange={range}
          />
        </div>
      )}
      <div className="w-40 flex items-center py-3 border-r border-slate-200/50">
        <span
          className="material-symbols-outlined text-slate-800 mr-3"
          data-icon="person"
        >
          person
        </span>
        <input
          {...register("guests", {
            valueAsNumber: true,
          })}
          defaultValue={guests}
          className="w-1/2 bg-transparent border-none outline-none focus:ring-0 text-slate-800 placeholder-slate-400 font-medium text-base"
          autoComplete="off"
          placeholder="guests"
          type="text"
        />
      </div>

      <button
        disabled={!watch("param") && !range && !cityName && !watch("guests")}
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
