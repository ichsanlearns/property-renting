import { prisma } from "../../shared/lib/prisma.lib.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import type { PropertyCreateInput } from "./property.type.js";

export const create = async (data: PropertyCreateInput) => {
  const categoryIsExist = await prisma.category.findUnique({
    where: {
      id: data.category_id,
    },
  });

  if (!categoryIsExist) {
    throw new AppError(404, "Category not found");
  }

  await prisma.property.create({
    data,
  });
};
