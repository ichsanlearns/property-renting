import { useState } from "react";

import type { PropertyImage } from "../types/image.type";
import ImageUpload from "../components/ImageUpload";

function FormRoom() {
  const [images, setImages] = useState<PropertyImage[]>([]);
  return (
    <main className=" m-16 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto space-y-8">
        <header className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-primary/10 flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="relative w-full md:w-48 h-32 shrink-0 rounded-2xl overflow-hidden shadow-md">
            <img
              className="w-full h-full object-cover"
              data-alt="Luxury Ocean Breeze Villa Exterior"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIoAcDN_T8iuaysK8BrMx-3SmdFEe-pnPMTg_j2qegMqEkqiPNaG5sVtqnuJkB6v2Ms9Rf53YnPXJcLReNJ1_QCMnyr3VVdPzz_Oke8dwuhAB0ht4xZo7b3IiRDIzm3OyyLyxZw9ADPbawu_y2rui-WaVyz8VB2VswELWMZVlIHkORDhMXJ8OjxpN4tU-dAgEMfysCj6tRgF_W1vlDCshjwYn9DSlOUG3HMS_pRCCMofZQKA96GW6ABvxWYsgo8LXpvXgkZRrw0Rzc"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
          </div>
          <div className="text-center md:text-left grow">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Adding room to
            </span>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              Ocean Breeze Villa
              <span className="text-slate-400 font-medium">in Malibu</span>
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-slate-500 text-sm">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>
                Point Dume, CA
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  star
                </span>
                4.98 (124 reviews)
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 rounded-xl bg-surface-container hover:bg-slate-200 text-on-surface font-bold text-sm transition-all active:scale-95">
              Cancel
            </button>
            <button className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
              Save Room
            </button>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-4xl shadow-sm border border-primary/5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
                  tune
                </span>
                <h2 className="text-xl font-bold tracking-tight">
                  Room Attributes
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Bed Type
                  </label>
                  <select className="w-full p-4 bg-surface-container border-slate-200 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all">
                    <option>King Size Bed</option>
                    <option>Queen Size Bed</option>
                    <option>Double Twin Beds</option>
                    <option>Single Bed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Bed count
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 2"
                    className="w-full p-4 bg-surface-container border-slate-200 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    View Type
                  </label>
                  <select className="w-full p-4 bg-surface-container border-slate-200 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all">
                    <option>Ocean Front</option>
                    <option>Garden View</option>
                    <option>City Skyline</option>
                    <option>Pool Side</option>
                    <option>None / Courtyard</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Bathroom Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-4 rounded-xl border-2 border-primary bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider">
                      Private
                    </button>
                    <button className="p-4 rounded-xl border-2 border-slate-100 bg-surface-container text-slate-400 text-xs font-bold uppercase tracking-wider hover:border-primary/20 transition-all">
                      Shared
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Guest Capacity
                  </label>
                  <div className="flex gap-4">
                    <input
                      className="w-full accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-4"
                      type="range"
                    />
                    <span className="w-12 h-12 bg-primary text-white flex items-center justify-center font-bold rounded-xl shrink-0 shadow-lg shadow-primary/20">
                      2
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-white p-8 rounded-4xl shadow-sm border border-primary/5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
                  grid_view
                </span>
                <h2 className="text-xl font-bold tracking-tight">
                  Room Amenities
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 transition-all">
                  <span className="material-symbols-outlined text-3xl">
                    ac_unit
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Air Con
                  </span>
                </button>
                <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface-container text-slate-500 hover:border-primary/30 border-2 border-transparent transition-all">
                  <span className="material-symbols-outlined text-3xl group-hover:text-primary">
                    tv
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Smart TV
                  </span>
                </button>
                <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 transition-all">
                  <span className="material-symbols-outlined text-3xl">
                    balcony
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Balcony
                  </span>
                </button>
                <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface-container text-slate-500 hover:border-primary/30 border-2 border-transparent transition-all">
                  <span className="material-symbols-outlined text-3xl group-hover:text-primary">
                    desk
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Workspace
                  </span>
                </button>
                <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface-container text-slate-500 hover:border-primary/30 border-2 border-transparent transition-all">
                  <span className="material-symbols-outlined text-3xl group-hover:text-primary">
                    coffee_maker
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Minibar
                  </span>
                </button>
                <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface-container text-slate-500 hover:border-primary/30 border-2 border-transparent transition-all">
                  <span className="material-symbols-outlined text-3xl group-hover:text-primary">
                    wifi
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    High Speed
                  </span>
                </button>
                <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface-container text-slate-500 hover:border-primary/30 border-2 border-transparent transition-all">
                  <span className="material-symbols-outlined text-3xl group-hover:text-primary">
                    lock
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    In-room Safe
                  </span>
                </button>
                <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-dashed border-slate-200 text-slate-300 hover:text-primary hover:border-primary/50 transition-all">
                  <span className="material-symbols-outlined text-3xl">
                    add_circle
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Add More
                  </span>
                </button>
              </div>
            </section>
            <ImageUpload value={images} onChange={setImages} max={3} />
          </div>

          <div className="space-y-8">
            <section className="sticky top-24 lg:col-span-4 space-y-6">
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
                      <option selected>Publish</option>
                      <option>Archive</option>
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
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-sm"
                  >
                    Save Property
                  </button>
                  <button
                    type="button"
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
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
                      Listing with at least 3 high-quality photos receive 60%
                      more tenant inquiries on average.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white p-4 border-t border-primary/10 flex gap-3 z-50">
          <button className="flex-1 py-4 rounded-xl bg-surface-container font-bold text-sm">
            Cancel
          </button>
          <button className="flex-2 py-4 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20">
            Save Room
          </button>
        </div>
      </div>
    </main>
  );
}

export default FormRoom;
