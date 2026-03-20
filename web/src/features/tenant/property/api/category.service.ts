import api from "../../../../api/client";

import { PROPERTY_ENDPOINTS } from "./property.endpoint";

export const getAllCategories = async () => {
  const response = await api.get(PROPERTY_ENDPOINTS.CATEGORIES.GET_ALL);
  return response.data;
};
