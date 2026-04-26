import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .refine((val) => val.length > 0, {
      message: "Please enter your email",
    })
    .refine((val) => /\S+@\S+\.\S+/.test(val), {
      message: "Please enter a valid email address",
    }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
