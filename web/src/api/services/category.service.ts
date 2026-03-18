import api from "../client";

import { API_ENDPOINTS } from "../endpoints";

export const getAllCategories = async () => {
  const response = await api.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
};
