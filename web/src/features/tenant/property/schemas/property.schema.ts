import { z } from "zod";

export const createPropertySchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  fullAddress: z.string().min(1, "Full address is required"),
  latitude: z.number().min(1, "Choose location on map"),
  longitude: z.number().min(1, "Choose location on map"),
  numberOfBathrooms: z.number().min(1, "Number of bathrooms is required"),
});

export type CreatePropertyPayload = z.infer<typeof createPropertySchema>;
