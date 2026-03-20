import api from "../../../../api/client";

import { PROPERTY_ENDPOINTS } from "./property.endpoint";

export const getAmenities = async () => {
  const response = await api.get(PROPERTY_ENDPOINTS.AMENITIES.GET_ALL);
  return response.data;
};
