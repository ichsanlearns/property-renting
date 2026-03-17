import { prisma } from "../../shared/lib/prisma.lib.js";

import { AppError } from "../../shared/utils/app-error.util.js";

export const create = async ({
  tenant_id,
  category_id,
  title,
  description,
  country,
  city,
  full_address,
  latitude,
  longitude,
  number_of_bathrooms,
}: {
  tenant_id: string;
  category_id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  full_address: string;
  latitude: string;
  longitude: string;
  number_of_bathrooms: number;
}) => {
  const category = await prisma.propertyCategory.findUnique({
    where: { id: category_id },
  });

  if (!category) throw new AppError(404, "Category not found");

  const property = await prisma.property.create({
    data: {
      tenant_id,
      category_id,
      title,
      description,
      country,
      city,
      full_address,
      latitude,
      longitude,
      number_of_bathrooms,
    },
  });

  return property;
};
