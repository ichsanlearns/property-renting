import LoaderFetching from "../../../../shared/ui/LoaderFetching";
import { usePropertyByTenantId } from "../hooks/useProperty";
import { useNavigate } from "react-router-dom";

function PropertyList() {
  const { data: properties, isLoading } = usePropertyByTenantId();
  const navigate = useNavigate();

  const handleNavigateToPropertyDetail = (propertyId: string) => {
    const property = properties?.find((property) => property.id === propertyId);

    if (!property) return;

    navigate(`/tenant/property/${propertyId}`, {
      state: {
        property,
      },
    });
  };

  if (isLoading) {
    return <LoaderFetching />;
  }

  return (
    <main className="pt-24 pb-12 px-6 md:px-12 md:pt-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-[30px] font-extrabold tracking-tight text-slate-900">
            Properties
          </h1>
          <p className="text-[14px] font-medium text-secondary">
            Manage your portfolio of luxury listings.
          </p>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
          <div className="flex items-center gap-1 p-1 bg-surface-container-highest rounded-xl">
            <button className="px-4 py-2 text-[14px] font-semibold bg-surface text-primary rounded-lg shadow-sm">
              All ({properties?.length})
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/tenant/properties/create`)}
            className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-primary/20 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Property
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {properties?.map((property) => (
          <div
            key={property.id}
            onClick={() => handleNavigateToPropertyDetail(property.id)}
            className="flex flex-col md:flex-row bg-surface rounded-xl border border-outline-variant p-4 hover:shadow-xl hover:shadow-primary/5 transition-all group shadow-sm hover:-translate-y-0.5 hover:bg-slate-50/50 duration-300 md:gap-10 cursor-pointer"
          >
            <div className="relative w-full md:w-48 h-48 md:h-auto rounded-lg overflow-hidden shrink-0">
              <img
                alt="Villa Azul"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                data-alt="Luxurious coastal villa exterior with infinity pool overlooking the Aegean sea in Santorini at sunset"
                src={property.coverImage}
              />
              <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-primary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border border-slate-200/10">
                {property.isPublished}
              </div>
            </div>
            <div className="flex flex-col justify-center flex-1 py-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-surface-container-highest text-secondary text-[10px] font-bold uppercase rounded-md tracking-wider">
                  {property.category}
                </span>
              </div>
              <h2 className="text-[24px] text-slate-900 tracking-tight mb-1 font-extrabold">
                {property.name}
              </h2>
              <p className="text-[14px] font-medium mb-4 flex items-center gap-1 text-slate-500/80">
                <span className="material-symbols-outlined text-[16px]">
                  location_on
                </span>
                {property.city}, {property.country}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {property.roomTypes.map((roomType) => (
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-container-highest rounded-lg text-[11px] font-medium text-secondary border border-outline-variant/30 shadow-sm">
                    <span className="font-bold text-on-surface">
                      {roomType.name}
                    </span>
                    <span>•</span>
                    <span>{roomType.capacity} Guests</span>
                    <span>•</span>
                    <span className="text-primary font-bold">
                      Rp. {roomType.basePrice}
                    </span>
                  </div>
                ))}
                {property.roomTypes.length > 2 && (
                  <div className="flex items-center px-2.5 py-1 bg-surface-container-low rounded-lg text-[11px] font-bold text-primary border border-primary/10">
                    +{property.roomTypes.length - 2} more
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center md:items-end gap-3 md:w-64 shrink-0 py-2 md:border-l border-outline-variant md:pl-6">
              <div className="flex flex-col md:items-end gap-4">
                <div className="flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-lg w-fit border border-primary/10">
                  <span
                    className={`material-symbols-outlined text-[18px] ${property.averageRating ? "text-primary" : "text-slate-400"}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className={` text-[15px] ${property.averageRating ? "font-extrabold text-primary" : "font-bold text-slate-400"}`}
                  >
                    {property.averageRating ? property.averageRating : "-"}
                  </span>
                  <span
                    className={`text-[12px] font-medium ml-1 ${property.averageRating ? "text-slate-500" : "text-slate-400"}`}
                  >
                    ({property.reviewCount ? property.reviewCount : "No"}{" "}
                    Reviews)
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 md:items-end">
                  <span className="text-[14px] font-bold text-slate-900">
                    {property.numberOfBathrooms} Baths
                  </span>
                  <span className="text-[12px] font-medium text-slate-400">
                    Last updated{" "}
                    {new Date(property.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex md:flex-col items-center justify-end gap-2 md:w-16 shrink-0 border-t md:border-t-0 md:border-l border-outline-variant pt-4 md:pt-0 md:pl-4"></div>
          </div>
        ))}
        {/* <div className="flex flex-col md:flex-row bg-surface rounded-xl border border-outline-variant p-4 hover:shadow-xl hover:shadow-primary/5 transition-all group border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-0.5 hover:bg-slate-50/50 transition-all duration-300 md:gap-10">
          <div className="relative w-full md:w-48 h-48 md:h-auto rounded-lg overflow-hidden shrink-0">
            <img
              alt="The Glasshouse"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-alt="Modern architectural glass house nestled in a lush green coastal forest in Carmel, natural light"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeLgegpRARW7tQGD1r2y8MmA0HDAI5XCU2R6EFlijwH3nJzGYW0FFRNMmbY7_FgpIsN9j9dNGy0BkkIuZdVrrxOuhwcrOa_FRuZM1_zcnR2zTBN9fR7SNk1aQDFQhMsdVHQwoMCpBaxkH777-gNKFlJ1eeGkpXE3LrWn3XOcMYjL6YlXr43fqINQhqAyE1LKKVCk7A-guGraqTQcVuX_H6dhoGnfMZmkxQJnd1HX0udisgb6DYKMA7q-BeEi_jQL9CQ1oCMfjBk2lC"
            />
            <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-primary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border border-slate-200/10">
              Published
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 py-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-surface-container-highest text-secondary text-[10px] font-bold uppercase rounded-md tracking-wider text-slate-400 font-semibold">
                Modern Retreat
              </span>
            </div>
            <h2 className="text-[24px] text-slate-900 tracking-tight mb-1 font-extrabold text-[26px]">
              The Glasshouse
            </h2>
            <p className="text-[14px] font-medium mb-4 flex items-center gap-1 text-slate-500/80">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              Carmel, USA
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-container-highest rounded-lg text-[11px] font-medium text-secondary border border-outline-variant/30 bg-white border-slate-100 shadow-sm">
                <span className="font-bold text-on-surface">Ocean Studio</span>
                <span>•</span>
                <span>2 Guests</span>
                <span>•</span>
                <span className="text-primary font-bold">$520</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-container-highest rounded-lg text-[11px] font-medium text-secondary border border-outline-variant/30 bg-white border-slate-100 shadow-sm">
                <span className="font-bold text-on-surface">Forest Loft</span>
                <span>•</span>
                <span>1 Guest</span>
                <span>•</span>
                <span className="text-primary font-bold">$310</span>
              </div>
              <div className="flex items-center px-2.5 py-1 bg-surface-container-low rounded-lg text-[11px] font-bold text-primary border border-primary/10">
                +1 more
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center md:items-end gap-3 md:w-64 shrink-0 py-2 md:border-l border-outline-variant md:pl-6">
            <div className="flex flex-col md:items-end gap-4">
              <div className="flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-lg w-fit border border-primary/10">
                <span
                  className="material-symbols-outlined text-primary text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-extrabold text-primary text-[15px]">
                  4.8
                </span>
                <span className="text-[12px] font-medium text-slate-500 ml-1">
                  (84 Reviews)
                </span>
              </div>
              <div className="flex flex-col gap-0.5 md:items-end">
                <span className="text-[14px] font-bold text-slate-900">
                  3 Baths
                </span>
                <span className="text-[12px] font-medium text-slate-400">
                  Last updated 5 days ago
                </span>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col items-center justify-end gap-2 md:w-16 shrink-0 border-t md:border-t-0 md:border-l border-outline-variant pt-4 md:pt-0 md:pl-4">
            <button
              className="p-2 text-secondary hover:text-primary hover:bg-primary-container/50 rounded-lg transition-colors"
              title="Edit"
            >
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button
              className="p-2 text-secondary hover:text-primary hover:bg-primary-container/50 rounded-lg transition-colors"
              title="View Details"
            >
              <span className="material-symbols-outlined">visibility</span>
            </button>
            <button
              className="p-2 text-secondary hover:text-slate-900 hover:bg-surface-container-highest rounded-lg transition-colors ml-auto md:ml-0"
              title="More"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row bg-surface rounded-xl border border-outline-variant p-4 hover:shadow-xl hover:shadow-primary/5 transition-all group border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-0.5 hover:bg-slate-50/50 transition-all duration-300 md:gap-10">
          <div className="relative w-full md:w-48 h-48 md:h-auto rounded-lg overflow-hidden shrink-0">
            <img
              alt="Metropolitan Loft"
              className="w-full h-full object-cover opacity-80 grayscale-[30%] transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
              data-alt="Chic industrial loft apartment interior with exposed brick walls and large windows in Milan"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3QWa7Rgvyyn-2TTNqaD3m2g8C1qnoA3xCaAKBqozK9s_cXeL8FnUABa5UkNjLqx8aI3bETJ6z5bb4TZSWfwd5hRkPm0t2r1QzDW7RywW1faES8QXNXtn7sNg0IPC_ERRwOXJ6TL7qSbdrk1yM7rWrwUYBClS68e9p61dkI1uJTYhtm8sixUa2PE5zCaCh6DzbX2eli7sQEvJVZD_eWIrSonbHwiKxrYLt2giCQmXTZVfznKkBvxYVAoe-nT7BhPqjhOVTZgQSYMsz"
            />
            <div className="absolute top-3 left-3 bg-slate-800/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border border-slate-200/10">
              Draft
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 py-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-surface-container-highest text-secondary text-[10px] font-bold uppercase rounded-md tracking-wider text-slate-400 font-semibold">
                City Apartment
              </span>
            </div>
            <h2 className="text-[24px] text-slate-900 tracking-tight mb-1 font-extrabold text-[26px]">
              Metropolitan Loft
            </h2>
            <p className="text-[14px] font-medium mb-4 flex items-center gap-1 text-slate-500/80">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              Milan, Italy
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-container-highest rounded-lg text-[11px] font-medium text-secondary border border-outline-variant/30 bg-white border-slate-100 shadow-sm">
                <span className="font-bold text-on-surface">Main Atelier</span>
                <span>•</span>
                <span>2 Guests</span>
                <span>•</span>
                <span className="text-primary font-bold">$290</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-container-highest rounded-lg text-[11px] font-medium text-secondary border border-outline-variant/30">
                <span className="font-bold text-on-surface">Sky Nook</span>
                <span>•</span>
                <span>1 Guest</span>
                <span>•</span>
                <span className="text-primary font-bold">$180</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center md:items-end gap-3 md:w-64 shrink-0 py-2 md:border-l border-outline-variant md:pl-6">
            <div className="flex flex-col md:items-end gap-4">
              <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg w-fit border border-slate-200">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">
                  star
                </span>
                <span className="font-bold text-slate-400 text-[14px]">-</span>
                <span className="text-[12px] font-medium text-slate-400 ml-1">
                  (No Reviews)
                </span>
              </div>
              <div className="flex flex-col gap-0.5 md:items-end">
                <span className="text-[14px] font-bold text-slate-900">
                  2 Baths
                </span>
                <span className="text-[12px] font-medium text-slate-400">
                  Last updated 1 week ago
                </span>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col items-center justify-end gap-2 md:w-16 shrink-0 border-t md:border-t-0 md:border-l border-outline-variant pt-4 md:pt-0 md:pl-4">
            <button
              className="p-2 text-secondary hover:text-primary hover:bg-primary-container/50 rounded-lg transition-colors"
              title="Edit"
            >
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button
              className="p-2 text-secondary hover:text-primary hover:bg-primary-container/50 rounded-lg transition-colors"
              title="View Details"
            >
              <span className="material-symbols-outlined">visibility</span>
            </button>
            <button
              className="p-2 text-secondary hover:text-slate-900 hover:bg-surface-container-highest rounded-lg transition-colors ml-auto md:ml-0"
              title="More"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row bg-surface rounded-xl border border-outline-variant p-4 hover:shadow-xl hover:shadow-primary/5 transition-all group border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-0.5 hover:bg-slate-50/50 transition-all duration-300 md:gap-10">
          <div className="relative w-full md:w-48 h-48 md:h-auto rounded-lg overflow-hidden shrink-0">
            <img
              alt="Chamonix Peak"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-alt="Cozy luxury mountain chalet covered in snow with warm lights glowing against a dark blue evening sky in Chamonix"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkLnLwOoopbPOmrhC7jOAt237arPsdp_iWTtw6rbZLEbHczLpAuKtccTTN1FfXqjgcjUs0szj7EJnCnHhNMrge7d59JgXlIdLFGxElinFtgWCR4LtwRgm3xyVBHP44PhWtPAIRzo2rk8Ft-Mf-nJwgH1ScT4ugh0fNrYnmieN5aNw1YknL9Qq5XwjcztXYqRrwftBPU7EywyTDBOoad07rM2Sz5i5EvX4Qj4iyDsoYzLbZDJK9F_jTyMb5Ic21qeZO4m885w-wObNX"
            />
            <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-primary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border border-slate-200/10">
              Published
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 py-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-surface-container-highest text-secondary text-[10px] font-bold uppercase rounded-md tracking-wider text-slate-400 font-semibold">
                Mountain Chalet
              </span>
            </div>
            <h2 className="text-[24px] text-slate-900 tracking-tight mb-1 font-extrabold text-[26px]">
              Chamonix Peak
            </h2>
            <p className="text-[14px] font-medium mb-4 flex items-center gap-1 text-slate-500/80">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              Chamonix, France
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-container-highest rounded-lg text-[11px] font-medium text-secondary border border-outline-variant/30 bg-white border-slate-100 shadow-sm">
                <span className="font-bold text-on-surface">Summit King</span>
                <span>•</span>
                <span>2 Guests</span>
                <span>•</span>
                <span className="text-primary font-bold">$640</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-container-highest rounded-lg text-[11px] font-medium text-secondary border border-outline-variant/30 bg-white border-slate-100 shadow-sm">
                <span className="font-bold text-on-surface">Pine Room</span>
                <span>•</span>
                <span>2 Guests</span>
                <span>•</span>
                <span className="text-primary font-bold">$420</span>
              </div>
              <div className="flex items-center px-2.5 py-1 bg-surface-container-low rounded-lg text-[11px] font-bold text-primary border border-primary/10">
                +4 more
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center md:items-end gap-3 md:w-64 shrink-0 py-2 md:border-l border-outline-variant md:pl-6">
            <div className="flex flex-col md:items-end gap-4">
              <div className="flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-lg w-fit border border-primary/10">
                <span
                  className="material-symbols-outlined text-primary text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-extrabold text-primary text-[15px]">
                  5.0
                </span>
                <span className="text-[12px] font-medium text-slate-500 ml-1">
                  (215 Reviews)
                </span>
              </div>
              <div className="flex flex-col gap-0.5 md:items-end">
                <span className="text-[14px] font-bold text-slate-900">
                  6 Baths
                </span>
                <span className="text-[12px] font-medium text-slate-400">
                  Last updated 1 day ago
                </span>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col items-center justify-end gap-2 md:w-16 shrink-0 border-t md:border-t-0 md:border-l border-outline-variant pt-4 md:pt-0 md:pl-4">
            <button
              className="p-2 text-secondary hover:text-primary hover:bg-primary-container/50 rounded-lg transition-colors"
              title="Edit"
            >
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button
              className="p-2 text-secondary hover:text-primary hover:bg-primary-container/50 rounded-lg transition-colors"
              title="View Details"
            >
              <span className="material-symbols-outlined">visibility</span>
            </button>
            <button
              className="p-2 text-secondary hover:text-slate-900 hover:bg-surface-container-highest rounded-lg transition-colors ml-auto md:ml-0"
              title="More"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div> */}
      </div>
    </main>
  );
}

export default PropertyList;
