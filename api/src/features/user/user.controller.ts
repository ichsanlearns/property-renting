import type { Request, Response } from "express";
import * as UserService from "./user.service.js";

export const updateMe = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

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
