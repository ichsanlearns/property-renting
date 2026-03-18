import { prisma } from "../../shared/lib/prisma.lib.js";

import { AppError } from "../../shared/utils/app-error.util.js";
import type { CreatePropertyDto } from "./property.type.js";

export const create = async ({
  data,
  tenantId,
}: {
  data: CreatePropertyDto;
  tenantId: string;
}) => {
  const category = await prisma.propertyCategory.findUnique({
    where: { id: data.categoryId },
  });

  if (!category) throw new AppError(404, "Category not found");

  const property = await prisma.property.create({
    data: { ...data, tenantId },
  });

  return property;
};
