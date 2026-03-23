import { z } from "zod";

export const createPropertySchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),

  country: z.string().min(1, "Country is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  province: z.string().min(1, "Province is required").optional(),
  fullAddress: z.string().min(1, "Full address is required").optional(),

  latitude: z.number("Choose location on map"),
  longitude: z.number("Choose location on map"),
  numberOfBathrooms: z.number().min(1, "Number of bathrooms is required"),

  amenities: z.array(z.string()).optional(),
});

export type CreatePropertyPayload = z.infer<typeof createPropertySchema>;
