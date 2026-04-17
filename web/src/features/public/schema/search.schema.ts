import { z } from "zod";

export const searchSchema = z.object({
  param: z.string().min(1, "Search is required"),
});

export type SearchSchema = z.infer<typeof searchSchema>;
