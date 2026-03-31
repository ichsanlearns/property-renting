import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.email("Invalid email").optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
