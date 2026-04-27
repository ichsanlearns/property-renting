import { usePropertySearch } from "../../tenant/property/hooks/useProperty";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/home-page/SearchBar";
import LoaderPropertyCard from "../components/LoaderPropertyCard";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const city = searchParams.get("city");
  const page = Number(searchParams.get("page")) || 1;

  const handlePageClick = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    setSearchParams(params);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { data: properties, isLoading } = usePropertySearch({
    search: search || "",
    checkIn: checkIn || "",
    checkOut: checkOut || "",
    city: city || "",
    page,
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
              {properties?.data.length} stays found
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {isLoading ? (
              <LoaderPropertyCard />
            ) : (
              <>
                {properties && (
                  <>
                    {properties.data.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        page="search"
                      />
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
      <div className="my-16 flex justify-center items-center space-x-2">
        <button
          onClick={() => {
            handlePageClick((properties?.pagination.page || 1) - 1);
          }}
          className={`flex items-center justify-center w-10 h-10 rounded-full border border-outline   transition-colors shadow-sm ${
            properties?.pagination.page === 1
              ? "opacity-40 text-on-surface-variant cursor-not-allowed"
              : "bg-surface-container-low cursor-pointer text-on-surface hover:bg-surface-container-high"
          }`}
          disabled={properties?.pagination.page === 1}
        >
          <span className="material-symbols-outlined text-xl">
            chevron_left
          </span>
        </button>
        {properties?.pagination?.totalPages &&
          properties.pagination.totalPages > 0 &&
          Array.from({ length: properties.pagination.totalPages }).map(
            (_, index) => (
              <button
                onClick={() => {
                  handlePageClick(index + 1);
                }}
                key={index}
                disabled={properties?.pagination.page === index + 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${properties?.pagination.page === index + 1 ? "bg-primary text-white" : "bg-surface-container-low text-on-surface hover:bg-surface-container-high cursor-pointer"} font-semibold shadow-sm transition-all`}
              >
                {index + 1}
              </button>
            ),
          )}
        <button
          onClick={() => {
            handlePageClick((properties?.pagination.page || 1) + 1);
          }}
          className={`flex items-center justify-center w-10 h-10 rounded-full border border-outline   transition-colors shadow-sm ${
            properties?.pagination.page === properties?.pagination.totalPages
              ? "opacity-40 text-on-surface-variant cursor-not-allowed"
              : "bg-surface-container-low cursor-pointer text-on-surface hover:bg-surface-container-high"
          }`}
          disabled={
            properties?.pagination.page === properties?.pagination.totalPages
          }
        >
          <span className="material-symbols-outlined text-xl">
            chevron_right
          </span>
        </button>
      </div>
    </>
  );
}

export default SearchPage;
