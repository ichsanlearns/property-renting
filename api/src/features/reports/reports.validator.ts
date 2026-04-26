import { z } from "zod";

export const reportQuerySchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.enum(["date", "revenue"]).optional(),
  viewBy: z.enum(["property", "transaction", "user"]).optional(),
});
