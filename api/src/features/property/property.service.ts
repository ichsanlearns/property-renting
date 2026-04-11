import { eachDayOfInterval, format } from "date-fns";
import { prisma } from "../../shared/lib/prisma.lib.js";

import { AppError } from "../../shared/utils/app-error.util.js";
import type { CreatePropertyDto } from "./property.type.js";

export const create = async ({
  data,
  tenantId,
  images,
  amenities,
}: {
  data: CreatePropertyDto;
  tenantId: string;
  images: { imageUrl: string; isCover: boolean; order: number }[];
  amenities: string[];
}) => {
  return await prisma.$transaction(async (tx) => {
    const property = await tx.property.create({
      data: {
        ...data,
        tenantId,
        isVerified: "VERIFIED",
        isPublished: "PUBLISHED",
      },
      omit: {
        deletedAt: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    for (const image of images) {
      await tx.propertyImage.create({
        data: {
          propertyId: property.id,
          imageUrl: image.imageUrl,
          isCover: image.isCover,
          order: image.order,
        },
        omit: {
          deletedAt: true,
          updatedAt: true,
          createdAt: true,
        },
      });
    }

    const amenitiesId = Array.isArray(amenities) ? amenities : [amenities];

    for (const amenity of amenitiesId) {
      await tx.propertyAmenity.create({
        data: {
          propertyId: property.id,
          amenityId: amenity,
        },
        omit: {
          deletedAt: true,
          updatedAt: true,
          createdAt: true,
        },
      });
    }
    return {
      id: property.id,
      name: property.name,
      city: property.city,
      province: property.province,
      country: property.country,
      averageRating: property.averageRating,
      reviewCount: property.reviewCount,
      coverImage: images.find((image) => image.isCover)?.imageUrl,
    };
  });
};

export const getByIdBasic = async (id: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      city: true,
      province: true,
      country: true,

      averageRating: true,
      reviewCount: true,

      propertyImages: {
        where: {
          isCover: true,
        },
        select: {
          imageUrl: true,
        },
        take: 1,
      },
    },
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  return {
    name: property.name,
    city: property.city,
    province: property.province,
    country: property.country,
    averageRating: property.averageRating,
    reviewCount: property.reviewCount,
    coverImage: property.propertyImages[0]?.imageUrl,
  };
};

export const getById = async ({ id }: { id: string }) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      description: true,
      country: true,
      city: true,
      province: true,
      fullAddress: true,

      latitude: true,
      longitude: true,

      numberOfBathrooms: true,

      averageRating: true,
      reviewCount: true,

      tenant: {
        select: {
          id: true,
          firstName: true,
          profileImage: true,
        },
      },

      category: {
        select: {
          name: true,
        },
      },

      propertyImages: {
        select: {
          imageUrl: true,
          isCover: true,
          order: true,
        },
      },

      propertyAmenities: {
        select: {
          amenity: {
            select: {
              name: true,
              icon: true,
              description: true,
            },
          },
        },
      },

      roomTypes: {
        select: {
          id: true,
          name: true,
          basePrice: true,
          capacity: true,
          bedType: true,
          bedCount: true,
          viewType: true,
          bathroomType: true,

          averageRating: true,
          reviewCount: true,

          roomTypeImages: {
            select: {
              imageUrl: true,
            },
          },

          roomAmenities: {
            select: {
              amenity: {
                select: {
                  icon: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  return {
    name: property.name,
    description: property.description,
    country: property.country,
    city: property.city,
    province: property.province,
    fullAddress: property.fullAddress,

    latitude: property.latitude,
    longitude: property.longitude,

    numberOfBathrooms: property.numberOfBathrooms,

    averageRating: property.averageRating,
    reviewCount: property.reviewCount,

    tenant: property.tenant,
    category: property.category,
    propertyImages: property.propertyImages,
    propertyAmenities: property.propertyAmenities,
    roomTypes: property.roomTypes.map((roomType) => ({
      ...roomType,
      price: roomType.basePrice,
    })),
  };
};

export const getPropertyRoomPricesDate = async ({
  propertyId,
  startDate,
  endDate,
}: {
  propertyId: string;
  startDate: Date;
  endDate: Date;
}) => {
  const roomTypes = await prisma.roomType.findMany({
    where: { propertyId },
  });

  const roomTypeIds = roomTypes.map((roomType) => roomType.id);

  const roomTypePrices = await prisma.roomTypePrice.findMany({
    where: {
      roomTypeId: {
        in: roomTypeIds,
      },
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    orderBy: {
      date: "asc",
    },
    select: {
      roomTypeId: true,
      date: true,
      price: true,
      availableRooms: true,
      isClosed: true,
    },
  });

  const roomTypePricesMap = new Map(
    roomTypePrices.map((roomTypePrice) => [
      `${roomTypePrice.roomTypeId}-${format(roomTypePrice.date, "yyyy-MM-dd")}`,
      roomTypePrice,
    ]),
  );

  const allDates = eachDayOfInterval({
    start: startDate,
    end: new Date(endDate.getTime() - 1),
  });

  const normalizedDates = allDates.map((date) => format(date, "yyyy-MM-dd"));

  const result = roomTypeIds.flatMap((roomTypeId) =>
    normalizedDates.map((date) => {
      const key = `${roomTypeId}-${date}`;
      const data = roomTypePricesMap.get(key);

      return {
        roomTypeId,
        date,
        price: data?.price ?? null,
        availableRooms: data?.availableRooms ?? null,
        isClosed: data?.isClosed ?? null,
      };
    }),
  );

  return result;
};
