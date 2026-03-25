import { prisma } from "../../../shared/lib/prisma.lib.js";
import { AppError } from "../../../shared/utils/app-error.util.js";
import type { CreateRoomPayload } from "./room.type.js";

export const createRoom = async ({
  data,
  images,
  amenities,
}: {
  data: CreateRoomPayload;
  images: { imageUrl: string; isCover: boolean; order: number }[];
  amenities: string[];
}) => {
  const property = await prisma.property.findUnique({
    where: { id: data.propertyId },
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  return await prisma.$transaction(async (tx) => {
    const room = await tx.roomType.create({
      data: {
        ...data,
        isVerified: "VERIFIED",
      },
      omit: {
        deletedAt: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    await tx.roomTypeImage.createMany({
      data: images.map((image) => ({
        ...image,
        roomTypeId: room.id,
      })),
    });

    const amenitiesId = Array.isArray(amenities) ? amenities : [amenities];

    await tx.roomTypeAmenity.createMany({
      data: amenitiesId.map((amenity) => ({
        amenityId: amenity,
        roomTypeId: room.id,
      })),
    });

    return room;
  });
};
