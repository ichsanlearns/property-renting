import api from "../../../../api/client";

import { PROPERTY_ENDPOINTS } from "./property.endpoint";

export const createProperty = async (data: FormData) => {
  const response = await api.post(PROPERTY_ENDPOINTS.CREATE, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getPropertyByIdBasic = async (propertyId: string) => {
  const response = await api.get(
    PROPERTY_ENDPOINTS.GET_BY_ID_BASIC(propertyId),
  );
  return response.data;
};
