import { z } from "zod";

export const createPricingSchema = z.object({
  name: z.string().min(1, "Name is required"),

  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),

  daysOfWeek: z.array(z.string()).optional(),

  adjustmentType: z.string().min(1, "Adjustment type is required"),
  adjustmentDirection: z.string().min(1, "Adjustment direction is required"),
  adjustmentValue: z.number().min(1, "Adjustment value is required"),

  priority: z.number().optional(),
  isActive: z.boolean().optional(),
});

export type CreatePricingPayload = z.infer<typeof createPricingSchema>;
