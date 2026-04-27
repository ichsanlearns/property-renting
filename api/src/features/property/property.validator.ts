import { z } from "zod";

export const getByIdBasicSchema = z.object({
  propertyId: z.uuid(),
});

export type GetByIdBasicInput = z.infer<typeof getByIdBasicSchema>;

export const searchByParamsSchema = z.object({
  search: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  sortBy: z.enum(["name", "price", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export type SearchByParamsInput = z.infer<typeof searchByParamsSchema>;

export const updateSchema = z.object({
  categoryId: z.uuid(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  latitude: z.number().min(1, "Latitude is required"),
  longitude: z.number().min(1, "Longitude is required"),
  numberOfBathrooms: z
    .number()
    .min(1, "Number of bathrooms is required")
    .optional(),
  amenities: z.array(z.string()).optional(),
});

export type UpdateInput = z.infer<typeof updateSchema>;
