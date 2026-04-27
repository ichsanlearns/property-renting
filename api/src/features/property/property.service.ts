import { prisma } from "../../shared/lib/prisma.lib.js";

import { AppError } from "../../shared/utils/app-error.util.js";
import type { CreatePropertyDto } from "./property.type.js";
import {
  buildDateKey,
  getDatesInRangeExclusive,
  getDatesInRangeInclusive,
  toDateKey,
  toLocalFromDb,
} from "../../shared/utils/date.util.js";
import { transformRoomTypePrices } from "./property.transformer.js";
import type { Prisma } from "../../generated/prisma/client.js";

type SearchPropertiesParams = {
  search?: string;
  checkIn?: string;
  checkOut?: string;
  sortBy?: "name" | "price" | "createdAt";
  order?: "asc" | "desc";
};

export const create = async ({
  data,
  tenantId,
  images,
  amenities,
}: {
  data: CreatePropertyDto;
  tenantId: string;
  images: {
    imageUrl: string;
    publicId?: string;
    isCover: boolean;
    order: number;
  }[];
  amenities: string[];
}) => {
  return await prisma.$transaction(async (tx) => {
    const property = await tx.property.create({
      data: {
        ...data,
        tenantId,
        isVerified: "VERIFIED",
        isPublished: "DRAFT",
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
          imagePublicId: image.publicId ?? null,
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

export const getAllBasic = async () => {
  const properties = await prisma.property.findMany({
    select: {
      id: true,
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
      },

      roomTypes: {
        select: {
          basePrice: true,
        },
        orderBy: {
          basePrice: "asc",
        },
        take: 1,
      },
    },
    where: {
      isPublished: "PUBLISHED",
    },
  });

  return properties.map((property) => ({
    id: property.id,
    name: property.name,
    city: property.city,
    province: property.province,
    country: property.country,
    price: property.roomTypes[0]?.basePrice,
    averageRating: property.averageRating,
    reviewCount: property.reviewCount,
    coverImage: property.propertyImages[0]?.imageUrl,
  }));
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

export const getByPropertyIdFullInfo = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      country: true,
      city: true,
      province: true,
      fullAddress: true,

      latitude: true,
      longitude: true,

      numberOfBathrooms: true,

      categoryId: true,

      propertyImages: {
        select: {
          id: true,
          imageUrl: true,
          isCover: true,
          order: true,
        },
      },

      propertyAmenities: {
        select: {
          amenityId: true,
        },
      },
    },
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  return {
    id: property.id,
    name: property.name,
    description: property.description,
    country: property.country,
    city: property.city,
    province: property.province,
    fullAddress: property.fullAddress,

    latitude: property.latitude,
    longitude: property.longitude,

    numberOfBathrooms: property.numberOfBathrooms,

    categoryId: property.categoryId,
    propertyImages: property.propertyImages,
    propertyAmenities: property.propertyAmenities,
  };
};

export const getByTenantId = async (tenantId: string) => {
  const properties = await prisma.property.findMany({
    where: {
      tenantId,
    },
    select: {
      id: true,
      name: true,

      category: {
        select: {
          name: true,
        },
      },

      city: true,
      country: true,

      averageRating: true,
      reviewCount: true,

      numberOfBathrooms: true,
      updatedAt: true,

      isPublished: true,

      propertyImages: {
        where: {
          isCover: true,
        },
        select: {
          imageUrl: true,
        },
        take: 1,
      },

      roomTypes: {
        select: {
          id: true,
          name: true,
          capacity: true,

          bedType: true,
          bedCount: true,

          bathroomType: true,

          basePrice: true,

          isPublished: true,

          totalRooms: true,
          availableRooms: true,
        },
        orderBy: {
          basePrice: "asc",
        },
      },
    },
  });

  return properties.map((property) => ({
    id: property.id,
    name: property.name,

    category: property.category.name,

    city: property.city,
    country: property.country,

    averageRating: property.averageRating,
    reviewCount: property.reviewCount,

    numberOfBathrooms: property.numberOfBathrooms,
    updatedAt: property.updatedAt,

    isPublished: property.isPublished,

    coverImage: property.propertyImages[0]?.imageUrl,

    roomTypes: property.roomTypes.map((roomType) => ({
      ...roomType,
    })),
  }));
};

export const searchByParams = async (params: SearchPropertiesParams) => {
  const where: Prisma.PropertyWhereInput = params.search
    ? {
        isPublished: "PUBLISHED",
        OR: [
          { name: { contains: params.search, mode: "insensitive" } },
          { city: { contains: params.search, mode: "insensitive" } },
          { country: { contains: params.search, mode: "insensitive" } },
        ],
      }
    : {};
  let dates: Date[] = [];

  if (params.checkIn && params.checkOut) {
    dates = getDatesInRangeExclusive(params.checkIn, params.checkOut);
    where.roomTypes = {
      some: {
        roomTypePrices: {
          some: {
            date: {
              gte: new Date(params.checkIn),
              lt: new Date(params.checkOut),
            },
            availableRooms: { gt: 0 },
            isClosed: false,
          },
        },
      },
    };
  }

  const properties = await prisma.property.findMany({
    where,
    orderBy: {
      [params.sortBy as string]: params.order,
    },
    select: {
      id: true,
      name: true,
      city: true,
      province: true,
      country: true,

      latitude: true,
      longitude: true,

      averageRating: true,
      reviewCount: true,

      propertyImages: {
        where: { isCover: true },
        select: { imageUrl: true },
      },

      roomTypes: {
        select: {
          basePrice: true,
          roomTypePrices:
            params.checkIn && params.checkOut
              ? {
                  where: {
                    date: {
                      gte: new Date(params.checkIn),
                      lt: new Date(params.checkOut),
                    },
                  },
                }
              : false,
        },
        orderBy: { basePrice: "asc" },
      },
    },
  });

  const filtered = properties.filter((property) => {
    if (!dates.length) return true;

    return property.roomTypes.some((roomType) => {
      if (!roomType.roomTypePrices) return false;

      const validDates = roomType.roomTypePrices.filter(
        (p) => p.availableRooms > 0 && !p.isClosed,
      );

      return validDates.length === dates.length;
    });
  });

  return filtered.map((property) => ({
    id: property.id,
    name: property.name,
    city: property.city,
    province: property.province,
    latitude: property.latitude,
    longitude: property.longitude,
    country: property.country,
    price: property.roomTypes[0]?.basePrice,
    averageRating: property.averageRating,
    reviewCount: property.reviewCount,
    coverImage: property.propertyImages[0]?.imageUrl,
  }));
};

export const getPropertyRoomPricesDate = async ({
  propertyId,
  startDate,
  endDate,
}: {
  propertyId: string;
  startDate: string;
  endDate: string;
}) => {
  const roomTypes = await prisma.roomType.findMany({
    where: { propertyId },
    orderBy: {
      basePrice: "asc",
    },
    select: {
      id: true,
      basePrice: true,
    },
  });

  const roomTypesWithBasePrice = roomTypes.map((roomType) => ({
    ...roomType,
    basePrice: Number(roomType.basePrice),
  }));

  const roomTypeIds = roomTypesWithBasePrice.map((roomType) => roomType.id);

  const roomTypePrices = await prisma.roomTypePrice.findMany({
    where: {
      roomTypeId: {
        in: roomTypeIds,
      },
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
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
      buildDateKey(roomTypePrice.roomTypeId, toLocalFromDb(roomTypePrice.date)),
      roomTypePrice,
    ]),
  );

  const allDates = getDatesInRangeInclusive(startDate, endDate);

  const raw = roomTypeIds.flatMap((roomTypeId) =>
    allDates.map((date) => {
      const key = buildDateKey(roomTypeId, date);
      const data = roomTypePricesMap.get(key);

      return {
        roomTypeId,
        date: toDateKey(date),
        price: Number(data?.price) ?? 0,
        availableRooms: Number(data?.availableRooms) ?? 0,
        isClosed: data?.isClosed ?? true,
      };
    }),
  );

  const result = transformRoomTypePrices(raw, roomTypesWithBasePrice);

  // const result = roomTypes.map((roomType) => {
  //   const dates = fillEmpty
  //     .filter((item) => item.roomTypeId === roomType.id)
  //     .reduce(
  //       (acc, item) => {
  //         acc[item.date] = {
  //           price: item.price,
  //           availableRooms: item.availableRooms,
  //           isClosed: item.isClosed,
  //         };
  //         return acc;
  //       },
  //       {} as Record<string, any>,
  //     );

  //   return {
  //     ...roomType,
  //     dates,
  //   };
  // });

  return result;
};
