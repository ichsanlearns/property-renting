import api from "../../../../api/client";

import type { ApiResponse } from "../../../../shared/types/api-response";
import * as PricingResponse from "./pricing.response";
import { PRICING_ENDPOINTS } from "./pricing.endpoint";

export type CreatePricingRulePayload = {
  name: string;

  startDate: string;
  endDate: string;

  daysOfWeek?: string[];

  adjustmentType: "NOMINAL" | "PERCENTAGE";
  adjustmentDirection: "DECREASE" | "INCREASE";
  adjustmentValue: number;

  priority?: number;
  isActive?: boolean;
};

export const getByTenantId = async () => {
  const response = await api.get<
    ApiResponse<PricingResponse.GetByTenantIdResponse[]>
  >(PRICING_ENDPOINTS.GET_BY_TENANT_ID);
  return response.data;
};

export const createPricingRule = async (input: CreatePricingRulePayload) => {
  const response = await api.post<ApiResponse<void>>(
    PRICING_ENDPOINTS.TENANT_CREATE_PRICING_RULE,
    input,
  );
  return response.data;
};
