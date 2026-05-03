import { z } from "zod";

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(1),
});

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

export const updateMeSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(1),
  role: z.string().toUpperCase().min(1),
  isVerified: z.boolean().optional(),
  profileImage: z.string().min(1).optional(),
});

export type UpdateMeInput = z.infer<typeof updateMeSchema>;
