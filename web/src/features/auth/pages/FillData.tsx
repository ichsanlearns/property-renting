import { useState } from "react";

function FillData() {
  const [role, setRole] = useState<"CUSTOMER" | "TENANT">("CUSTOMER");

  return (
    <div className="bg-background text-on-surface min-h-screen flex">
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="md:hidden fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <span className="text-primary text-2xl font-extrabold tracking-tight">
              Coral Horizon
            </span>
            <span
              className="material-symbols-outlined text-primary"
              data-icon="menu"
            >
              menu
            </span>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-linear-to-b from-slate-100/50 to-transparent">
          <div className="w-full max-w-xl bg-surface rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100/50">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Step 2 of 2
              </span>
              <h2 className="text-3xl font-extrabold text-on-surface mt-4 tracking-tight">
                Tell us a bit about you
              </h2>
              <p className="text-on-surface-variant text-base mt-2">
                Help us personalize your experience
              </p>
            </div>
            <div className="mb-8">
              <div className="bg-surface-container p-1 rounded-full flex gap-1 items-center">
                <button
                  onClick={() => setRole("CUSTOMER")}
                  className={`flex-1 py-3 px-4 rounded-full text-sm font-bold ${role === "CUSTOMER" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:bg-white/50"} transition-all`}
                >
                  Customer
                </button>
                <button
                  onClick={() => setRole("TENANT")}
                  className={`flex-1 py-3 px-4 rounded-full text-sm font-bold ${role === "TENANT" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:bg-white/50"} transition-all`}
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    data-icon="business"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    business
                  </span>
                  Tenant
                </button>
              </div>
              {role === "TENANT" && (
                <div className="flex items-center gap-2 mt-3 px-4">
                  <span
                    className="material-symbols-outlined text-primary text-sm"
                    data-icon="info"
                  >
                    info
                  </span>
                  <p className="text-xs font-medium text-on-surface-variant">
                    List and manage your properties
                  </p>
                </div>
              )}
            </div>
            <form className="space-y-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-white shadow-lg overflow-hidden transition-transform group-hover:scale-105">
                    <span
                      className="material-symbols-outlined text-4xl text-slate-400"
                      data-icon="add_a_photo"
                    >
                      add_a_photo
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md">
                    <span
                      className="material-symbols-outlined text-xs"
                      data-icon="edit"
                    >
                      edit
                    </span>
                  </div>
                </div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-3">
                  Profile Photo
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">
                    First Name *
                  </label>
                  <input
                    className="w-full px-5 py-4 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary rounded-2xl text-sm font-medium placeholder:text-slate-400 transition-all"
                    placeholder="e.g. Julian"
                    type="text"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">
                    Last Name *
                  </label>
                  <input
                    className="w-full px-5 py-4 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary rounded-2xl text-sm font-medium placeholder:text-slate-400 transition-all"
                    placeholder="e.g. Sterling"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">
                  Phone Number (Optional)
                </label>
                <input
                  className="w-full px-5 py-4 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary rounded-2xl text-sm font-medium placeholder:text-slate-400 transition-all"
                  placeholder="087812345678"
                  type="tel"
                />
              </div>
              {role === "TENANT" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">
                    Property / Business Name (Optional)
                  </label>
                  <input
                    className="w-full px-5 py-4 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary rounded-2xl text-sm font-medium placeholder:text-slate-400 transition-all"
                    placeholder="e.g. Azure Bay Rentals"
                    type="text"
                  />
                  <p className="text-[11px] text-slate-400 px-1 mt-1">
                    You can add more details about your property later.
                  </p>
                </div>
              )}
              <div className="pt-6">
                <button
                  className="w-full py-4 bg-primary text-white rounded-full font-bold text-base shadow-primary/25 shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                  type="submit"
                >
                  Continue
                  <span
                    className="material-symbols-outlined"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </button>
                <button
                  className="w-full mt-4 py-3 text-on-surface-variant hover:text-on-surface text-sm font-semibold transition-colors"
                  type="button"
                >
                  Skip for now
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FillData;
