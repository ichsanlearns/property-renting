import api from "../../../../api/client";

import type { CreatePropertyPayload } from "../schemas/property.schema";

import { PROPERTY_ENDPOINTS } from "./property.endpoint";

export const createProperty = async (data: CreatePropertyPayload) => {
  const response = await api.post(PROPERTY_ENDPOINTS.CREATE, data);
  return response.data;
};
