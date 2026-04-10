import { z } from "zod";

export const createReservationSchema = z.object({
  roomTypeId: z.string().uuid(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  numberOfNights: z.number().int().positive(),
  totalAmount: z.number(),
  roomNameSnapshot: z.string(),
  propertyNameSnapshot: z.string(),
  averageRoomPerNightSnapshot: z.number(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
