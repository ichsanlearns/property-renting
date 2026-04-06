import { useParams } from "react-router-dom";
import { usePropertyDetail } from "../../tenant/property/hooks/useProperty";

function PropertyDetail() {
  const { propertyId } = useParams() as { propertyId: string };
  const { data: property } = usePropertyDetail({ propertyId });

  return (
    <div className="bg-background text-on-surface antialiased">
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-24">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">
            {property?.name}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm font-semibold">
              <span className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-primary text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                {property?.averageRating ?? 0} ·{" "}
                <span className="underline cursor-pointer">
                  {property?.reviewCount ?? 0} reviews
                </span>
              </span>
              <span className="text-on-surface-variant">·</span>
              <span className="underline cursor-pointer">
                {property?.city}, {property?.province}, {property?.country}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-surface-container rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">
                  ios_share
                </span>
                <span className="text-sm font-bold">Share</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-surface-container rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">
                  favorite
                </span>
                <span className="text-sm font-bold">Save</span>
              </button>
            </div>
          </div>
        </header>
        <section
          className={`grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[500px] mb-12 rounded-2xl overflow-hidden group`}
        >
          {property?.images.map((image, index) => (
            <div
              key={index}
              className={`${image.isCover && "md:col-span-2 md:row-span-2"} overflow-hidden relative`}
            >
              <img
                alt="Main villa view"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                data-alt="Modern white beachfront villa with palm trees"
                src={image.imageUrl}
              />
            </div>
          ))}
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex justify-between items-start border-b border-primary/10 pb-8 mb-8">
                <div>
                  <h2 className="text-2xl font-bold">
                    Entire {property?.category.name} hosted by{" "}
                    {property?.tenant.firstName}
                  </h2>
                  <p className="text-on-surface-variant font-medium mt-1">
                    10 guests · 5 bedrooms · 6 beds ·{" "}
                    {property?.numberOfBathrooms} baths
                  </p>
                </div>
                <div className="relative">
                  <img
                    className="w-14 h-14 rounded-full object-cover border border-primary/10"
                    data-alt="Friendly female host portrait Sarah"
                    src={
                      property?.tenant.profileImage ||
                      `https://ui-avatars.com/api/?name=${property?.tenant.firstName}`
                    }
                  />
                  <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1 border-2 border-white">
                    <span
                      className="material-symbols-outlined text-[12px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-2xl text-on-surface">
                    beach_access
                  </span>
                  <div>
                    <h3 className="font-bold">Beachfront luxury</h3>
                    <p className="text-on-surface-variant text-sm mt-0.5">
                      Direct private access to Zuma Beach with sunset views.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-2xl text-on-surface">
                    key
                  </span>
                  <div>
                    <h3 className="font-bold">Self check-in</h3>
                    <p className="text-on-surface-variant text-sm mt-0.5">
                      Check yourself in with the high-security keypad.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-2xl text-on-surface">
                    location_on
                  </span>
                  <div>
                    <h3 className="font-bold">Great location</h3>
                    <p className="text-on-surface-variant text-sm mt-0.5">
                      100% of recent guests gave the location a 5-star rating.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-6">Where you'll sleep</h2>
              <div className="flex flex-col gap-4">
                <div className="flex bg-surface-container-lowest rounded-xl border border-primary/10 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-1/3 aspect-4/3 relative">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="Luxury master suite with ocean view"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNFgtW4CWvDHWvY-nNMM_63NZrd6ZGDVqusBPOias7qisl3YWBXYFXG2qWBEewWgsZW8cwFksmyn3DjrAOH2bKXvgzxpqBl_aFWyCIWwiKGFSayktigbmSpMcUZcj-meqCQ5lHvN-I1gAW64SI3Tpbm8E72cTYk4szHXdxiXC3RIgy7dYlTwl7ORe6kChL4OvOTZc8ROjqKNM-HRB3YuWhqJaJR3P4oAKU_tcYWgzWUoiVE0yu85OAIqOBNjuTM9smgMQz12TklQnL"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                      +3 photos
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between w-2/3">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Master Suite</h3>
                        <span className="text-primary font-bold text-sm">
                          $450/night
                        </span>
                      </div>
                      <p className="text-on-surface-variant text-sm mt-1">
                        King bed · Ocean view · En-suite
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant text-lg">
                        bed
                      </span>
                      <span className="material-symbols-outlined text-on-surface-variant text-lg">
                        bathtub
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex bg-white rounded-xl border-2 border-primary overflow-hidden relative shadow-xl shadow-primary/10">
                  <div className="w-1/3 aspect-4/3 relative">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="Cozy guest suite with garden view"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB13Rf8Lpn9C4ffn9M2yMSzlkXrHa15KENVrM-19ay66RoKNwhrDsZ5v8_9x-rp8gLS_8Eo4fpzQEqmR4m7jetYC1hXcFVDPmhU0GukR0vqATtdKl4uLpKIBNb9MqC2oxowgGCu3MdDqF9QabxZHRAhHgJsBg8NDjyhPKenrn7DITfLUIZLeKuqrVR2mOfQ29lNM2G0qjVLHmlPn9pjvNaUxtuIbrgl2edzlR-WEfWyPZeOuqVsXyZt-OnrRXDK1F7l3P8S4V2QBRXy"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                      +3 photos
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between w-2/3">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Guest Suite</h3>
                        <span className="text-primary font-extrabold text-sm">
                          $380/night
                        </span>
                      </div>
                      <p className="text-on-surface-variant text-sm mt-1">
                        Queen bed · Garden view · Private
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-lg">
                          bed
                        </span>
                        <span className="material-symbols-outlined text-on-surface-variant text-lg">
                          lock
                        </span>
                      </div>
                      <span className="bg-primary text-white px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wide">
                        Selected
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex bg-surface-container-lowest rounded-xl border border-primary/10 overflow-hidden cursor-pointer shadow-lg transform transition-transform duration-300">
                  <div className="w-1/3 aspect-4/3 overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover scale-110"
                      data-alt="Minimalist garden studio"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcDLLVQrOylPqeiPNIxfloWw2CfmGQh6znggU7ZhOnHfrozWoJUDmE8XRstCz2Ak4W0DqtBDYrrF7Jb02Byl6NEShBucIKlG_1NkjKhtj47M1EIlkZzyfbUMyw_CQ_JggrDtm7i3-bcksq9jgozScGFiWGWm7aMN8dJdPB_dpI0aW-KTsuJ_x43zCURyjqdmE6jxTb_7TCn1oaZw92vnBEoLJgvu7W_xVIP0I7ttjIhqQg3u3OeJQKHC1u559B6WUEVhzZXwvyvA2k"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                      +3 photos
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between w-2/3">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Garden Studio</h3>
                        <span className="text-primary font-bold text-sm">
                          $250/night
                        </span>
                      </div>
                      <p className="text-on-surface-variant text-sm mt-1">
                        Twin bed · Garden view · Shared bath
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant text-lg">
                        single_bed
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex bg-surface-container-highest/30 rounded-xl border border-primary/5 overflow-hidden grayscale relative opacity-60">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-10">
                    <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-slate-900 border border-slate-200">
                      Unavailable
                    </span>
                  </div>
                  <div className="w-1/3 aspect-4/3 relative">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="Poolside cabana room"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyI4P2oFgSZJxNQLG4bea26CjfX-UgF9rcfHmRlHX3brzKeGYm9zTx62wtP04tRpATQVP6BPj15y6dj2fZtcAc6zW8F1FM2rNu-9b0Fw-xfhRu7MKfbVGGsrDRAOHD-USAQ9Z_y719i0PhhVm6fEfEoyP58LOx4noHzG-ToUMhDIGmWcKgZjSmAKIt_oH3xy5Y8l9Vg1N4R3w3j-_n_EEmR5wA-Qr5XBgbvNpBz6CvO3TzS-0SPfOxaIx28gBCcrMIPckXmXdgDGHy"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                      +3 photos
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between w-2/3">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Poolside Cabana</h3>
                        <span className="text-slate-400 font-bold text-sm line-through">
                          $300/night
                        </span>
                      </div>
                      <p className="text-on-surface-variant text-sm mt-1">
                        Sofa bed · Direct pool access
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-xl shadow-primary/5 border border-primary/10">
              <div className="flex justify-between items-baseline mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-on-surface">
                    $380
                  </span>
                  <span className="text-on-surface-variant text-sm font-medium">
                    night
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <span
                    className="material-symbols-outlined text-primary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.92
                </div>
              </div>
              <div className="border border-slate-300 rounded-xl mb-6 overflow-hidden">
                <div className="grid grid-cols-2 border-b border-slate-300">
                  <div className="p-3 border-r border-slate-300 hover:bg-slate-50 cursor-pointer">
                    <label className="block text-[10px] font-extrabold text-on-surface uppercase tracking-wider">
                      Check-in
                    </label>
                    <span className="text-sm font-medium">Oct 12, 2023</span>
                  </div>
                  <div className="p-3 hover:bg-slate-50 cursor-pointer">
                    <label className="block text-[10px] font-extrabold text-on-surface uppercase tracking-wider">
                      Check-out
                    </label>
                    <span className="text-sm font-medium">Oct 17, 2023</span>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer">
                  <label className="block text-[10px] font-extrabold text-on-surface uppercase tracking-wider">
                    Selected Room
                  </label>
                  <span className="text-sm font-bold text-primary">
                    Guest Suite
                  </span>
                </div>
              </div>
              <button className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-extrabold text-lg shadow-md active:scale-[0.98] transition-all hover:opacity-95 mb-6">
                Reserve Room
              </button>
              <p className="text-center text-on-surface-variant text-sm mb-6">
                You won't be charged yet
              </p>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="underline text-on-surface-variant font-medium">
                    $380 x 5 nights
                  </span>
                  <span className="font-medium">$1,900</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="underline text-on-surface-variant font-medium">
                    Oceanic service fee
                  </span>
                  <span className="font-medium">$285</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="underline text-on-surface-variant font-medium">
                    Occupancy taxes &amp; fees
                  </span>
                  <span className="font-medium">$205</span>
                </div>
                <hr className="border-primary/10" />
                <div className="flex justify-between text-lg font-extrabold">
                  <span>Total</span>
                  <span>$2,390</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PropertyDetail;
