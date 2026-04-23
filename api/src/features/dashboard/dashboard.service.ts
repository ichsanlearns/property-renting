import { prisma } from "../../shared/lib/prisma.lib.js";
import { format } from "date-fns";

export const getTenantDashboard = async (tenantId: string) => {
  const reservations = await prisma.reservation.findMany({
    where: {
      roomType: {
        property: {
          tenantId,
        },
      },
    },
    include: {
      roomType: {
        include: {
          property: true,
        },
      },
      customer: true,
    },
  });

  const properties = await prisma.property.count({
    where: {
      tenantId,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: tenantId,
    },
    select: {
      firstName: true,
    },
  });

  const paid = reservations.filter((r) => r.status === "PAID");

  const totalRevenue = paid.reduce((sum, item) => sum + Number(item.totalAmount), 0);

  const totalBookings = reservations.length;

  const occupancyRate = totalBookings === 0 ? 0 : Math.round((paid.length / totalBookings) * 100);

  const recentBookings = reservations.slice(0, 5).map((r) => ({
    property: r.roomType.property.name,

    guest: r.customer?.firstName || "Guest",

    checkIn: format(new Date(r.checkInDate), "MMM dd, yyyy"),

    checkOut: format(new Date(r.checkOutDate), "MMM dd, yyyy"),

    amount: Number(r.totalAmount),

    status: r.status,
  }));

  return {
    firstName: user?.firstName || "User",

    totalRevenue,
    totalBookings,
    activeProperties: properties,
    occupancyRate,
    recentBookings,
  };
};
