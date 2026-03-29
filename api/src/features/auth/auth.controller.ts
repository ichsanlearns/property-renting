import type { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";

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

export const updatePassword = catchAsync(
  async (req: Request, res: Response) => {
    const { email, password, token } = req.body;

    await authService.updatePassword({ email, password, token });

    res.status(200).json({
      message: "Password updated successfully",
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
