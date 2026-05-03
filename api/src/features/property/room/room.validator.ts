import { z } from "zod";

export const createSchema = z.object({
  name: z.string().min(1, "Name is required"),
  basePrice: z.coerce.number().positive("Base price must be positive"),
  totalRooms: z.coerce.number().positive("Total rooms must be positive"),
  bedType: z.string().toUpperCase().min(1, "Bed type is required"),
  bedCount: z.coerce.number().positive("Bed count must be positive"),
  viewType: z.string().toUpperCase().min(1, "View type is required"),
  bathroomType: z.string().toUpperCase().min(1, "Bathroom type is required"),
  capacity: z.coerce.number().positive("Capacity must be positive"),
  isPublished: z.string().toUpperCase().min(1, "Is published is required"),
  amenities: z.array(z.string()).optional(),
});

export const updateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  basePrice: z.coerce.number().positive("Base price must be positive"),
  totalRooms: z.coerce.number().positive("Total rooms must be positive"),
  bedType: z.string().toUpperCase().min(1, "Bed type is required"),
  bedCount: z.coerce.number().positive("Bed count must be positive"),
  viewType: z.string().toUpperCase().min(1, "View type is required"),
  bathroomType: z.string().toUpperCase().min(1, "Bathroom type is required"),
  capacity: z.coerce.number().positive("Capacity must be positive"),
  isPublished: z
    .string()
    .toUpperCase()
    .min(1, "Is published is required")
    .optional(),
  amenities: z.array(z.string()).optional(),
});
