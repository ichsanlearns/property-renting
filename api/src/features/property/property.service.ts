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
    roomTypes: property.roomTypes,
  };
};
