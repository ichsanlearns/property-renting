import api from "../client";

import { API_ENDPOINTS } from "../endpoints";
import type { CreatePropertyPayload } from "../types/payload.type";

export const PropertyService = {
  create: async (data: CreatePropertyPayload) => {
    const response = await api.post(API_ENDPOINTS.PROPERTY.CREATE, data);
    return response.data;
  },
};
