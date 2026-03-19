import api from "../client";

import { API_ENDPOINTS } from "../endpoints";

export const getAmenities = async () => {
  const response = await api.get(API_ENDPOINTS.PROPERTY_AMENITIES.GET_ALL);
  return response.data;
};
