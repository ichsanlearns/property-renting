import { z } from "zod";
import { Role } from "../../generated/prisma/enums.js";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

export const loginWithGoogleSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

export const registerSchema = z.object({
  email: z.email(),
});

export const resendTokenSchema = z.object({
  email: z.email(),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(1, "Password is required"),
  token: z.string().min(1, "Token is required"),
});

export const fillProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.enum(Role),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

export const resetPasswordSchema = z.object({
  email: z.email(),
});

export const updateResetPasswordSchema = z.object({
  password: z.string().min(1, "Password is required"),
  token: z.string().min(1, "Token is required"),
});
