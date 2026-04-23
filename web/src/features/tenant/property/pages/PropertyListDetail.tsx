import type { GetPropertyByTenantIdResponse } from "../api/property.response";
import { useLocation } from "react-router-dom";

function PropertyListDetail() {
  const location = useLocation();
  const { property } = location.state as {
    property: GetPropertyByTenantIdResponse;
  };

  return (
    <main className="flex-1 flex flex-col min-w-0">
      <header className="md:hidden bg-surface-container-lowest/80 backdrop-blur-md flex justify-between items-center w-full px-4 py-4 sticky top-0 z-40 border-b border-primary/10">
        <h1 className="text-xl font-black tracking-tighter text-on-surface">
          Oceanic
        </h1>
        <button className="text-on-surface-variant hover:text-on-surface">
          <span className="material-symbols-outlined" data-icon="menu">
            menu
          </span>
        </button>
      </header>
      <div className="p-6 md:p-10 lg:px-12 xl:px-16 mx-auto w-full max-w-7xl flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant">
          <a className="hover:text-primary transition-colors" href="#">
            Listings2
          </a>
          <span
            className="material-symbols-outlined text-xs"
            data-icon="chevron_right"
          >
            chevron_right
          </span>
          <span className="font-medium text-on-surface">{property.name}</span>
        </nav>
        <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 flex flex-col xl:flex-row gap-8 shadow-xl shadow-primary/5 border border-primary/10">
          <div className="w-full xl:w-1/3 aspect-[4/3] rounded-xl overflow-hidden relative group">
            <img
              alt="Ocean Breeze Villa"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-alt="A luxurious modern beachfront villa with large glass windows reflecting the sunset over the ocean, surrounded by palm trees"
              src={property.coverImage}
            />
            <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="water"
              >
                water
              </span>
              {property.category}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-[30px] font-extrabold tracking-tight text-on-surface leading-tight mb-2">
                    {property.name}
                  </h2>
                  <div className="flex items-center gap-2 text-on-surface-variant font-medium">
                    <span
                      className="material-symbols-outlined text-sm"
                      data-icon="location_on"
                    >
                      location_on
                    </span>
                    {property.city}, {property.country}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-tertiary-container/30 text-tertiary border border-tertiary/20 text-xs font-bold px-2.5 py-1 rounded-md uppercase">
                    {property.isPublished ? "Published" : "Draft"}
                  </span>
                  {/* <span className="bg-surface-variant text-secondary border border-secondary/10 text-xs font-bold px-2.5 py-1 rounded-md uppercase flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      data-icon="verified"
                    >
                      verified
                    </span>
                    Verified
                  </span> */}
                </div>
              </div>
              <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary"
                    data-icon="star"
                    data-weight="fill"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-bold text-on-surface">
                    {property.averageRating || "-"}
                  </span>
                  <span className="text-on-surface-variant text-sm underline decoration-outline">
                    ({property.reviewCount ? property.reviewCount : "No"}{" "}
                    reviews)
                  </span>
                </div>
                <div className="hidden md:block w-px h-8 bg-outline"></div>
                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <span
                    className="material-symbols-outlined"
                    data-icon="bathtub"
                  >
                    bathtub
                  </span>
                  {property.numberOfBathrooms} Bathrooms
                </div>
                <div className="hidden md:block w-px h-8 bg-outline"></div>
                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <span
                    className="material-symbols-outlined"
                    data-icon="update"
                  >
                    update
                  </span>
                  Updated {new Date(property.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold border border-primary/20 text-primary hover:bg-primary-container transition-colors active:scale-[0.98] cursor-pointer">
                Edit Property
              </button>
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-primary text-on-primary hover:bg-on-primary-container shadow-md shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer hover:bg-primary/80">
                <span className="material-symbols-outlined" data-icon="add">
                  add
                </span>
                Add Room
              </button>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[24px] font-bold text-on-surface">
              Room Types
            </h3>
            <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[18px]"
                data-icon="add"
              >
                add
              </span>
              Add Room Type
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {property.roomTypes.map((roomType) => {
              const bedType = roomType.bedType
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return (
                <div className="bg-surface-container-lowest rounded-2xl shadow-xl shadow-primary/5 border border-primary/10 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-[18px] font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                        {roomType.name}
                      </h4>
                      <span className="bg-tertiary-container/30 text-tertiary border border-tertiary/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {roomType.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-on-surface-variant">
                      <div className="flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          data-icon="group"
                        >
                          group
                        </span>
                        {roomType.capacity} Guests
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          data-icon="bed"
                        >
                          bed
                        </span>
                        {roomType.bedCount} {bedType} Bed
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          data-icon="shower"
                        >
                          shower
                        </span>
                        {roomType.bathroomType} Bathroom
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-outline flex items-end justify-between">
                      <div>
                        <span className="text-lg font-extrabold text-on-surface">
                          Rp. {roomType.basePrice}
                        </span>
                        <span className="text-xs text-on-surface-variant font-medium">
                          /night
                        </span>
                      </div>
                      <div className="text-xs font-bold text-primary bg-primary-container px-2.5 py-1 rounded-md">
                        {roomType.availableRooms} Available
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container px-6 py-3 border-t border-outline flex justify-end gap-3 text-sm">
                    <button className="text-on-surface-variant hover:text-primary font-medium transition-colors">
                      Edit
                    </button>
                    <button className="text-on-surface-variant hover:text-primary font-medium transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
            {/* <div className="bg-surface-container-lowest rounded-2xl shadow-xl shadow-primary/5 border border-primary/10 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-[18px] font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                    Guest Garden Room
                  </h4>
                  <span className="bg-tertiary-container/30 text-tertiary border border-tertiary/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Published
                  </span>
                </div>
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      data-icon="group"
                    >
                      group
                    </span>
                    2 Guests
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      data-icon="bed"
                    >
                      bed
                    </span>
                    1 Queen Bed
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      data-icon="shower"
                    >
                      shower
                    </span>
                    Private Bathroom
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-outline flex items-end justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-on-surface">
                      $280
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">
                      /night
                    </span>
                  </div>
                  <div className="text-xs font-bold text-primary bg-primary-container px-2.5 py-1 rounded-md">
                    4 Available
                  </div>
                </div>
              </div>
              <div className="bg-surface-container px-6 py-3 border-t border-outline flex justify-end gap-3 text-sm">
                <button className="text-on-surface-variant hover:text-primary font-medium transition-colors">
                  Edit
                </button>
                <button className="text-on-surface-variant hover:text-primary font-medium transition-colors">
                  Manage Inventory
                </button>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl shadow-xl shadow-primary/5 border border-primary/10 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 opacity-80 hover:opacity-100">
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-[18px] font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                    Family Studio
                  </h4>
                  <span className="bg-surface-variant text-on-surface-variant border border-outline text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Draft
                  </span>
                </div>
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      data-icon="group"
                    >
                      group
                    </span>
                    4 Guests
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      data-icon="bed"
                    >
                      bed
                    </span>
                    2 Queen Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      data-icon="shower"
                    >
                      shower
                    </span>
                    Shared Bathroom
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-outline flex items-end justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-on-surface">
                      $380
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">
                      /night
                    </span>
                  </div>
                  <div className="text-xs font-bold text-on-surface-variant bg-surface-variant px-2.5 py-1 rounded-md border border-outline">
                    1 Available
                  </div>
                </div>
              </div>
              <div className="bg-surface-container px-6 py-3 border-t border-outline flex justify-end gap-3 text-sm">
                <button className="text-on-surface-variant hover:text-primary font-medium transition-colors">
                  Continue Editing
                </button>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    </main>
  );
}

export default PropertyListDetail;
