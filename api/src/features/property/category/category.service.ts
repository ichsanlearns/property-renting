import { prisma } from "../../../shared/lib/prisma.lib.js";

export const getAll = async () => {
  const categories = await prisma.propertyCategory.findMany({
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });

  return {
    categories,
  };
};
