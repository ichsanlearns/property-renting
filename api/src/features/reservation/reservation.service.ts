import { prisma } from "../../shared/lib/prisma.lib.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import { ReservationStatus } from "../../generated/prisma/enums.js";
import type { CreateReservationInput } from "./reservation.validator.js";

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
  const { roomTypeId, checkInDate, checkOutDate, guestCount, usePoints } =
    payload;

  //  normalize date
  const checkIn = normalizeDate(new Date(checkInDate));
  const checkOut = normalizeDate(new Date(checkOutDate));

  if (checkOut <= checkIn) {
    throw new AppError("Invalid date range", 400);
  }

  //  generate dates
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

    if (guestCount > roomType.capacity) {
      throw new AppError("Guest exceeds room capacity", 400);
    }

    //  pakai range query (LEBIH AMAN)
    const availability = await tx.roomTypePrice.findMany({
      where: {
        roomTypeId,
        date: {
          gte: new Date(checkInDate),
          lt: new Date(checkOutDate),
        },
      },
    });

    //  cek apakah semua tanggal ada
    if (availability.length !== dates.length) {
      throw new AppError("Room not available for selected dates", 400);
    }

    //  cek stok
    for (const day of availability) {
      if (day.availableRooms <= 0) {
        throw new AppError("Room fully booked on selected date", 400);
      }
    }

    //  hitung harga
    const totalAmount =
      Number(roomType.basePrice) * dates.length - (usePoints ?? 0);

    //  update availability
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

    // create reservation
    const reservation = await tx.reservation.create({
      data: {
        customerId: userId,
        roomTypeId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guestCount,
        usingPoints: usePoints ?? 0,
        totalAmount,
        status: ReservationStatus.WAITING_PAYMENT,
        paymentDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
      },
    });

    return reservation;
  });
};
