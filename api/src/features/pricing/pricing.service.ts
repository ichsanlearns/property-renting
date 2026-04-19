import {
  ScopeType,
  type PriceAdjustmentDirection,
  type PriceAdjustmentType,
} from "../../generated/prisma/enums.js";
import { prisma } from "../../shared/lib/prisma.lib.js";

interface CreatePricingRuleInput {
  name: string;
  createdBy: string;

  scopeType: ScopeType;
  tenantId?: string;

  startDate: string;
  endDate: string;

  daysOfWeek?: string[];

  adjustmentType: PriceAdjustmentType;
  adjustmentDirection: PriceAdjustmentDirection;
  adjustmentValue: number;

  priority?: number;
  isActive?: boolean;
}

export const createPricingRule = async (input: CreatePricingRuleInput) => {
  if (input.scopeType === ScopeType.TENANT) {
    const isExist = await prisma.user.findUnique({
      where: {
        id: input.tenantId!,
      },
    });
    if (!isExist) {
      throw new Error("Tenant not found");
    }
  }

  const pricingRule = await prisma.pricingRule.create({
    data: {
      ...input,
      daysOfWeek: input.daysOfWeek?.map((day) => Number(day)) ?? [],
    },
  });

  return pricingRule;
};
