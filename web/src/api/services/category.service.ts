import api from "../client";

import { API_ENDPOINTS } from "../endpoints";

export const getAllCategories = async () => {
  const response = await api.get(API_ENDPOINTS.PROPERTY_CATEGORIES.GET_ALL);
  return response.data;
};
