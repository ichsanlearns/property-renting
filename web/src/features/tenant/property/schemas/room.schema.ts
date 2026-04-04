import { z } from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  basePrice: z.number().min(1, "Base price is required"),
  totalRooms: z.number().min(1, "Total rooms is required"),

  bedType: z.string().min(1, "Bed type is required"),
  bedCount: z.number().min(1, "Bed count is required"),
  viewType: z.string().min(1, "View type is required"),
  bathroomType: z.string().min(1, "Bathroom type is required"),
  capacity: z.number().min(1, "Capacity is required"),

  isPublished: z.string().min(1, "Is published is required"),
});

export type CreateRoomPayload = z.infer<typeof createRoomSchema>;
