import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[0-9]{8,15}$/.test(val), {
      message: "Invalid phone number",
    }),
  profileImage: z.file().optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
