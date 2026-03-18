import { prisma } from "../../../shared/lib/prisma.lib.js";

export const getAll = async () => {
  return await prisma.propertyCategory.findMany({
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};
