import { prisma } from "../../shared/lib/prisma.lib.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppError } from "../../shared/utils/app-error.util.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../shared/utils/jwt.util.js";
import { hashToken } from "../../shared/utils/hash-token.util.js";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new AppError(400, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new AppError(400, "Invalid credentials");

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  const newAccessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
  });
  const newRefreshToken = generateRefreshToken({
    userId: user.id,
    role: user.role,
  });

  const hashedRefreshToken = await hashToken({ token: newRefreshToken });

  await prisma.refreshToken.create({
    data: {
      hashedToken: hashedRefreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: {
      id: user.id,
      fullName,
      email: user.email,
      phoneNumbers: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
      profileImage: user.profileImage,
    },
  };
};

export const logout = async ({ refreshToken }: { refreshToken: string }) => {
  if (!refreshToken) throw new AppError(401, "Unauthorized");

  const hashedRefreshToken = await hashToken({ token: refreshToken });

  await prisma.refreshToken.deleteMany({
    where: { hashedToken: hashedRefreshToken },
  });
};

export const refreshSession = async ({
  oldRefreshToken,
}: {
  oldRefreshToken: string;
}) => {
  if (!oldRefreshToken) throw new AppError(401, "Unauthorized");

  const payload = jwt.verify(
    oldRefreshToken,
    process.env.JWT_REFRESH_TOKEN!,
  ) as any;

  const hashedOldRefreshToken = await hashToken({ token: oldRefreshToken });

  const stored = await prisma.refreshToken.findUnique({
    where: { hashedToken: hashedOldRefreshToken },
  });

  if (!stored) throw new AppError(401, "Invalid refresh token");

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) throw new AppError(401, "Invalid refresh token");

  const newAccessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
  });
  const newRefreshToken = generateRefreshToken({
    userId: user.id,
    role: user.role,
  });

  await prisma.refreshToken.deleteMany({
    where: { hashedToken: hashedOldRefreshToken },
  });

  const hashedRefreshToken = await hashToken({ token: newRefreshToken });

  await prisma.refreshToken.create({
    data: {
      hashedToken: hashedRefreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: {
      id: user.id,
      fullName,
      email: user.email,
      phoneNumbers: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
      profileImage: user.profileImage,
    },
  };
};
