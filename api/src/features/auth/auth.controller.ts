import type { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";
import * as uploadService from "../../shared/services/upload.service.js";
import { AppError } from "../../shared/utils/app-error.util.js";

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login success",
    data: { accessToken: result.accessToken, user: result.user },
  });
});

export const loginWithGoogle = catchAsync(
  async (req: Request, res: Response) => {
    const { token } = req.body;

    const result = await authService.loginWithGoogle({ token });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login success",
      data: { accessToken: result.accessToken, user: result.user },
    });
  },
);

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  await authService.register({ email });

  res.status(200).json({
    message: "Register success, please check your email to verify your account",
  });
});

export const resendToken = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await authService.resendToken({ email });

  res.status(200).json({
    message: "Token resent successfully",
    data: { createdAt: result },
  });
});

export const verifyPasswordToken = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.query.token as string | undefined;

    if (!token) {
      throw new AppError("Token not found", 400);
    }

    const email = await authService.verifyPasswordToken({ token });

    res.status(200).json({
      message: "Token verified successfully",
      data: { email },
    });
  },
);

export const verifyChangeEmail = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.query.token as string;

    if (!token) {
      throw new AppError("Token not found", 400);
    }

    const email = await authService.verifyChangeEmail({ token });

    res.status(200).json({
      message: "Email changed successfully",
      data: { email },
    });
  },
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response) => {
    const { password, token } = req.body;

    const email = await authService.updatePassword({ password, token });

    const result = await authService.login({ email, password });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Password updated successfully",
      data: { accessToken: result.accessToken, user: result.user },
    });
  },
);

export const fillProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const file = req.file;

  let profileImageLink = null;

  if (file) {
    profileImageLink = await uploadService.uploadToCloudinary(
      file.buffer,
      "profileImages",
    );
  }

  const { firstName, lastName, role, phoneNumber } = req.body;

  const result = await authService.fillProfile({
    userId,
    firstName,
    lastName,
    role,
    phoneNumber: phoneNumber ?? null,
    profileImage: profileImageLink?.url ?? null,
    profileImagePublicId: profileImageLink?.publicId ?? null,
  });

  res.status(200).json({
    message: "Profile filled successfully",
    data: { user: result },
  });
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  await authService.resetPassword({ email });

  res.status(200).json({
    message:
      "Reset password success, please check your email to reset your password",
  });
});

export const updateResetPassword = catchAsync(
  async (req: Request, res: Response) => {
    const { password, token } = req.body;

    await authService.updateResetPassword({ password, token });

    res.status(200).json({
      message: "Password updated successfully, please login again",
    });
  },
);

export const authRefreshToken = catchAsync(
  async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken;

    const result = await authService.refreshSession({ oldRefreshToken });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "New access token generated successfully",
      data: { accessToken: result.accessToken, user: result.user },
    });
  },
);

export const logout = catchAsync(async (req: Request, res: Response) => {
  const oldRefreshToken = req.cookies.refreshToken;

  await authService.logout({ refreshToken: oldRefreshToken });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});
