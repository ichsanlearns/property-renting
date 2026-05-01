import type { Request, Response } from "express";
import * as UserService from "./user.service.js";
import * as PricingService from "../pricing/pricing.service.js";
import { createPricingRuleValidator } from "../pricing/pricing.validator.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";
import * as uploadService from "../../shared/services/upload.service.js";
import { updatePasswordSchema } from "./user.validator.js";
import { AppError } from "../../shared/utils/app-error.util.js";

import * as authService from "../auth/auth.service.js";

export const updateMe = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new Error("User not found");
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    isVerified,
    profileImage,
  } = req.body;

  const result = await UserService.updateMe({
    userId,
    data: {
      firstName: firstName ?? undefined,
      lastName: lastName ?? undefined,
      email: email ?? undefined,
      phoneNumber: phoneNumber ?? undefined,
      role: role ?? undefined,
      isVerified: isVerified ?? undefined,
      profileImage: profileImage ?? undefined,
    },
  });

  res.status(200).json({
    message: "Profile updated successfully",
    data: { user: result },
  });
};

export const createPricingRule = async (req: Request, res: Response) => {
  const tenantId = req.user?.userId;
  const scopeType = "TENANT";

  if (!tenantId) {
    throw new Error("Tenant not found");
  }

  const input = createPricingRuleValidator.safeParse(req.body);

  if (!input.success) {
    throw new Error("Invalid input");
  }

  await PricingService.createPricingRule({
    ...input.data,
    createdBy: tenantId,

    scopeType,
    tenantId,

    daysOfWeek: input.data.daysOfWeek ?? [],

    priority: input.data.priority ?? 0,
    isActive: input.data.isActive ?? true,
  });

  res.status(200).json({
    message: "Pricing rule created successfully",
  });
};

export const updateProfilePhoto = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId!;

    const profileImage = req.file;

    if (!profileImage) {
      throw new AppError("Profile image not uploaded", 400);
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(profileImage.mimetype)) {
      throw new AppError("Invalid file type", 400);
    }

    if (profileImage.size > 1 * 1024 * 1024) {
      throw new AppError("Profile image size must be less than 1MB", 400);
    }

    const profileImageLink = await uploadService.uploadToCloudinary(
      profileImage.buffer,
      "profileImages",
    );

    const result = await UserService.updateProfilePhoto({
      userId,
      profileImage: profileImageLink.url,
      profileImagePublicId: profileImageLink.publicId,
    });

    res.status(200).json({
      message: "Profile photo updated successfully",
      data: { user: result },
    });
  },
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId!;

    const input = updatePasswordSchema.safeParse(req.body);

    if (!input.success) {
      throw new AppError("Invalid input", 400);
    }

    await UserService.updatePassword({
      userId,
      currentPassword: input.data.currentPassword,
      newPassword: input.data.newPassword,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({
      message: "Password updated successfully",
    });
  },
);

export const deleteProfilePhoto = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId!;

    const result = await UserService.deleteProfilePhoto({ userId });

    res.status(200).json({
      message: "Profile photo deleted successfully",
      data: { user: result },
    });
  },
);
