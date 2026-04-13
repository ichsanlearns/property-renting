import api from "../../../../api/client";

import { PROPERTY_ENDPOINTS } from "./property.endpoint";

import type { ApiResponse } from "../../../../shared/types/api-response";
import type {
  CreatePropertyResponse,
  GetPropertyByIdBasicResponse,
  GetPropertyByIdResponse,
  GetPropertyRoomPricesDateResponse,
} from "./property.response";

export const createProperty = async (data: FormData) => {
  const response = await api.post<ApiResponse<CreatePropertyResponse>>(
    PROPERTY_ENDPOINTS.CREATE,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const getPropertyByIdBasic = async (propertyId: string) => {
  const response = await api.get<ApiResponse<GetPropertyByIdBasicResponse>>(
    PROPERTY_ENDPOINTS.GET_BY_ID_BASIC(propertyId),
  );
  return response.data;
};

export const getPropertyById = async (propertyId: string) => {
  const response = await api.get<ApiResponse<GetPropertyByIdResponse>>(
    PROPERTY_ENDPOINTS.GET_BY_ID(propertyId),
  );
  return response.data;
};

export const getPropertyRoomPricesDate = async ({
  propertyId,
  startDate,
  endDate,
}: {
  propertyId: string;
  startDate: string;
  endDate: string;
}) => {
  const response = await api.get<
    ApiResponse<GetPropertyRoomPricesDateResponse[]>
  >(PROPERTY_ENDPOINTS.GET_PROPERTY_ROOM_PRICES_DATE(propertyId), {
    params: {
      startDate,
      endDate,
    },
  });
  return response.data;
};
