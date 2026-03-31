import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
  profileImage: z.file().optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
