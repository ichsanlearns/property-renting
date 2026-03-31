import { z } from "zod";

export const uploadPaymentProofSchema = z.object({
  reservationId: z.string().min(1, "Reservation ID is required"),
});
