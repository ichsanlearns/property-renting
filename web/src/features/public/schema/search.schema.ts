import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().min(1, "Search is required"),
});

export type SearchSchema = z.infer<typeof searchSchema>;
