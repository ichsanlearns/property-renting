import api from "../client";

import type { CreatePropertyPayload } from "../../schemas/property.schema";

import { API_ENDPOINTS } from "../endpoints";

export const PropertyService = {
  create: async (data: CreatePropertyPayload) => {
    const response = await api.post(API_ENDPOINTS.PROPERTY.CREATE, data);
    return response.data;
  },
};
