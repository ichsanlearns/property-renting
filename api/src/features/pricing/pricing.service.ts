import {
  ScopeType,
  type PriceAdjustmentDirection,
  type PriceAdjustmentType,
} from "../../generated/prisma/enums.js";
import { prisma } from "../../shared/lib/prisma.lib.js";
import { calculateAdjustedPrice } from "./utils/calculate-adjusted-price.util.js";

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
    .filter((price) => {
      const currentRule = price.appliedPricingRule;

      if (!currentRule) return true;

      if (pricingRule.scopeType === ScopeType.TENANT) {
        if (
          currentRule.scopeType === ScopeType.ROOM_TYPE ||
          currentRule.scopeType === ScopeType.PROPERTY
        ) {
          return false;
        }
      }

      if (pricingRule.scopeType === ScopeType.SYSTEM) {
        if (
          currentRule.scopeType === ScopeType.ROOM_TYPE ||
          currentRule.scopeType === ScopeType.PROPERTY ||
          currentRule.scopeType === ScopeType.TENANT
        ) {
          return false;
        }
      }

      if (pricingRule.scopeType === currentRule.scopeType) {
        if (pricingRule.priority > currentRule.priority) return true;

        if (
          pricingRule.priority === currentRule.priority &&
          pricingRule.createdAt > currentRule.createdAt
        ) {
          return true;
        }
      }

      return false;
    })
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

  await prisma.$transaction(updates);
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
