import { useState } from "react";
import PeakSeasonList from "../components/PeakSeasonList";
import { usePricing } from "../hooks/usePricing";
import { useCreatePricingRule } from "../hooks/pricing.mutation";

import { useForm } from "react-hook-form";
import {
  createPricingSchema,
  type CreatePricingPayload,
} from "../schemas/peakseason.schema";
import { zodResolver } from "@hookform/resolvers/zod";

function PeakSeason() {
  const { data: pricingRules } = usePricing();

  const createRule = useCreatePricingRule();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePricingPayload>({
    resolver: zodResolver(createPricingSchema),
  });

  const [adjustmentType, setAdjustmentType] = useState<
    "NOMINAL" | "PERCENTAGE" | null
  >(null);
  const [adjustmentDirection, setAdjustmentDirection] = useState<
    "DECREASE" | "INCREASE" | null
  >(null);
  const [openForm, setOpenForm] = useState(false);

  const onSubmit = (data: CreatePricingPayload) => {
    createRule.mutate(data, {
      onSuccess: () => {
        setOpenForm(false);
      },
    });
  };

  const handleAdjustmentTypeChange = (type: "NOMINAL" | "PERCENTAGE") => {
    setAdjustmentType(type);
    setValue("adjustmentType", type);
  };

  const handleAdjustmentDirectionChange = (
    direction: "DECREASE" | "INCREASE",
  ) => {
    setAdjustmentDirection(direction);
    setValue("adjustmentDirection", direction);
  };

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
        {openForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpenForm(false)}
            />
            <div className="relative w-full max-w-lg mx-4 bg-surface rounded-xl border border-outline shadow-lg flex flex-col">
              <div className="bg-surface-container-low px-5 py-4 border-b border-outline flex justify-between items-center">
                <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    add_circle
                  </span>
                  Create Pricing Rule
                </h3>

                <button onClick={() => setOpenForm(false)}>✕</button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit, (err) => {
                  console.error(err);
                })}
                className="p-5 flex flex-col gap-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1.5">
                    Rule Name
                  </label>
                  <input
                    {...register("name")}
                    className="w-full border border-outline rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none transition-shadow bg-surface-bright"
                    placeholder="e.g., Holiday Surge"
                    type="text"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
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
                      {...register("priority", {
                        valueAsNumber: true,
                      })}
                      className="w-20 border border-outline rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none bg-surface-bright text-center font-medium"
                      min="1"
                      type="number"
                      defaultValue={1}
                    />

                    <p className="text-xs text-on-surface-variant flex-1">
                      Lower numbers apply first within the same scope.
                    </p>
                  </div>
                  {errors.priority && (
                    <span className="text-red-500 text-sm">
                      {errors.priority.message}
                    </span>
                  )}
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
                        {...register("startDate")}
                        className="w-full border border-outline rounded-md pl-9 pr-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none bg-surface-bright text-on-surface"
                        type="date"
                      />
                      {errors.startDate && (
                        <span className="text-red-500 text-sm">
                          {errors.startDate.message}
                        </span>
                      )}
                    </div>
                    <span className="text-on-surface-variant self-center font-medium">
                      to
                    </span>
                    <div className="flex-1 relative">
                      <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-on-surface-variant text-[18px]">
                        calendar_month
                      </span>
                      <input
                        {...register("endDate")}
                        className="w-full border border-outline rounded-md pl-9 pr-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none bg-surface-bright text-on-surface"
                        type="date"
                      />
                      {errors.endDate && (
                        <span className="text-red-500 text-sm">
                          {errors.endDate.message}
                        </span>
                      )}
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
                        onClick={() =>
                          handleAdjustmentDirectionChange("INCREASE")
                        }
                        className={`flex-1 flex justify-center items-center py-1.5 text-xs font-medium rounded-md ${
                          adjustmentDirection === "INCREASE"
                            ? "bg-surface shadow-sm text-tertiary"
                            : "text-on-surface-variant hover:text-error"
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] mr-1">
                          arrow_upward
                        </span>
                        Inc
                      </button>
                      <button
                        onClick={() =>
                          handleAdjustmentDirectionChange("DECREASE")
                        }
                        className={`flex-1 flex justify-center items-center py-1.5 text-xs font-medium rounded-md ${
                          adjustmentDirection === "DECREASE"
                            ? "bg-surface shadow-sm text-error"
                            : "text-on-surface-variant hover:text-error"
                        }`}
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
                        onClick={() => handleAdjustmentTypeChange("PERCENTAGE")}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md ${
                          adjustmentType === "PERCENTAGE"
                            ? "bg-surface shadow-sm text-tertiary"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                        type="button"
                      >
                        %
                      </button>
                      <button
                        onClick={() => handleAdjustmentTypeChange("NOMINAL")}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md ${
                          adjustmentType === "NOMINAL"
                            ? "bg-surface shadow-sm text-tertiary"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                        type="button"
                      >
                        $
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      {...register("adjustmentValue", {
                        valueAsNumber: true,
                      })}
                      className="w-full border border-outline rounded-md px-3 py-2 text-lg font-bold focus:ring-primary focus:border-primary outline-none bg-surface-bright text-on-surface text-right pr-8"
                      placeholder="0"
                      type="number"
                    />
                    {errors.adjustmentValue && (
                      <span className="text-red-500 text-sm">
                        {errors.adjustmentValue.message}
                      </span>
                    )}
                    <span className="absolute right-3 top-2.5 text-on-surface-variant font-bold">
                      {adjustmentType === "PERCENTAGE" ? "%" : "IDR"}
                    </span>
                  </div>
                </div>
                <div className="pt-4 mt-2 border-t border-outline">
                  <button
                    className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-on-primary font-bold py-2.5 rounded-md shadow-sm transition-colors flex justify-center items-center gap-2"
                    type="submit"
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
        )}
      </div>
    </main>
  );
}

export default PeakSeason;
