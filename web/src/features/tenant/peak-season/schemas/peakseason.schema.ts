import { z } from "zod";

export const createPricingSchema = z.object({
  name: z.string().min(1, "Name is required"),

  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),

  daysOfWeek: z.array(z.string()).optional(),

  adjustmentType: z.enum(["NOMINAL", "PERCENTAGE"], {
    error: () => ({ message: "Adjustment type is required" }),
  }),
  adjustmentDirection: z.enum(["DECREASE", "INCREASE"], {
    error: () => ({ message: "Adjustment direction is required" }),
  }),
  adjustmentValue: z
    .number()
    .min(1, "Adjustment value is required")
    .refine((v) => v > 0, {
      message: "Adjustment value must be greater than 0",
    }),

  priority: z.number().optional(),
  isActive: z.boolean().optional(),
});

export type CreatePricingPayload = z.infer<typeof createPricingSchema>;
