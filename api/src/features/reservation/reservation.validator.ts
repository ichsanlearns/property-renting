import { z } from "zod";

export const createReservationSchema = z.object({
  roomTypeId: z.string().uuid(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  guestCount: z.number().int().positive(),
  couponId: z.string().uuid().optional(),
  voucherId: z.string().optional(),
  usePoints: z.number().optional().default(0),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
