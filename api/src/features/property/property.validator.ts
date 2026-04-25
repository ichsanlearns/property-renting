import { z } from "zod";

export const getByIdBasicSchema = z.object({
  propertyId: z.uuid(),
});

export type GetByIdBasicInput = z.infer<typeof getByIdBasicSchema>;

export const searchByParamsSchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(["name", "price", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export type SearchByParamsInput = z.infer<typeof searchByParamsSchema>;
