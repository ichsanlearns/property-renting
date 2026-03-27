import { prisma } from "../../shared/lib/prisma.lib.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppError } from "../../shared/utils/app-error.util.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateRegisterToken,
} from "../../shared/utils/jwt.util.js";
import { generateToken, hashToken } from "../../shared/utils/token.util.js";
import { sendEmail } from "../../shared/services/email/email.service.js";
import { verifyEmailTemplate } from "../../shared/services/email/email.template.js";

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

  if (!user) throw new AppError("Invalid credentials", 400);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new AppError("Invalid credentials", 400);

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

export const register = async ({ email }: { email: string }) => {
  const isExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isExist) throw new AppError("User already exists", 400);

  const isRegistering = await prisma.registerToken.findFirst({
    where: { email, type: "REGISTER" },
  });

  if (isRegistering) {
    await prisma.registerToken.deleteMany({
      where: { email, type: "REGISTER" },
    });
  }

  const { raw, hashed } = generateToken();

  await prisma.registerToken.create({
    data: {
      email,
      token: hashed,
      type: "REGISTER",
      expiresAt: new Date(Date.now() + 120 * 60 * 1000),
    },
  });

  const verifyUrl = `${process.env.APP_URL}/verify?token=${raw}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: verifyEmailTemplate(verifyUrl),
  });
};

export const logout = async ({ refreshToken }: { refreshToken: string }) => {
  if (!refreshToken) throw new AppError("Unauthorized", 401);

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
  if (!oldRefreshToken) throw new AppError("Unauthorized", 401);

  const payload = jwt.verify(
    oldRefreshToken,
    process.env.JWT_REFRESH_TOKEN!,
  ) as any;

  const hashedOldRefreshToken = await hashToken({ token: oldRefreshToken });

  const stored = await prisma.refreshToken.findUnique({
    where: { hashedToken: hashedOldRefreshToken },
  });

  if (!stored) throw new AppError("Invalid refresh token", 401);

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) throw new AppError("Invalid refresh token", 401);

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
