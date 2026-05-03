import { usePropertySearch } from "../../tenant/property/hooks/useProperty";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/home-page/SearchBar";
import LoaderPropertyCard from "../components/LoaderPropertyCard";
import { useState } from "react";
import MapViewer from "../components/MapViewer";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const city = searchParams.get("city");
  const guests = Number(searchParams.get("guests")) || 0;
  const page = Number(searchParams.get("page")) || 1;
  const sortByParams = searchParams.get("sortBy") as
    | "name"
    | "createdAt"
    | null;
  const orderParams = searchParams.get("order") as "asc" | "desc" | null;

  const [sortBy, setSortBy] = useState<"name" | "price" | "createdAt" | null>(
    null,
  );
  const [order, setOrder] = useState<"asc" | "desc" | null>(null);

  const handleSearchClick = (sentParams: {
    search: string;
    checkIn: string;
    checkOut: string;
    city: string;
  }) => {
    const params = new URLSearchParams(searchParams);

    params.set("search", sentParams.search);
    params.set("checkIn", sentParams.checkIn);
    params.set("checkOut", sentParams.checkOut);
    params.set("city", sentParams.city);

    params.set("page", "1");

    setSearchParams(params);
  };

  const handlePriceClick = () => {
    let nextOrder: "asc" | "desc" | null;

    if (sortBy === "price") {
      if (order === "asc") nextOrder = "desc";
      else if (order === "desc") nextOrder = null;
      else nextOrder = "asc";
    } else {
      nextOrder = "asc";
    }

    const params = new URLSearchParams(searchParams);

    if (nextOrder) {
      params.set("sortBy", "price");
      params.set("order", nextOrder);

      setSortBy("price");
      setOrder(nextOrder);
    } else {
      params.delete("sortBy");
      params.delete("order");

      setSortBy(null);
      setOrder(null);
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  const handleNameClick = () => {
    let nextOrder: "asc" | "desc" | null;

    if (sortBy === "name") {
      if (order === "asc") nextOrder = "desc";
      else if (order === "desc") nextOrder = null;
      else nextOrder = "asc";
    } else {
      nextOrder = "asc";
    }

    const params = new URLSearchParams(searchParams);

    if (nextOrder) {
      params.set("sortBy", "name");
      params.set("order", nextOrder);

      setSortBy("name");
      setOrder(nextOrder);
    } else {
      params.delete("sortBy");
      params.delete("order");

      setSortBy(null);
      setOrder(null);
    }

    params.set("page", "1");

    setSearchParams(params);
  };

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
    sortBy: sortByParams || undefined,
    order: orderParams || undefined,
  });

  return (
    <>
      <div className="absolute w-full z-40 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 mt-2">
          <div className="flex flex-col items-center justify-center gap-8">
            <div>
              <SearchBar
                sentParams={(params) => handleSearchClick(params)}
                search={search || undefined}
                city={city || undefined}
                checkIn={checkIn || undefined}
                checkOut={checkOut || undefined}
                guests={guests || undefined}
              />
            </div>
            <div className="flex items-center space-x-3 overflow-x-auto hide-scrollbar pb-2">
              <button
                type="button"
                onClick={() => handlePriceClick()}
                className={`flex items-center space-x-2 border  rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap justify-center h-12 w-30 cursor-pointer ${
                  sortBy !== "price"
                    ? " text-on-surface"
                    : "bg-primary/10 text-primary border-primary"
                }`}
              >
                <span>Price</span>
                <span
                  className="material-symbols-outlined text-sm font-bold"
                  data-icon="keyboard_arrow_up"
                >
                  {sortBy === "price" &&
                    (order === "asc"
                      ? "keyboard_arrow_up"
                      : "keyboard_arrow_down")}
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNameClick()}
                className={`flex items-center space-x-2 border  rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap justify-center h-12 w-30 cursor-pointer ${
                  sortBy !== "name"
                    ? " text-on-surface"
                    : "bg-primary/10 text-primary border-primary"
                }`}
              >
                <span>Name</span>
                <span
                  className="material-symbols-outlined text-sm font-bold"
                  data-icon="keyboard_arrow_down"
                >
                  {sortBy === "name" &&
                    (order === "asc"
                      ? "keyboard_arrow_up"
                      : "keyboard_arrow_down")}
                </span>
              </button>
            </div>
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
          <div className="relative w-full h-full rounded-xl">
            {properties && (
              <MapViewer
                locations={
                  properties.data.map((property) => ({
                    lat: property.latitude,
                    lng: property.longitude,
                    label: property.name,
                    price: property.price,
                    id: property.id,
                  })) ?? []
                }
              />
            )}
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
