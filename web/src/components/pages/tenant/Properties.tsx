import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createPropertySchema,
  type CreatePropertyPayload,
} from "../../../schemas/property.schema";

function Properties() {
  const categories = [
    { id: 1, name: "Residential" },
    { id: 2, name: "Commercial" },
    { id: 3, name: "Industrial" },
    { id: 4, name: "Land" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreatePropertyPayload>({
    resolver: zodResolver(createPropertySchema),
  });

  return (
    <main className="flex-1 p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
            <a className="hover:text-primary transition-colors" href="#">
              Properties
            </a>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-slate-900 dark:text-slate-100 font-medium">
              Add/Edit Property
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Property Management
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">save</span>
            Save Changes
          </button>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-primary">
                info
              </span>
              General Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ">
                  Property Name
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary transition-all p-3.5"
                  placeholder="e.g. Sunset Heights Apartment"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                {categories.length === 0 ? (
                  <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      add_circle
                    </span>
                    Create your first category
                  </button>
                ) : (
                  <select className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5">
                    {categories.map((category) => (
                      <option key={category.id}>{category.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5 min-h-[120px]"
                  placeholder="Describe the property highlights, amenities, and surroundings..."
                  rows={4}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-primary">
                location_on
              </span>
              Location
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    City
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5"
                    placeholder="e.g. Seattle"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Address
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5"
                    placeholder="123 Maple St, ZIP 98101"
                    type="text"
                  />
                </div>
              </div>
              <div className="relative w-full aspect-21/9 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
                <img
                  alt="Interactive Map"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwo3bT2Dse-rXfKGaZvylKcanlpO7YGCaZ0A67Sxqwk5daFWZBAfE5otahLSqlEPgMAX41x7mhCWJ-2_8UyEb5CdQ_RemRVSzSAW46tSlD4jZ0KYFdS-OQ4DPX17s9bRc-Ln39ITVOYnYHL2JD26wlM9NZUZz4hDGrVoqsuKbAWOoRQWoRwIouXfdxseUIVTRq3vB8AFOe5yOkST84FpOwvWPI1YPm5Npw68xMAlySlfjQKcj_ZO1SbZBz3eAUW2-X__iGA8_71s3W"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span
                    className="material-symbols-outlined text-primary text-5xl drop-shadow-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
                  Click on map to set pin
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Latitude
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3.5 text-slate-500"
                    readOnly
                    type="text"
                    value="47.6062"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Longitude
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3.5 text-slate-500"
                    readOnly
                    type="text"
                    value="-122.3321"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-primary">
                featured_play_list
              </span>
              Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary bg-primary/5 text-primary transition-all">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  wifi
                </span>
                <span className="text-xs font-bold">WiFi</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-transparent text-slate-500 hover:border-slate-200 transition-all">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  local_parking
                </span>
                <span className="text-xs font-bold">Parking</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary bg-primary/5 text-primary transition-all">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  ac_unit
                </span>
                <span className="text-xs font-bold">AC</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary bg-primary/5 text-primary transition-all">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  kitchen
                </span>
                <span className="text-xs font-bold">Kitchen</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-transparent text-slate-500 hover:border-slate-200 transition-all">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  fitness_center
                </span>
                <span className="text-xs font-bold">Gym</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-transparent text-slate-500 hover:border-slate-200 transition-all">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  pool
                </span>
                <span className="text-xs font-bold">Pool</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-transparent text-slate-500 hover:border-slate-200 transition-all">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  local_laundry_service
                </span>
                <span className="text-xs font-bold">Laundry</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary bg-primary/5 text-primary transition-all">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  security
                </span>
                <span className="text-xs font-bold">Security</span>
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-primary">
                photo_library
              </span>
              Property Gallery
            </h3>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer group bg-slate-50/50 dark:bg-slate-800/30">
              <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">
                  upload_file
                </span>
              </div>
              <p className="text-slate-900 dark:text-white font-bold text-base mb-1">
                Drag and drop photos here
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Support JPG, PNG, up to 10MB
              </p>
              <button className="mt-4 px-6 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-sm font-bold shadow-sm">
                Browse Files
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-8">
              <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-primary relative group overflow-hidden cursor-move">
                <img
                  alt="Modern house"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLkKO8489By6lFg4Pg85GdgqWKHbrCcCkTxnoREFmzQC1LdIGuwPDTZg8ol2C-qYGMxg1P-K2g0m7lMZn_Lm8tUVcycHlmifyxr1Q2jCDESYK3iLxgSUVlF8L1-0uxBBTgO75JkQlHXXdAnIDH9UUuQqrsMSiJhLIgh7VE1QLgxGBSzP_TWOTFsi343FKtAfVIv18AYZMzjvF0fCTDauavjCh2ATgWibpzs_Cud7tsPWGwuw6iKzkAD0RsQh2Nt8kE92R6tM7o3ndE"
                />
                <div className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Cover
                </div>
                <button className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">
                    delete
                  </span>
                </button>
              </div>
              <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative group overflow-hidden cursor-move">
                <img
                  alt="Kitchen"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr-rtXF5KrUOBzBPPSvEJJmVzrjmSM9XmILAXZrrQXLqbEgOkwmV1tBHmZ2_YxriuMyVOytsLrL1NUHrsOfPm6tp0dJiq3OiG036WCJMeFHrydacO2OAKO0YxC_nv9AMc5048HzHohWRLwVnxD_lC80kE5hnVtQRtwIOzprbtT1c8rNQ6IOHr7cdy8-8bKocHiS_g5j9pAdMj43aVcuQmvK4rYAmEOcTyQRpxaGLol2nt-XPN1InwH9NlW9oS0VLX1laPktPG6B01a"
                />
                <button className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">
                    delete
                  </span>
                </button>
              </div>
              <div className="aspect-square rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-slate-400">
                  add
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
              Location Preview
            </h3>
            <div className="w-full aspect-square rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-700">
              <img
                alt="Mini map view"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwo3bT2Dse-rXfKGaZvylKcanlpO7YGCaZ0A67Sxqwk5daFWZBAfE5otahLSqlEPgMAX41x7mhCWJ-2_8UyEb5CdQ_RemRVSzSAW46tSlD4jZ0KYFdS-OQ4DPX17s9bRc-Ln39ITVOYnYHL2JD26wlM9NZUZz4hDGrVoqsuKbAWOoRQWoRwIouXfdxseUIVTRq3vB8AFOe5yOkST84FpOwvWPI1YPm5Npw68xMAlySlfjQKcj_ZO1SbZBz3eAUW2-X__iGA8_71s3W"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary size-4 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 text-center">
              Seattle, WA 98101
            </p>
          </div>
          <div className="sticky top-48 lg:col-span-4 space-y-6">
            <div className=" bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
                Status &amp; Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    Publish Status
                  </label>
                  <select className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3 text-sm font-medium">
                    <option>Draft</option>
                    <option selected>Published</option>
                    <option>Hidden</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Accept Inquiries
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked
                      className="sr-only peer"
                      type="checkbox"
                      value=""
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              <div className="mt-8 space-y-3">
                <button className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-sm">
                  Save Property
                </button>
                <button className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">
                  lightbulb
                </span>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-sm">
                    Quick Tip
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                    Listing with at least 5 high-quality photos receive 60% more
                    tenant inquiries on average.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Properties;
