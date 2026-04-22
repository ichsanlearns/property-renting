import { useQuery } from "@tanstack/react-query";
import { getByTenantId } from "../api/pricing.service";
import { queryKeys } from "../../../../shared/lib/queryKeys.lib";

export const usePricing = () => {
  return useQuery({
    queryKey: queryKeys.pricing.myPricing(),
    queryFn: () => getByTenantId(),
    select: (res) => res.data,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
