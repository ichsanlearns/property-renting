import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as PricingService from "../api/pricing.service";
import toast from "react-hot-toast";
import { queryKeys } from "../../../../shared/lib/queryKeys.lib";

export const useCreatePricingRule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: PricingService.CreatePricingRulePayload) =>
      PricingService.createPricingRule(input),
    onMutate: () => {
      toast.loading("Creating pricing rule...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Pricing rule created successfully");
      queryClient.invalidateQueries({
        queryKey: queryKeys.pricing.myPricing(),
      });
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || "Failed to create pricing rule",
      );
    },
  });
};
