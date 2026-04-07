import { z } from "zod";

export const createReviewSchema = z.object({
  reservationId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
});
