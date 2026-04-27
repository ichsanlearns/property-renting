import { prisma } from "../../shared/lib/prisma.lib.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import { ReservationStatus } from "../../generated/prisma/enums.js";
import type { CreateReservationInput } from "./reservation.validator.js";
import { generateReservationCode } from "./utils/generate-code.util.js";

const normalizeDate = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const createReservation = async ({ userId, payload }: { userId: string; payload: CreateReservationInput }) => {
  const existingReservation = await prisma.reservation.findFirst({
    where: {
      customerId: userId,
      roomTypeId: payload.roomTypeId,
      status: ReservationStatus.WAITING_PAYMENT,
    },
  });

  if (existingReservation) {
    throw new AppError("You have an existing reservation", 400);
  }

  const checkIn = normalizeDate(new Date(payload.checkInDate));
  const checkOut = normalizeDate(new Date(payload.checkOutDate));

  if (checkOut <= checkIn) {
    throw new AppError("Invalid date range", 400);
  }

  const dates: string[] = [];

  let current = new Date(payload.checkInDate);

  while (current < new Date(payload.checkOutDate)) {
    dates.push(current.toISOString().split("T")[0]!);
    current.setDate(current.getDate() + 1);
  }

  return await prisma.$transaction(async (tx) => {
    const roomType = await tx.roomType.findUnique({
      where: { id: payload.roomTypeId },
    });

    if (!roomType) throw new AppError("Room type not found", 404);

    const availability = await tx.roomTypePrice.findMany({
      where: {
        roomTypeId: payload.roomTypeId,
        date: {
          gte: new Date(payload.checkInDate),
          lt: new Date(payload.checkOutDate),
        },
      },
    });

    if (availability.length !== dates.length) {
      throw new AppError("Room not available for selected dates", 400);
    }

    for (const day of availability) {
      if (day.availableRooms <= 0) {
        throw new AppError("Room fully booked on selected date", 400);
      }
    }

    const totalPriceDate = availability.reduce((acc, day) => acc + Number(day.price), 0);

    if (totalPriceDate !== payload.totalAmount) {
      throw new AppError("Theres change in price, please refresh the page", 400);
    }

    for (const day of availability) {
      await tx.roomTypePrice.update({
        where: { id: day.id },
        data: {
          availableRooms: {
            decrement: 1,
          },
        },
      });
    }

    let reservationCode: string;
    while (true) {
      reservationCode = generateReservationCode(payload.propertyNameSnapshot);

      try {
        const data = {
          customerId: userId,
          roomTypeId: payload.roomTypeId,
          reservationCode,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          numberOfNights: payload.numberOfNights,
          totalAmount: payload.totalAmount,
          status: ReservationStatus.WAITING_PAYMENT,
          paymentDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
          roomNameSnapshot: payload.roomNameSnapshot,
          propertyNameSnapshot: payload.propertyNameSnapshot,
          averageRoomPerNightSnapshot: payload.averageRoomPerNightSnapshot,
        };

        await tx.reservation.create({ data });

        break;
      } catch (error: any) {
        if (error.code === "P2002") {
          continue;
        }
        throw error;
      }
    }

    return { reservationCode };
  });
};

export const getMyReservations = async (userId: string) => {
  return await prisma.reservation.findMany({
    where: {
      customerId: userId,
    },
    include: {
      roomType: {
        include: {
          property: true,
          roomTypeImages: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getTenantReservations = async (tenantId: string) => {
  return await prisma.reservation.findMany({
    where: {
      roomType: {
        property: {
          tenantId: tenantId,
        },
      },
    },
    include: {
      customer: true,
      roomType: {
        include: {
          property: true,
          roomTypeImages: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getReservationByCode = async ({ reservationCode, userId }: { reservationCode: string; userId: string }) => {
  const reservation = await prisma.reservation.findUnique({
    where: { reservationCode },
    include: {
      roomType: {
        include: {
          property: true,
          roomTypeImages: true,
        },
      },
    },
  });

  if (!reservation) {
    throw new AppError("Reservation not found", 404);
  }

  if (reservation.customerId !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  return reservation;
};

export const getReservationById = async ({ id, userId }: { id: string; userId: string }) => {
  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: {
      roomType: {
        include: {
          property: true,
          roomTypeImages: true,
        },
      },
    },
  });

  if (!reservation) {
    throw new AppError("Reservation not found", 404);
  }

  if (reservation.customerId !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  return reservation;
};

export const cancelReservation = async ({ reservationId, userId }: { reservationId: string; userId: string }) => {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
  });

  if (!reservation) {
    throw new AppError("Reservation not found", 404);
  }

  if (reservation.customerId !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  if (reservation.status !== ReservationStatus.WAITING_PAYMENT) {
    throw new AppError("Only unpaid reservations can be canceled", 400);
  }

  return await prisma.reservation.update({
    where: { id: reservationId },
    data: {
      status: ReservationStatus.CANCELED,
    },
  });
};
