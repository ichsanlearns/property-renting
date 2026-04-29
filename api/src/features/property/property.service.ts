import { prisma } from "../../shared/lib/prisma.lib.js";

import { AppError } from "../../shared/utils/app-error.util.js";
import type {
  CreatePropertyDto,
  updatePropertPayload,
} from "./property.type.js";
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
  city?: string;
  sortBy?: "name" | "minPrice" | "createdAt";
  order?: "asc" | "desc";
  page?: number;
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

export const update = async ({
  propertyId,
  tenantId,
  data,
  categoryId,
  images,
  amenities,
}: {
  propertyId: string;
  tenantId: string;
  data: updatePropertPayload;
  categoryId: string;
  images?: {
    imageUrl: string;
    publicId?: string;
    isCover: boolean;
    order: number;
  }[];
  amenities: string[];
}) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  if (property.tenantId !== tenantId) {
    throw new AppError("You are not authorized to update this property", 403);
  }

  return await prisma.$transaction(async (tx) => {
    const property = await tx.property.update({
      where: {
        id: propertyId,
      },
      data: {
        ...data,
        category: {
          connect: { id: categoryId },
        },
      },
      omit: {
        deletedAt: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    if (images) {
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
    }

    const existingAmenities = await tx.propertyAmenity.findMany({
      where: {
        propertyId,
      },
    });

    const existingIds = new Set(existingAmenities.map((a) => a.amenityId));
    const newIds = new Set(amenities);

    const toDelete = existingAmenities.filter((a) => !newIds.has(a.amenityId));

    const toAdd = amenities.filter((id) => !existingIds.has(id));

    await tx.propertyAmenity.deleteMany({
      where: {
        id: { in: toDelete.map((a) => a.id) },
      },
    });

    await tx.propertyAmenity.createMany({
      data: toAdd.map((id) => ({
        propertyId,
        amenityId: id,
      })),
    });
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

      minPrice: true,

      propertyImages: {
        where: {
          isCover: true,
        },
        select: {
          imageUrl: true,
        },
      },
    },
    where: {
      isPublished: "PUBLISHED",
    },
    take: 8,
  });

  return properties.map((property) => ({
    id: property.id,
    name: property.name,
    city: property.city,
    province: property.province,
    country: property.country,
    price: property.minPrice,
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
  const page = Number(params.page) || 1;
  const limit = 6;

  const where: Prisma.PropertyWhereInput = {
    isPublished: "PUBLISHED",
    minPrice: { not: null },
  };

  if (params.search) {
    where.name = {
      contains: params.search,
      mode: "insensitive",
    };
  }

  if (params.city) {
    where.city = {
      contains: params.city,
      mode: "insensitive",
    };
  }

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
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalProperties = await prisma.property.count({
    where,
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

  return {
    data: filtered.map((property) => ({
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
    })),
    pagination: {
      total: totalProperties,
      page,
      limit,
      totalPages: Math.ceil(totalProperties / limit),
    },
  };
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

  return result;
};

export const getCities = async () => {
  const cities = await prisma.property.groupBy({
    by: ["city"],
    where: {
      isPublished: "PUBLISHED",
    },
    _count: {
      city: true,
    },
  });

  // return cities.map((city) => city.city);
  return cities.map((city) => ({ name: city.city, count: city._count.city }));
};

export const deleteProperty = async (propertyId: string, tenantId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      id: true,
      name: true,
      tenantId: true,
    },
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  if (property.tenantId !== tenantId) {
    throw new AppError("Unauthorized", 401);
  }

  await prisma.property.delete({
    where: { id: propertyId },
  });
};
