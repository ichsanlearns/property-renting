import { z } from "zod";

export const createReservationSchema = z.object({
  roomTypeId: z.uuid(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  numberOfNights: z.number().int().positive(),
  roomNameSnapshot: z.string(),
  averageRoomPerNightSnapshot: z.number(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
