import type { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";
import * as uploadService from "../../shared/services/upload.service.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import * as authValidator from "./auth.validator.js";

export const login = catchAsync(async (req: Request, res: Response) => {
  const parsed = authValidator.loginSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError("Invalid credentials", 400);
  }

  const result = await authService.login({
    email: parsed.data.email,
    password: parsed.data.password,
  });

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
    const parsed = authValidator.loginWithGoogleSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError("Invalid credentials", 400);
    }

    const result = await authService.loginWithGoogle({
      token: parsed.data.token,
    });

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
  const parsed = authValidator.registerSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError("Invalid credentials", 400);
  }

  await authService.register({ email: parsed.data.email });

  res.status(200).json({
    message: "Register success, please check your email to verify your account",
  });
});

export const resendToken = catchAsync(async (req: Request, res: Response) => {
  const parsed = authValidator.resendTokenSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError("Invalid credentials", 400);
  }

  const result = await authService.resendToken({ email: parsed.data.email });

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
    const parsed = authValidator.updatePasswordSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError("Invalid credentials", 400);
    }

    const email = await authService.updatePassword({
      password: parsed.data.password,
      token: parsed.data.token,
    });

    const result = await authService.login({
      email: email,
      password: parsed.data.password,
    });

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

  const parsed = authValidator.fillProfileSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError("Invalid credentials", 400);
  }

  const result = await authService.fillProfile({
    userId,
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    role: parsed.data.role,
    phoneNumber: parsed.data.phoneNumber,
    profileImage: profileImageLink?.url ?? null,
    profileImagePublicId: profileImageLink?.publicId ?? null,
  });

  res.status(200).json({
    message: "Profile filled successfully",
    data: { user: result },
  });
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const parsed = authValidator.resetPasswordSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError("Invalid credentials", 400);
  }

  await authService.resetPassword({ email: parsed.data.email });

  res.status(200).json({
    message:
      "Reset password success, please check your email to reset your password",
  });
});

export const updateResetPassword = catchAsync(
  async (req: Request, res: Response) => {
    const parsed = authValidator.updateResetPasswordSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError("Invalid credentials", 400);
    }

    await authService.updateResetPassword({
      password: parsed.data.password,
      token: parsed.data.token,
    });

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
