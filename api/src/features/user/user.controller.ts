import type { Request, Response } from "express";
import * as UserService from "./user.service.js";
import * as PricingService from "../pricing/pricing.service.js";
import { createPricingRuleValidator } from "../pricing/pricing.validator.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";
import * as uploadService from "../../shared/services/upload.service.js";

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

  const result = await PricingService.createPricingRule({
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
    data: { pricingRule: result },
  });
};

export const updateProfilePhoto = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId!;

    const profileImage = req.file;

    if (!profileImage) {
      throw new Error("Profile image not uploaded");
    }

    const profileImageLink = await uploadService.uploadToCloudinary(
      profileImage.buffer,
      "profileImages",
    );

    const result = await UserService.updateProfilePhoto({
      userId,
      profileImage: profileImageLink.url,
    });

    res.status(200).json({
      message: "Profile photo updated successfully",
      data: { user: result },
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
