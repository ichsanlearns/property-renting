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
