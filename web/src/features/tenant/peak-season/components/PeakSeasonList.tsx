import { format } from "date-fns";
import type { GetByTenantIdResponse } from "../api/pricing.response";

function PeakSeasonList({
  pricingRules,
}: {
  pricingRules: GetByTenantIdResponse[];
}) {
  return (
    <div className="flex-1 flex gap-6 overflow-hidden">
      <div className="w-full lg:w-full bg-surface border border-outline rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-container-low border-b border-outline text-on-surface-variant font-medium">
              <tr>
                <th className="pl-20 py-4">Status</th>
                <th className="px-6 py-4">Scope &amp; Name</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 group relative">
                    Priority
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant/70 cursor-help">
                      info
                    </span>
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-inverse-surface text-inverse-on-surface text-xs rounded shadow-lg z-10 whitespace-normal text-center">
                      Priority only applies within the same scope
                    </div>
                  </div>
                </th>
                <th className="pr-20 py-4 text-right">Adjustment</th>
                {/* <th className="px-6 py-4 text-center">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline">
              {pricingRules.map((pricingRule) => {
                return (
                  <tr className="hover:bg-surface-variant transition-colors group border-l-4 border-l-primary relative">
                    <td className="pl-16 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-tertiary-container text-on-tertiary-container border border-tertiary/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            settings
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-base">
                            {pricingRule.name}
                          </p>
                          <p className="text-sm text-on-surface-variant mt-0.5 font-medium">
                            (Default: system)
                          </p>
                          <p className="text-[11px] text-on-surface-variant/80 mt-0.5">
                            Overrides Property &amp; Global
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-on-surface font-medium">
                        {format(pricingRule.startDate, "MMM dd, yyyy")} -{" "}
                        {format(pricingRule.endDate, "MMM dd, yyyy")}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {new Date(pricingRule.endDate).getDate() -
                          new Date(pricingRule.startDate).getDate()}{" "}
                        days
                      </p>
                    </td>
                    <td className="pl-12 py-4">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-surface-container-high text-on-surface text-xs font-bold border border-outline">
                        {pricingRule.priority}
                      </span>
                    </td>
                    <td className="pr-24 py-4 text-right">
                      <span
                        className={`font-bold ${
                          pricingRule.adjustmentDirection === "DECREASE"
                            ? "text-error"
                            : "text-tertiary"
                        } text-base`}
                      >
                        {pricingRule.adjustmentDirection === "DECREASE"
                          ? "-"
                          : "+"}
                        {pricingRule.adjustmentValue}%
                      </span>
                    </td>
                    {/* <td className="px-6 py-4 text-center">
                            <button className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary-container/10">
                              <span className="material-symbols-outlined text-[20px]">
                                edit
                              </span>
                            </button>
                            <button className="text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-full hover:bg-error-container/50 ml-1">
                              <span className="material-symbols-outlined text-[20px]">
                                delete
                              </span>
                            </button>
                          </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PeakSeasonList;
