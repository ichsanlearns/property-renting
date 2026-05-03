import { cloudinary } from "../../shared/lib/cloudinary.lib.js";
import { prisma } from "../../shared/lib/prisma.lib.js";

import type { UpdateMe } from "../../shared/types/user.type.js";
import { AppError } from "../../shared/utils/app-error.util.js";

import bcrypt from "bcrypt";
import { generateToken } from "../../shared/utils/token.util.js";
import { sendEmail } from "../../shared/services/email/email.service.js";
import { changeEmailTemplate } from "../../shared/services/email/changeemail.template.js";

export const updateMe = async ({
  userId,
  data,
}: {
  userId: string;
  data: UpdateMe;
}) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
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

export const updateProfilePhoto = async ({
  userId,
  profileImage,
  profileImagePublicId,
}: {
  userId: string;
  profileImage: string;
  profileImagePublicId: string;
}) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { profileImage, profileImagePublicId },
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

export const updatePassword = async ({
  userId,
  currentPassword,
  newPassword,
}: {
  userId: string;
  currentPassword: string;
  newPassword: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password!);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 400);
  }

  if (currentPassword === newPassword) {
    throw new AppError(
      "New password cannot be the same as current password",
      400,
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      refreshTokens: { deleteMany: {} },
    },
  });
};

export const changeEmail = async ({
  userId,
  email,
  password,
}: {
  userId: string;
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new AppError("User not found", 404);

  if (!user.password)
    throw new AppError(
      "You cant change email because you login with google",
      400,
    );

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new AppError("Invalid credentials", 400);

  const isNewEmailExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isNewEmailExist) throw new AppError("Email already exists", 400);

  const notExpiredToken = await prisma.registerToken.findFirst({
    where: {
      email: user.email,
      type: "CHANGE_EMAIL",
      expiresAt: { gt: new Date() },
    },
  });

  if (notExpiredToken) {
    throw new AppError(
      "You already requested to change email, please check your email",
      400,
    );
  }

  await prisma.registerToken.deleteMany({
    where: {
      email: user.email,
      type: "CHANGE_EMAIL",
    },
  });

  const { raw, hashed } = generateToken();

  await prisma.registerToken.create({
    data: {
      email: user.email,
      newEmail: email,
      token: hashed,
      type: "CHANGE_EMAIL",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  const verifyUrl = `${process.env.APP_URL}/verify-email-change?token=${raw}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: changeEmailTemplate(verifyUrl),
  });
};

export const deleteProfilePhoto = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.profileImagePublicId && !user.profileImage) {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

    return {
      id: user.id,
      fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
      profileImage: user.profileImage,
    };
  }

  if (user.profileImagePublicId) {
    try {
      await cloudinary.uploader.destroy(user.profileImagePublicId);
    } catch (error) {
      console.error("cloudinary delete failed:", error);
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { profileImage: null, profileImagePublicId: null },
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
