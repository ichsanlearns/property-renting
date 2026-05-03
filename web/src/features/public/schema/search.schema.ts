import { z } from "zod";

export const searchSchema = z.object({
  param: z.string().optional(),
  guests: z.number().optional(),
});

export type SearchSchema = z.infer<typeof searchSchema>;
