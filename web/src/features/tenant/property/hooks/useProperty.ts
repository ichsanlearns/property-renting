import { useQuery } from "@tanstack/react-query";

import { getPropertyByIdBasic } from "../api/property.service";
import { queryKeys } from "../../../../shared/lib/queryKeys.lib";

export const usePropertyBasic = (propertyId: string) => {
  return useQuery({
    queryKey: queryKeys.property.basic(propertyId),
    queryFn: () => getPropertyByIdBasic(propertyId),
    select: (res) => res.data,
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000,
  });
};
