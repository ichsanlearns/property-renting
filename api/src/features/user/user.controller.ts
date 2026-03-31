import type { Request, Response } from "express";
import * as UserService from "./user.service.js";

export const updateMe = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const { fullName, email, phoneNumbers, role, isVerified, profileImage } =
    req.body;

  const result = await UserService.updateMe({
    userId,
    data: {
      fullName: fullName ?? undefined,
      email: email ?? undefined,
      phoneNumbers: phoneNumbers ?? undefined,
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
