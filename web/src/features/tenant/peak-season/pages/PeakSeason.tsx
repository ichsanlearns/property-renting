import { useState } from "react";
import PeakSeasonList from "../components/PeakSeasonList";
import { usePricing } from "../hooks/usePricing";

function PeakSeason() {
  const { data: pricingRules } = usePricing();

  const [openForm, setOpenForm] = useState(false);

  return (
    <main className="flex-1 overflow-hidden mt-16 flex flex-col p-6 bg-surface-dim">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-on-surface tracking-tight">
            Pricing Rules
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Manage dynamic pricing adjustments across your portfolio.
          </p>
        </div>
        <button
          onClick={() => setOpenForm(!openForm)}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
        >
          {openForm ? (
            <span className="material-symbols-outlined text-sm">close</span>
          ) : (
            <span className="material-symbols-outlined text-sm">add</span>
          )}
          {openForm ? "Close" : "New Rule"}
        </button>
      </div>
      <div className="flex-1 flex items-start gap-6 overflow-hidden">
        {pricingRules && <PeakSeasonList pricingRules={pricingRules} />}
        <div
          className={`w-full lg:w-[30%] lg:sticky lg:top-24 bg-surface rounded-xl border border-outline shadow-sm overflow-hidden flex-col h-max transition-all duration-500 ease-in-out ${
            openForm
              ? "flex opacity-100 translate-x-0 pointer-events-auto"
              : "hidden opacity-0 translate-x-10 pointer-events-none"
          }`}
        >
          <div className="bg-surface-container-low px-5 py-4 border-b border-outline">
            <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                add_circle
              </span>
              Create Pricing Rule
            </h3>
          </div>
          <form className="p-5 flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">
                Rule Name
              </label>
              <input
                className="w-full border border-outline rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none transition-shadow bg-surface-bright"
                placeholder="e.g., Holiday Surge"
                type="text"
              />
              <label className="block text-sm font-semibold text-on-surface mt-4 mb-1.5">
                Scope
              </label>
              <div className="flex bg-surface-container rounded-md p-1 border border-outline-variant">
                <button
                  className="flex-1 px-2 py-1.5 text-xs font-medium rounded-md bg-surface shadow-sm text-on-surface text-center"
                  type="button"
                >
                  All Properties
                </button>
                <button
                  className="flex-1 px-2 py-1.5 text-xs font-medium rounded-md text-on-surface-variant hover:text-on-surface text-center"
                  type="button"
                >
                  Specific Property
                </button>
                <button
                  className="flex-1 px-2 py-1.5 text-xs font-medium rounded-md text-on-surface-variant hover:text-on-surface text-center"
                  type="button"
                >
                  Specific Room
                </button>
              </div>
            </div>
            <div className="p-4 rounded-md bg-surface-variant-light/50 border border-outline-variant/50">
              <p className="text-sm text-on-surface-variant mb-2">
                Applies to all properties in the portfolio.
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">
                Priority
              </label>
              <div className="flex items-center gap-3">
                <input
                  className="w-20 border border-outline rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none bg-surface-bright text-center font-medium"
                  min="1"
                  type="number"
                  value="1"
                />
                <p className="text-xs text-on-surface-variant flex-1">
                  Lower numbers apply first within the same scope.
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">
                Period
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-on-surface-variant text-[18px]">
                    calendar_month
                  </span>
                  <input
                    className="w-full border border-outline rounded-md pl-9 pr-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none bg-surface-bright text-on-surface"
                    type="date"
                  />
                </div>
                <span className="text-on-surface-variant self-center font-medium">
                  to
                </span>
                <div className="flex-1 relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-on-surface-variant text-[18px]">
                    calendar_month
                  </span>
                  <input
                    className="w-full border border-outline rounded-md pl-9 pr-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none bg-surface-bright text-on-surface"
                    type="date"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">
                Adjustment
              </label>
              <div className="flex gap-2 mb-3">
                <div className="flex bg-surface-container rounded-md p-1 border border-outline-variant w-1/2">
                  <button
                    className="flex-1 flex justify-center items-center py-1.5 text-xs font-medium rounded-md bg-surface shadow-sm text-tertiary"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px] mr-1">
                      arrow_upward
                    </span>
                    Inc
                  </button>
                  <button
                    className="flex-1 flex justify-center items-center py-1.5 text-xs font-medium rounded-md text-on-surface-variant hover:text-error"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px] mr-1">
                      arrow_downward
                    </span>
                    Dec
                  </button>
                </div>
                <div className="flex bg-surface-container rounded-md p-1 border border-outline-variant w-1/2">
                  <button
                    className="flex-1 py-1.5 text-xs font-medium rounded-md bg-surface shadow-sm text-on-surface"
                    type="button"
                  >
                    %
                  </button>
                  <button
                    className="flex-1 py-1.5 text-xs font-medium rounded-md text-on-surface-variant hover:text-on-surface"
                    type="button"
                  >
                    $
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  className="w-full border border-outline rounded-md px-3 py-2 text-lg font-bold focus:ring-primary focus:border-primary outline-none bg-surface-bright text-on-surface text-right pr-8"
                  placeholder="0"
                  type="number"
                />
                <span className="absolute right-3 top-2.5 text-on-surface-variant font-bold">
                  %
                </span>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-outline">
              <button
                className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-2.5 rounded-md shadow-sm transition-colors flex justify-center items-center gap-2"
                type="button"
              >
                Save Pricing Rule
              </button>
              <p className="text-[11px] text-on-surface-variant mt-3 text-center leading-tight bg-surface-variant-light/50 p-2 rounded border border-outline/50">
                <span className="font-semibold block mb-0.5">
                  Hierarchy Note:
                </span>
                More specific rules override broader ones:
                <br />
                Room &gt; Property &gt; All Properties
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default PeakSeason;
