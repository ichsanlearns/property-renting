import { prisma } from "../../../shared/lib/prisma.lib.js";
import { AppError } from "../../../shared/utils/app-error.util.js";
import type { CreateRoomPayload } from "./room.type.js";

export const createRoom = async ({ data }: { data: CreateRoomPayload }) => {
  const property = await prisma.property.findUnique({
    where: { id: data.propertyId },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  return prisma.roomType.create({
    data: {
      ...data,
      isVerified: "VERIFIED",
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};
