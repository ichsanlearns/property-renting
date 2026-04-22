import api from "../../../../api/client";

import type { ApiResponse } from "../../../../shared/types/api-response";
import * as PricingResponse from "./pricing.response";
import { PRICING_ENDPOINTS } from "./pricing.endpoint";

export const getByTenantId = async () => {
  const response = await api.get<
    ApiResponse<PricingResponse.GetByTenantIdResponse[]>
  >(PRICING_ENDPOINTS.GET_BY_TENANT_ID);
  return response.data;
};
