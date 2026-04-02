import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
