import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
