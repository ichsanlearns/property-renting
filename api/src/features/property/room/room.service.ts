import { prisma } from "../../../shared/lib/prisma.lib.js";
import { AppError } from "../../../shared/utils/app-error.util.js";
import type { CreateRoomPayload } from "./room.type.js";

export const createRoom = async ({
  data,
  images,
  amenities,
}: {
  data: CreateRoomPayload;
  images: {
    imageUrl: string;
    publicId?: string;
    isCover: boolean;
    order: number;
  }[];
  amenities: string[];
}) => {
  let property;

  if (data.isPublished === "PUBLISHED") {
    property = await prisma.property.update({
      where: {
        id: data.propertyId,
      },
      data: {
        isPublished: "PUBLISHED",
      },
    });
  } else {
    property = await prisma.property.findUnique({
      where: { id: data.propertyId },
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }
  }

  return await prisma.$transaction(async (tx) => {
    if (
      (property.minPrice &&
        Number(data.basePrice) < Number(property.minPrice)) ||
      !property.minPrice
    ) {
      await tx.property.update({
        where: {
          id: data.propertyId,
        },
        data: {
          minPrice: data.basePrice,
        },
      });
    }

    const room = await tx.roomType.create({
      data: {
        ...data,
        availableRooms: data.totalRooms,
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
        imagePublicId: image.publicId ?? null,
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

export const getRoomById = async ({
  roomId,
  tenantId,
}: {
  roomId: string;
  tenantId: string;
}) => {
  const room = await prisma.roomType.findUnique({
    where: { id: roomId },
    include: {
      roomAmenities: true,
      roomTypeImages: true,
      property: {
        select: {
          tenantId: true,
        },
      },
    },
  });

  if (room?.property.tenantId !== tenantId) {
    throw new AppError("Unauthorized", 401);
  }

  if (!room) {
    throw new AppError("Room not found", 404);
  }

  return {
    id: room.id,
    name: room.name,
    basePrice: room.basePrice,
    totalRooms: room.totalRooms,

    bedType: room.bedType,
    capacity: room.capacity,
    viewType: room.viewType,
    bathroomType: room.bathroomType,
    bedCount: room.bedCount,

    availableRooms: room.availableRooms,

    averageRating: room.averageRating,
    reviewCount: room.reviewCount,

    isPublished: room.isPublished,
    isVerified: room.isVerified,

    amenities: room.roomAmenities.map((amenity) => amenity.id),

    roomTypeImages: room.roomTypeImages.map((image) => image.imageUrl),
  };
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
    include: {
      property: true,
    },
  });

  if (!roomType) {
    throw new AppError("Room type not found", 404);
  }

  const lastGeneratedDate = await prisma.roomTypePrice.findFirst({
    where: { roomTypeId },
    orderBy: { date: "desc" },
  });

  let startDate = today;

  if (lastGeneratedDate?.date) {
    startDate = new Date(lastGeneratedDate.date);
    startDate.setDate(startDate.getDate() + 1);
  }

  if (startDate > endDate) return;

  const pricingRules = await prisma.pricingRule.findMany({
    where: {
      isActive: true,
      OR: [
        {
          scopeType: "SYSTEM",
        },
        {
          tenantId: roomType.property.tenantId,
          OR: [
            { roomTypeId },
            { propertyId: roomType.propertyId },
            { scopeType: "TENANT" },
          ],
        },
      ],
    },
  });

  const priceToCreates = [];

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    let price = Number(roomType.basePrice);

    const applicableRules = pricingRules.filter((rule) => {
      const withinDate =
        currentDate >= rule.startDate && currentDate <= rule.endDate;

      const matchesDay =
        rule.daysOfWeek.length === 0 ||
        rule.daysOfWeek.includes(currentDate.getDay());

      return withinDate && matchesDay;
    });

    const tenantRules = applicableRules.filter((r) => r.scopeType === "TENANT");

    const systemRules = applicableRules.filter((r) => r.scopeType === "SYSTEM");

    let selectedRules = tenantRules.length > 0 ? tenantRules : systemRules;

    const rule = selectedRules.sort((a, b) => b.priority - a.priority)[0];

    if (rule) {
      if (rule.adjustmentType === "NOMINAL") {
        const value = Number(rule.adjustmentValue);

        price += rule.adjustmentDirection === "INCREASE" ? value : -value;
      } else {
        const value = (price * Number(rule.adjustmentValue)) / 100;

        price += rule.adjustmentDirection === "INCREASE" ? value : -value;
      }
    }

    const safeDate = new Date(
      Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      ),
    );

    priceToCreates.push({
      roomTypeId,
      date: safeDate,
      price,
      appliedPricingRuleId: rule?.id || null,
      availableRooms: roomType.totalRooms,
      isClosed: false,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  await prisma.roomTypePrice.createMany({
    data: priceToCreates,
    skipDuplicates: true,
  });
};
