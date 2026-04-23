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
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-xl shadow-primary/5 border border-primary/10 flex flex-col gap-4">
            <h3 className="text-[20px] font-bold text-on-surface">
              Property Description
            </h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              Experience unparalleled coastal luxury at Ocean Breeze Villa. This
              architectural masterpiece offers sweeping panoramic views of the
              Pacific Ocean, featuring floor-to-ceiling glass walls that
              seamlessly blend indoor and outdoor living. Enjoy direct access to
              a private stretch of pristine sandy beach, a zero-edge infinity
              pool, and a fully equipped chef's kitchen. Perfect for discerning
              travelers seeking tranquility and sophistication in the heart of
              Malibu.
            </p>
            <div className="mt-4 pt-4 border-t border-outline flex items-start gap-3 text-sm">
              <span
                className="material-symbols-outlined text-primary mt-0.5"
                data-icon="signpost"
              >
                signpost
              </span>
              <div>
                <p className="font-bold text-on-surface">Full Address</p>
                <p className="text-on-surface-variant">
                  21400 Pacific Coast Highway, Malibu, CA 90265, United States
                </p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xl shadow-primary/5 border border-primary/10 overflow-hidden relative aspect-square lg:aspect-auto h-full">
            <img
              alt="Map location"
              className="absolute inset-0 w-full h-full object-cover"
              data-alt="A stylized roadmap centered on coastal highway with a prominent red pin marker indicating a specific beachfront location"
              data-location="Malibu, USA"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9Ble22Iq5BtcJohzqr-HCJw1O-k6M91e8IfOE2YlGua-WTHyMqDG2PCN2hi-WQqRRMC9G8hwirSmeGXrsYtvPgUfbtv-t7GuW9OVSft3_ayhAovGCuC700BEgvy9YYsWdodK0ijq9Mel_m_Z1Mc5qmTVl3sMapF0wvo1XuEg1tou_EhFbO8w8YE2ZXHbGfXHfGWByuwihnPTwgckght_VcRN6_QDK0ejn1T7w1ERqL8U2OurJEIrY620L8C72M3WwKA6rriR3t7WF"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md rounded-xl p-3 shadow-md border border-primary/5 text-sm font-medium flex items-center justify-between">
              <span className="text-on-surface truncate">View on Maps</span>
              <span
                className="material-symbols-outlined text-primary"
                data-icon="open_in_new"
              >
                open_in_new
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PropertyListDetail;
