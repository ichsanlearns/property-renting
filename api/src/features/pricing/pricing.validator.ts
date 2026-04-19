import { z } from "zod";
import {
  PriceAdjustmentDirection,
  PriceAdjustmentType,
} from "../../generated/prisma/enums.js";

export const createPricingRuleValidator = z.object({
  name: z.string(),

  startDate: z.string(),
  endDate: z.string(),

  daysOfWeek: z.array(z.string()).optional(),

  adjustmentType: z.enum(PriceAdjustmentType),
  adjustmentDirection: z.enum(PriceAdjustmentDirection),
  adjustmentValue: z.number(),

  priority: z.number().optional(),
  isActive: z.boolean().optional(),
});
