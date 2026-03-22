import api from "../../../../api/client";

import { PROPERTY_ENDPOINTS } from "./property.endpoint";

export const getAmenities = async (type: string) => {
  const response = await api.get(PROPERTY_ENDPOINTS.AMENITIES.GET_ALL, {
    params: {
      type,
    },
  });
  return response.data;
};
