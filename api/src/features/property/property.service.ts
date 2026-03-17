import { prisma } from "../../shared/lib/prisma.lib.js";

import { AppError } from "../../shared/utils/app-error.util.js";
import type { CreatePropertyDto } from "./property.type.js";

export const create = async ({ data }: { data: CreatePropertyDto }) => {
  const createPayload = {
    tenant_id: data.tenantId,
    category_id: data.categoryId,
    title: data.title,
    description: data.description,
    country: data.country,
    city: data.city,
    full_address: data.fullAddress,
    latitude: data.latitude,
    longitude: data.longitude,
    number_of_bathrooms: data.numberOfBathrooms,
  };

  const category = await prisma.propertyCategory.findUnique({
    where: { id: createPayload.category_id },
  });

  if (!category) throw new AppError(404, "Category not found");

  const property = await prisma.property.create({
    data: createPayload,
  });

  return property;
};
