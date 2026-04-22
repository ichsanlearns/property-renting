import { format } from "date-fns";
import type { GetByTenantIdResponse } from "../api/pricing.response";

type Level = "SYSTEM" | "TENANT";

const LEVEL_CONFIG = {
  SYSTEM: {
    icon: "settings",
    container: "bg-surface-variant text-on-surface-variant",
    fill: true,
    subtitle: "(Default: system)",
    description: "Fallback to this if no other rules apply",
  },
  TENANT: {
    icon: "domain",
    container: "bg-secondary-container text-on-secondary-container",
    fill: false,
    subtitle: "(Default: tenant)",
    description: "Overrides Global",
  },
  //   PROPERTY: {
  //     icon: "home_work",
  //     container: "bg-surface-container-highest text-on-surface",
  //   },
  //   ROOM: {
  //     icon: "bed",
  //     container: "bg-primary-container/20 text-primary",
  //     fill: true,
  //   },
} as const;

const STATUS_CONFIG = {
  active: {
    label: "Active",
    container:
      "bg-tertiary-container text-on-tertiary-container border border-tertiary/20",
    type: "dot",
    value: "bg-tertiary",
  },
  upcoming: {
    label: "Upcoming",
    container:
      "bg-secondary-container text-on-secondary-container border border-secondary/20",
    type: "icon",
    value: "schedule",
  },
} as const;

function PeakSeasonList({
  pricingRules,
}: {
  pricingRules: GetByTenantIdResponse[];
}) {
  return (
    <div className="flex-1 flex gap-6 overflow-hidden w-full">
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
                {/* <th className="px-6 py-4 text-centesr">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline">
              {pricingRules.map((pricingRule) => {
                const checkStatus = pricingRule.isActive
                  ? "active"
                  : "upcoming";

                const level = LEVEL_CONFIG[pricingRule.scopeType as Level];
                const status = STATUS_CONFIG[checkStatus];
                return (
                  <tr className="hover:bg-surface-variant transition-colors group">
                    <td className="pl-20 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.container}`}
                      >
                        {status.type === "dot" ? (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${status.value}`}
                          />
                        ) : (
                          <span className="material-symbols-outlined text-[14px]">
                            {status.value}
                          </span>
                        )}
                        {status.label}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${level.container}`}
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontVariationSettings: level.fill
                                ? "'FILL' 1"
                                : "'FILL' 0",
                            }}
                          >
                            {level.icon}
                          </span>
                        </div>

                        <div>
                          <p className="font-bold text-on-surface text-base">
                            {pricingRule.name}
                          </p>
                          <p className="text-sm text-on-surface-variant mt-0.5 font-medium">
                            {pricingRule.scopeType === "SYSTEM"
                              ? "(Default: system)"
                              : pricingRule.name}
                          </p>

                          <p className="text-[11px] text-on-surface-variant/80 mt-0.5">
                            {level.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-on-surface font-medium">
                        {format(
                          new Date(pricingRule.startDate),
                          "MMM dd, yyyy",
                        )}{" "}
                        -{" "}
                        {format(new Date(pricingRule.endDate), "MMM dd, yyyy")}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {new Date(pricingRule.endDate).getDate() -
                          new Date(pricingRule.startDate).getDate()}{" "}
                        days
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-surface-container-high text-on-surface text-xs font-bold border border-outline">
                        {pricingRule.priority}
                      </span>
                    </td>

                    <td className="pr-24 py-4 text-right">
                      <span
                        className={`font-bold ${
                          pricingRule.adjustmentDirection === "INCREASE"
                            ? "text-tertiary"
                            : "text-primary"
                        }`}
                      >
                        {pricingRule.adjustmentDirection === "INCREASE"
                          ? "+"
                          : "-"}
                        {pricingRule.adjustmentType === "PERCENTAGE"
                          ? `${pricingRule.adjustmentValue}%`
                          : `Rp. ${pricingRule.adjustmentValue}`}
                      </span>
                    </td>

                    {/* <td className="px-6 py-4 text-center">
                      <button
                        onClick={pricingRule.onEdit}
                        className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary-container/10"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>

                      <button
                        onClick={pricingRule.onDelete}
                        className="text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-full hover:bg-error-container/50 ml-1"
                      >
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
