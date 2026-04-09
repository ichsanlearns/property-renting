import { useQuery } from "@tanstack/react-query";

import {
  getPropertyById,
  getPropertyByIdBasic,
  getPropertyRoomPricesDate,
} from "../api/property.service";
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

export const usePropertyDetail = ({ propertyId }: { propertyId: string }) => {
  return useQuery({
    queryKey: queryKeys.property.detail(propertyId),
    queryFn: () => getPropertyById(propertyId),
    select: (res) => res.data,
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePropertyRoomPricesDate = ({
  propertyId,
  startDate,
  endDate,
}: {
  propertyId: string;
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: queryKeys.property.roomPricesDate(propertyId, startDate, endDate),
    queryFn: () =>
      getPropertyRoomPricesDate({ propertyId, startDate, endDate }),
    select: (res) => res.data,
    enabled: !!propertyId && !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000,
  });
};
