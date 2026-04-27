import { usePropertySearch } from "../../tenant/property/hooks/useProperty";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/home-page/SearchBar";
import LoaderPropertyCard from "../components/LoaderPropertyCard";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const city = searchParams.get("city");

  const { data: properties, isLoading } = usePropertySearch({
    search: search || "",
    checkIn: checkIn || "",
    checkOut: checkOut || "",
    city: city || "",
  });

  return (
    <>
      <div className="absolute w-full z-40 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 mt-2">
          <div className="flex items-center justify-center gap-4">
            <SearchBar
              search={search || undefined}
              checkIn={checkIn || undefined}
              checkOut={checkOut || undefined}
            />
            <button className="flex items-center space-x-2 border border-outline rounded-full px-4 py-2.5 text-sm font-medium  hover:shadow-md transition-all cursor-pointer  hover:scale-105">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="tune"
              >
                tune
              </span>
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>
      <main className="pt-[170px] flex min-h-screen">
        <div className="w-full lg:w-[60%] px-6 md:px-12 pb-12 overflow-y-auto">
          <div className="mb-6">
            <h1
              className="text-sm font-medium text-on-surface-variant"
              id="results-heading"
            >
              {properties?.length} stays found
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {isLoading ? (
              <LoaderPropertyCard />
            ) : (
              <>
                {properties && (
                  <>
                    {properties.map((property) => (
                      <PropertyCard property={property} page="search" />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="hidden lg:block lg:w-[40%] sticky top-[220px] h-[calc(100vh-220px)] bg-surface-container overflow-hidden">
          <div className="relative w-full h-full">
            <img
              alt="Map of Malibu"
              className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
              data-alt="stylized architectural map texture of malibu coastline with topographic lines and clean minimalist layout"
              data-location="Malibu, California"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5hsb2mrXo9BYY-XV5pN18zuKc9bTp1hzvdcrIdQ_uh6Om_A26pLFmW5w2hELVDfJxiGXvqIrKVA0RgtBzFkH6YYPMCjhjllqUnE_-EEBdM4RkrEhcYFxT9kS_Rm2RU2YxOmnwK3kKJnwBqNLp-UPmjcwh5GSlTPij1itIS2p_ZOb1gHbh47VrPuipCXWqGc0CkPAO1mOWo0bGVC0buBAdSjIYEJD2pmrTNQdDns5OOvnA9giGQ6DS-QRmRWpHgIws_mq7bMRLk_p4"
            />
            <div className="absolute top-[30%] left-[40%] bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm border border-outline hover:scale-110 transition-transform cursor-pointer z-10">
              $850
            </div>
            <div className="absolute top-[45%] left-[65%] bg-primary text-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm hover:scale-110 transition-transform cursor-pointer z-20">
              $1,200
            </div>
            <div className="absolute top-[60%] left-[20%] bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm border border-outline hover:scale-110 transition-transform cursor-pointer z-10">
              $450
            </div>
            <div className="absolute top-[20%] left-[75%] bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm border border-outline hover:scale-110 transition-transform cursor-pointer z-10">
              $1,550
            </div>
            <div className="absolute top-[55%] left-[45%] bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm border border-outline hover:scale-110 transition-transform cursor-pointer z-10">
              $780
            </div>
            <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined" data-icon="add">
                  add
                </span>
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined" data-icon="remove">
                  remove
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SearchPage;
