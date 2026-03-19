import { prisma } from "../../../shared/lib/prisma.lib.js";

export const getAll = async () => {
  const amenities = await prisma.amenity.findMany({
    select: {
      id: true,
      name: true,
      icon: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return amenities;
};
