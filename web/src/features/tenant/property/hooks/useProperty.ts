import { useQuery } from "@tanstack/react-query";

import * as PropertyService from "../api/property.service";
import { queryKeys } from "../../../../shared/lib/queryKeys.lib";

export const usePropertyAllBasic = () => {
  return useQuery({
    queryKey: queryKeys.property.allBasic(),
    queryFn: () => PropertyService.getPropertyAllBasic(),
    select: (res) => res.data,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePropertyBasic = (propertyId: string) => {
  return useQuery({
    queryKey: queryKeys.property.basic(propertyId),
    queryFn: () => PropertyService.getPropertyByIdBasic(propertyId),
    select: (res) => res.data,
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePropertyDetail = ({ propertyId }: { propertyId: string }) => {
  return useQuery({
    queryKey: queryKeys.property.detail(propertyId),
    queryFn: () => PropertyService.getPropertyById(propertyId),
    select: (res) => res.data,
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePropertyByTenantId = () => {
  return useQuery({
    queryKey: queryKeys.property.byTenantId(),
    queryFn: () => PropertyService.getPropertyByTenantId(),
    select: (res) => res.data,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePropertySearch = ({
  search,
  checkIn,
  checkOut,
  sortBy,
  order,
}: {
  search?: string;
  checkIn?: string;
  checkOut?: string;
  sortBy?: "name" | "price" | "createdAt";
  order?: "asc" | "desc";
}) => {
  return useQuery({
    queryKey: queryKeys.property.search(
      search,
      checkIn,
      checkOut,
      sortBy,
      order,
    ),
    queryFn: () =>
      PropertyService.searchProperties({
        search,
        checkIn,
        checkOut,
        sortBy,
        order,
      }),
    select: (res) => res.data,
    enabled: !!search || !!checkIn || !!checkOut || !!sortBy || !!order,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePropertyRoomPricesDate = ({
  propertyId,
  startDate,
  endDate,
}: {
  propertyId: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.property.roomPricesDate(
      propertyId,
      startDate ?? null,
      endDate ?? null,
    ),
    queryFn: ({ signal }) => {
      if (!startDate || !endDate) {
        throw new Error("startDate and endDate are required");
      }

      return PropertyService.getPropertyRoomPricesDate({
        propertyId,
        startDate,
        endDate,
        signal,
      });
    },
    select: (res) => res.data,
    enabled: !!propertyId && !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
