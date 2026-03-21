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

    for (const amenity of amenities) {
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
    return property;
  });
};
