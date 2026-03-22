import type { AmenityType } from "../../../generated/prisma/enums.js";
import { prisma } from "../../../shared/lib/prisma.lib.js";

export const getAll = async (type: AmenityType) => {
  const amenities = await prisma.amenity.findMany({
    select: {
      id: true,
      name: true,
      icon: true,
    },
    where: {
      type,
    },
    orderBy: {
      name: "asc",
    },
  });
  return amenities;
};
