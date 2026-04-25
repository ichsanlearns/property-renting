import { z } from "zod";

export const searchSchema = z.object({
  param: z.string().optional(),
});

export type SearchSchema = z.infer<typeof searchSchema>;
