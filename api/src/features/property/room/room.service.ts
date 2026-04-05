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

export const ensurePrices = async ({
  roomTypeId,
  daysAhead,
}: {
  roomTypeId: string;
  daysAhead: number;
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date(today);
  endDate.setDate(today.getDate() + daysAhead);

  const roomType = await prisma.roomType.findUnique({
    where: { id: roomTypeId },
  });

  if (!roomType) {
    throw new AppError("Room type not found", 404);
  }

  const lastGeneratedDate = await prisma.roomTypePrice.findFirst({
    where: {
      roomTypeId,
    },
    orderBy: {
      date: "desc",
    },
  });

  let startDate = today;

  if (lastGeneratedDate?.date) {
    startDate = new Date(lastGeneratedDate.date);
    startDate.setDate(startDate.getDate() + 1);
  }

  const priceToCreates = [];

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    priceToCreates.push({
      roomTypeId,
      date: new Date(currentDate),
      price: roomType.basePrice,
      availableRooms: roomType.totalRooms,
      isClosed: false,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  await prisma.roomTypePrice.createMany({
    data: priceToCreates,
  });
};
