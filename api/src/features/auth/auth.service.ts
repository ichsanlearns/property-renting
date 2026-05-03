import { prisma } from "../../shared/lib/prisma.lib.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppError } from "../../shared/utils/app-error.util.js";
import { generateAuthToken } from "../../shared/utils/jwt.util.js";
import { generateToken, hashToken } from "../../shared/utils/token.util.js";
import { sendEmail } from "../../shared/services/email/email.service.js";
import { registrationEmailTemplate } from "../../shared/services/email/registration.template.js";
import { verifyGoogleToken } from "../../shared/utils/verify-token.util.js";
import { generateReferralCode } from "../../shared/utils/referral.util.js";
import type { Role } from "../../generated/prisma/enums.js";
import { resetPasswordEmailTemplate } from "../../shared/services/email/resetpassword.template.js";

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

  const isMatch = await bcrypt.compare(password, user.password!);

  if (!isMatch) throw new AppError("Invalid credentials", 400);

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    generateAuthToken({
      userId: user.id,
      role: user.role!,
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
      phoneNumber: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
      profileImage: user.profileImage,
    },
  };
};

export const loginWithGoogle = async ({ token }: { token: string }) => {
  const payload = await verifyGoogleToken({ token });

  if (!payload?.email || !payload.sub) {
    throw new AppError("Invalid Google token", 400);
  }

  const googleAccount = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "GOOGLE",
        providerAccountId: payload.sub,
      },
    },
    include: { user: true },
  });

  if (googleAccount) {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      generateAuthToken({
        userId: googleAccount.user.id,
        role: googleAccount.user.role!,
      });

    const hashedRefreshToken = await hashToken({ token: newRefreshToken });

    await prisma.refreshToken.create({
      data: {
        hashedToken: hashedRefreshToken,
        userId: googleAccount.user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const fullName = [googleAccount.user.firstName, googleAccount.user.lastName]
      .filter(Boolean)
      .join(" ");

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: googleAccount.user.id,
        fullName,
        email: googleAccount.user.email,
        phoneNumber: googleAccount.user.phoneNumber,
        role: googleAccount.user.role,
        isVerified: googleAccount.user.isVerified,
        profileImage: googleAccount.user.profileImage,
      },
    };
  }

  let user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (user) {
    await prisma.account.create({
      data: {
        userId: user.id,
        provider: "GOOGLE",
        providerAccountId: payload.sub,
      },
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      generateAuthToken({
        userId: user.id,
        role: user.role!,
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
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
        profileImage: user.profileImage,
      },
    };
  }

  user = await prisma.user.create({
    data: {
      email: payload.email,
      firstName: payload.name?.split(" ")[0] || "",
      lastName: payload.name?.split(" ").slice(1).join(" ") || "",
      profileImage: payload.picture ?? null,
      role: "CUSTOMER",
      isVerified: true,
      referralCode: generateReferralCode(),

      accounts: {
        create: {
          provider: "GOOGLE",
          providerAccountId: payload.sub,
        },
      },
    },
  });

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    generateAuthToken({
      userId: user.id,
      role: user.role!,
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
      phoneNumber: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
      profileImage: user.profileImage,
    },
  };
};

export const register = async ({ email }: { email: string }) => {
  const isExist = await prisma.user.findUnique({
    where: { email, isVerified: true },
  });

  if (isExist) throw new AppError("User already exists", 400);

  const isRegistering = await prisma.registerToken.findFirst({
    where: { email, type: "REGISTER" },
  });

  if (!isRegistering) {
    await prisma.user.create({
      data: {
        email,
        isVerified: false,
      },
    });
  }

  await prisma.registerToken.deleteMany({
    where: { email, type: "REGISTER" },
  });

  const { raw, hashed } = generateToken();

  await prisma.registerToken.create({
    data: {
      email,
      token: hashed,
      type: "REGISTER",
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    },
  });

  const verifyUrl = `${process.env.APP_URL}/register/verify/password?token=${raw}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: registrationEmailTemplate(verifyUrl),
  });
};

export const resendToken = async ({ email }: { email: string }) => {
  const isExist = await prisma.user.findUnique({
    where: { email, isVerified: true },
  });

  if (isExist) throw new AppError("User already registered", 400);

  const notExpiredToken = await prisma.registerToken.findFirst({
    where: {
      email,
      type: "REGISTER",
      createdAt: { gte: new Date(Date.now() - 60 * 1000) },
    },
  });

  if (notExpiredToken) {
    throw new AppError(
      "Please wait 60 seconds before resending the token",
      400,
    );
  }

  await prisma.registerToken.deleteMany({
    where: { email, type: "REGISTER" },
  });

  const { raw, hashed } = generateToken();

  const newToken = await prisma.registerToken.create({
    data: {
      email,
      token: hashed,
      type: "REGISTER",
      expiresAt: new Date(Date.now() + 120 * 60 * 1000),
    },
  });

  const verifyUrl = `${process.env.APP_URL}/register/verify/password?token=${raw}`;

  await sendEmail({
    to:
      process.env.NODE_ENV === "development"
        ? "michsanudin03@gmail.com"
        : email,
    subject: "Verify your email",
    html: registrationEmailTemplate(verifyUrl),
  });

  return newToken.createdAt;
};

export const verifyPasswordToken = async ({ token }: { token: string }) => {
  const hashedToken = await hashToken({ token });

  const registerToken = await prisma.registerToken.findUnique({
    where: { token: hashedToken },
    select: { email: true, expiresAt: true },
  });

  if (!registerToken || registerToken.expiresAt < new Date()) {
    throw new AppError("Invalid or expired token", 400);
  }

  return registerToken.email;
};

export const verifyChangeEmail = async ({ token }: { token: string }) => {
  const hashedToken = hashToken({ token });

  const tokenData = await prisma.registerToken.findUnique({
    where: { token: hashedToken },
  });

  if (!tokenData) throw new AppError("Invalid or expired token", 400);

  const user = await prisma.user.findUnique({
    where: { email: tokenData.email },
  });

  if (!user) throw new AppError("User not found", 404);

  await prisma.user.update({
    where: { id: user.id },
    data: { email: tokenData.newEmail! },
  });

  await prisma.registerToken.delete({
    where: { token: hashedToken },
  });
};

export const updatePassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  const hashedToken = await hashToken({ token });

  const registerToken = await prisma.registerToken.findUnique({
    where: { token: hashedToken },
  });

  if (!registerToken) throw new AppError("Invalid token", 400);

  const user = await prisma.user.findUnique({
    where: { email: registerToken.email },
  });

  if (!user) throw new AppError("User not found", 404);

  await prisma.user.update({
    where: { email: registerToken.email },
    data: { isVerified: true },
  });

  await prisma.registerToken.deleteMany({
    where: { email: registerToken.email, type: "REGISTER" },
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: registerToken.email },
    data: { password: hashedPassword },
  });

  return registerToken.email;
};

export const fillProfile = async ({
  userId,
  firstName,
  lastName,
  role,
  phoneNumber,
  profileImage,
  profileImagePublicId,
}: {
  userId: string;
  firstName: string;
  lastName: string;
  role: Role;
  phoneNumber: string | null;
  profileImage: string | null;
  profileImagePublicId: string | null;
}) => {
  if (!userId) throw new AppError("Unauthorized", 401);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new AppError("User not found", 404);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName,
      role,
      phoneNumber,
      profileImage,
      profileImagePublicId,
    },
  });

  const fullName = [updatedUser.firstName, updatedUser.lastName]
    .filter(Boolean)
    .join(" ");

  return {
    id: updatedUser.id,
    fullName,
    email: updatedUser.email,
    phoneNumber: updatedUser.phoneNumber,
    role: updatedUser.role,
    isVerified: updatedUser.isVerified,
    profileImage: updatedUser.profileImage,
  };
};

export const logout = async ({ refreshToken }: { refreshToken: string }) => {
  if (!refreshToken) throw new AppError("Unauthorized", 401);

  const hashedRefreshToken = await hashToken({ token: refreshToken });

  await prisma.refreshToken.deleteMany({
    where: { hashedToken: hashedRefreshToken },
  });
};

export const resetPassword = async ({ email }: { email: string }) => {
  const googleUser = await prisma.user.findFirst({
    where: { email, password: null, isVerified: true },
  });

  if (googleUser)
    throw new AppError(
      "This account is registered with Google, please login with Google",
      400,
    );

  const user = await prisma.user.findUnique({
    where: { email, password: { not: null }, isVerified: true },
  });

  if (!user) throw new AppError("User not found", 404);

  await prisma.registerToken.deleteMany({
    where: { email, type: "RESET_PASSWORD" },
  });

  const { raw, hashed } = generateToken();

  await prisma.registerToken.create({
    data: {
      email,
      token: hashed,
      type: "RESET_PASSWORD",
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    },
  });

  const verifyUrl = `${process.env.APP_URL}/reset-password?token=${raw}`;

  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: resetPasswordEmailTemplate(verifyUrl),
  });
};

export const updateResetPassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  const hashedToken = await hashToken({ token });

  const registerToken = await prisma.registerToken.findUnique({
    where: { token: hashedToken },
  });

  if (!registerToken) throw new AppError("Invalid token", 400);

  const user = await prisma.user.findUnique({
    where: { email: registerToken.email },
  });

  if (!user) throw new AppError("User not found", 404);

  const isPasswordMatch = await bcrypt.compare(password, user.password!);

  if (isPasswordMatch)
    throw new AppError(
      "Password already used, please use another password",
      400,
    );

  await prisma.registerToken.deleteMany({
    where: { email: registerToken.email, type: "RESET_PASSWORD" },
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: registerToken.email },
    data: { password: hashedPassword },
  });

  return registerToken.email;
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

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    generateAuthToken({
      userId: user.id,
      role: user.role!,
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
      phoneNumber: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
      profileImage: user.profileImage,
    },
  };
};
