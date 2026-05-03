import { z } from "zod";

export const createSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryId: z.uuid(),
  description: z.string().min(1, "Description is required"),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  numberOfBathrooms: z.coerce.number(),
  amenities: z.array(z.string()).optional(),
});

export const getByIdBasicSchema = z.object({
  propertyId: z.uuid(),
});

export type GetByIdBasicInput = z.infer<typeof getByIdBasicSchema>;

export const searchByParamsSchema = z.object({
  search: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  city: z.string().optional(),
  sortBy: z.enum(["name", "price", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  guests: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
});

export type SearchByParamsInput = z.infer<typeof searchByParamsSchema>;

export const updateSchema = z.object({
  categoryId: z.uuid(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  numberOfBathrooms: z.coerce.number().optional(),
  amenities: z.array(z.string()).optional(),
});

export type UpdateInput = z.infer<typeof updateSchema>;
