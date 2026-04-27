import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.email("Invalid email").optional(),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[0-9]{8,15}$/.test(val), {
      message: "Invalid phone number",
    }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
