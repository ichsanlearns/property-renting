import {
  ScopeType,
  type PriceAdjustmentDirection,
  type PriceAdjustmentType,
} from "../../generated/prisma/enums.js";
import { prisma } from "../../shared/lib/prisma.lib.js";
import { calculateAdjustedPrice } from "./utils/calculate-adjusted-price.util.js";
import { shouldApplyRule } from "./utils/should-apply-rule.util.js";

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
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
      daysOfWeek: input.daysOfWeek?.map((day) => Number(day)) ?? [],
    },
  });

  let propertyFilter = {};

  if (input.scopeType === ScopeType.TENANT) {
    if (!input.tenantId) {
      throw new Error("tenantId is required for TENANT scope");
    }

    propertyFilter = {
      tenantId: input.tenantId,
    };
  }

  const currentPrices = await prisma.roomTypePrice.findMany({
    where: {
      date: {
        gte: new Date(input.startDate),
        lte: new Date(input.endDate),
      },
      roomType: {
        property: propertyFilter,
      },
    },
    include: {
      appliedPricingRule: true,
      roomType: {
        select: {
          basePrice: true,
        },
      },
    },
  });

  const updates = currentPrices
    .filter((price) =>
      shouldApplyRule({
        newRule: {
          scopeType: pricingRule.scopeType,
          priority: pricingRule.priority,
          createdAt: pricingRule.createdAt,
        },
        currentRule: price.appliedPricingRule
          ? {
              scopeType: price.appliedPricingRule.scopeType,
              priority: price.appliedPricingRule.priority,
              createdAt: price.appliedPricingRule.createdAt,
            }
          : null,
      }),
    )
    .map((price) => {
      const newPrice = calculateAdjustedPrice({
        basePrice: Number(price.roomType.basePrice),
        adjustmentType: pricingRule.adjustmentType,
        adjustmentDirection: pricingRule.adjustmentDirection,
        adjustmentValue: Number(pricingRule.adjustmentValue),
      });

      return prisma.roomTypePrice.update({
        where: { id: price.id },
        data: {
          appliedPricingRuleId: pricingRule.id,
          price: newPrice,
        },
      });
    });

  await Promise.allSettled(updates);
};

export const getByTenantId = async (tenantId: string) => {
  const isExist = await prisma.user.findUnique({
    where: {
      id: tenantId,
    },
  });
  if (!isExist) {
    throw new Error("Tenant not found");
  }
  return await prisma.pricingRule.findMany({
    where: {
      OR: [{ tenantId }, { createdBy: "SYSTEM" }],
    },
    select: {
      id: true,
      name: true,
      createdBy: true,

      scopeType: true,

      startDate: true,
      endDate: true,

      adjustmentType: true,
      adjustmentDirection: true,
      adjustmentValue: true,

      priority: true,

      isActive: true,
    },
  });
};
