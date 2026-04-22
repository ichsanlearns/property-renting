import PeakSeasonList from "../components/PeakSeasonList";
import { usePricing } from "../hooks/usePricing";

function PeakSeason() {
  const { data: pricingRules } = usePricing();

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
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span>
          New Rule
        </button>
      </div>
      {pricingRules && <PeakSeasonList pricingRules={pricingRules} />}
    </main>
  );
}

export default PeakSeason;
