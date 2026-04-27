import api from "../../../../api/client";

import { PROPERTY_ENDPOINTS } from "./property.endpoint";

import type { ApiResponse } from "../../../../shared/types/api-response";
import * as PropertyResponse from "./property.response";

export const createProperty = async (data: FormData) => {
  const response = await api.post<
    ApiResponse<PropertyResponse.CreatePropertyResponse>
  >(PROPERTY_ENDPOINTS.CREATE, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProperty = async (data: FormData, propertyId: string) => {
  const response = await api.patch<ApiResponse<void>>(
    PROPERTY_ENDPOINTS.UPDATE(propertyId),
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const getPropertyAllBasic = async () => {
  const response = await api.get<
    ApiResponse<PropertyResponse.GetPropertyAllBasicResponse>
  >(PROPERTY_ENDPOINTS.GET_ALL_BASIC);
  return response.data;
};

export const getPropertyByIdBasic = async (propertyId: string) => {
  const response = await api.get<
    ApiResponse<PropertyResponse.GetPropertyByIdBasicResponse>
  >(PROPERTY_ENDPOINTS.GET_BY_ID_BASIC(propertyId));
  return response.data;
};

export const getPropertyById = async (propertyId: string) => {
  const response = await api.get<
    ApiResponse<PropertyResponse.GetPropertyByIdResponse>
  >(PROPERTY_ENDPOINTS.GET_BY_ID(propertyId));
  return response.data;
};

export const getPropertyByIdFullInfo = async (propertyId: string) => {
  const response = await api.get<
    ApiResponse<PropertyResponse.GetPropertyByIdFullInfoResponse>
  >(PROPERTY_ENDPOINTS.GET_BY_ID_FULL_INFO(propertyId));
  return response.data;
};

export const getPropertyByTenantId = async () => {
  const response = await api.get<
    ApiResponse<PropertyResponse.GetPropertyByTenantIdResponse[]>
  >(PROPERTY_ENDPOINTS.GET_BY_TENANT_ID);
  return response.data;
};

export const searchProperties = async ({
  search,
  sortBy,
  order,
  checkIn,
  checkOut,
}: {
  search?: string;
  checkIn?: string;
  checkOut?: string;
  sortBy?: "name" | "price" | "createdAt";
  order?: "asc" | "desc";
}) => {
  const response = await api.get<
    ApiResponse<PropertyResponse.GetPropertySearchResponse>
  >(PROPERTY_ENDPOINTS.SEARCH, {
    params: {
      search,
      checkIn,
      checkOut,
      sortBy,
      order,
    },
  });
  return response.data;
};

export const getPropertyRoomPricesDate = async ({
  propertyId,
  startDate,
  endDate,
  signal,
}: {
  propertyId: string;
  startDate: string;
  endDate: string;
  signal?: AbortSignal;
}) => {
  const response = await api.get<
    ApiResponse<PropertyResponse.GetPropertyRoomPricesDateResponse>
  >(PROPERTY_ENDPOINTS.GET_PROPERTY_ROOM_PRICES_DATE(propertyId), {
    params: {
      startDate,
      endDate,
    },
    signal,
  });
  return response.data;
};

export const deleteProperty = async (propertyId: string) => {
  const response = await api.delete<ApiResponse<void>>(
    PROPERTY_ENDPOINTS.DELETE(propertyId),
  );
  return response.data;
};
