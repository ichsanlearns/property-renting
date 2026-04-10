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

export const createReservation = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: CreateReservationInput;
}) => {
  const {
    roomTypeId,
    checkInDate,
    checkOutDate,
    numberOfNights,
    totalAmount,
    roomNameSnapshot,
    propertyNameSnapshot,
    averageRoomPerNightSnapshot,
  } = payload;

  const checkIn = normalizeDate(new Date(checkInDate));
  const checkOut = normalizeDate(new Date(checkOutDate));

  if (checkOut <= checkIn) {
    throw new AppError("Invalid date range", 400);
  }

  const dates: string[] = [];

  let current = new Date(checkInDate);

  while (current < new Date(checkOutDate)) {
    dates.push(current.toISOString().split("T")[0]!);
    current.setDate(current.getDate() + 1);
  }

  return await prisma.$transaction(async (tx) => {
    const roomType = await tx.roomType.findUnique({
      where: { id: roomTypeId },
    });

    if (!roomType) throw new AppError("Room type not found", 404);

    const availability = await tx.roomTypePrice.findMany({
      where: {
        roomTypeId,
        date: {
          gte: new Date(checkInDate),
          lt: new Date(checkOutDate),
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

    const totalPriceDate = availability.reduce(
      (acc, day) => acc + Number(day.price),
      0,
    );

    if (totalPriceDate !== totalAmount) {
      throw new AppError(
        "Theres change in price, please refresh the page",
        400,
      );
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

    const reservationCode = generateReservationCode(propertyNameSnapshot);

    const data = {
      customerId: userId,
      roomTypeId,
      reservationCode,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numberOfNights,
      totalAmount,
      status: ReservationStatus.WAITING_PAYMENT,
      paymentDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
      roomNameSnapshot,
      propertyNameSnapshot,
      averageRoomPerNightSnapshot,
    };

    await tx.reservation.create({
      data,
    });

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
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
