import { cloudinary } from "../../shared/lib/cloudinary.lib.js";
import { prisma } from "../../shared/lib/prisma.lib.js";
import type { UpdateMe } from "../../shared/types/user.type.js";
import { AppError } from "../../shared/utils/app-error.util.js";

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
}: {
  userId: string;
  profileImage: string;
}) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { profileImage },
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
