import { z } from "zod";

export const getByIdBasicSchema = z.object({
  propertyId: z.uuid(),
});

export type GetByIdBasicInput = z.infer<typeof getByIdBasicSchema>;
