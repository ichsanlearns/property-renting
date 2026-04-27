import { prisma } from "../../shared/lib/prisma.lib.js";

export const getReportsDashboard = async (tenantId: string) => {
  const properties = await prisma.property.findMany({
    where: {
      tenantId,
      deletedAt: null,
    },
    include: {
      roomTypes: true,
      propertyImages: true,
    },
  });

  const propertyIds = properties.map((p) => p.id);

  const reservations = await prisma.reservation.findMany({
    where: {
      status: {
        in: ["PAID", "REVIEWED"],
      },
      roomType: {
        propertyId: {
          in: propertyIds,
        },
      },
    },
    include: {
      roomType: {
        include: {
          property: true,
        },
      },
    },
  });

  const totalRevenue = reservations.reduce((sum, item) => sum + Number(item.totalAmount), 0);

  const totalBookings = reservations.length;

  const activeProperties = properties.filter((item) => item.isPublished === "PUBLISHED").length;

  const occupancyRate = properties.length > 0 ? Math.round((totalBookings / properties.length) * 10) : 0;

  // Revenue Chart
  const revenueMap: any = {};

  reservations.forEach((item) => {
    const date = item.createdAt.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    revenueMap[date] = (revenueMap[date] || 0) + Number(item.totalAmount);
  });

  const revenueData = Object.entries(revenueMap).map(([date, revenue]) => ({
    date,
    revenue,
  }));

  // Booking per property
  const bookingMap: any = {};

  reservations.forEach((item) => {
    const name = item.roomType.property.name;

    bookingMap[name] = (bookingMap[name] || 0) + 1;
  });

  const bookingData = Object.entries(bookingMap).map(([name, bookings]) => ({
    name,
    bookings,
  }));

  // Table
  const propertySales = properties.map((property) => {
    const related = reservations.filter((r) => r.roomType.property.id === property.id);

    const bookings = related.length;

    const revenue = related.reduce((sum, item) => sum + Number(item.totalAmount), 0);

    const avg = bookings > 0 ? revenue / bookings : 0;

    return {
      name: property.name,
      bookings,
      revenue,
      avg,
      status: revenue > 10000000 ? "High Yield" : bookings > 5 ? "Popular" : "Stable",
      image: property.propertyImages.find((img) => img.isCover)?.imageUrl || property.propertyImages[0]?.imageUrl || "",
    };
  });

  return {
    summary: {
      totalRevenue,
      totalBookings,
      activeProperties,
      occupancyRate,
    },
    revenueData,
    bookingData,
    propertySales,
  };
};
