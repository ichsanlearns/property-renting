import { prisma } from "../../shared/lib/prisma.lib.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import { ReservationStatus } from "../../generated/prisma/enums.js";
import type { CreateReservationInput } from "./reservation.validator.js";

export const createReservation = async ({ userId, payload }: { userId: string; payload: CreateReservationInput }) => {
  const { roomTypeId, checkInDate, checkOutDate, guestCount, usePoints } = payload;

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (checkOut <= checkIn) {
    throw new AppError(400, "Invalid date range");
  }

  const dates: Date[] = [];
  let current = new Date(checkIn);

  while (current < checkOut) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return await prisma.$transaction(async (tx) => {
    const roomType = await tx.roomType.findUnique({
      where: { id: roomTypeId },
    });

    if (!roomType) throw new AppError(404, "Room type not found");

    if (guestCount > roomType.capacity) {
      throw new AppError(400, "Guest exceeds room capacity");
    }

    const availability = await tx.roomAvailability.findMany({
      where: {
        room_type_id: roomTypeId,
        date: { in: dates },
      },
    });

    if (availability.length !== dates.length) {
      throw new AppError(400, "Room not available for selected dates");
    }

    availability.forEach((day) => {
      if (day.available_quantity <= 0) {
        throw new AppError(400, "Room fully booked on selected date");
      }
    });

    const totalAmount = Number(roomType.base_price) * dates.length - (usePoints ?? 0);

    for (const day of availability) {
      await tx.roomAvailability.update({
        where: { id: day.id },
        data: {
          available_quantity: {
            decrement: 1,
          },
        },
      });
    }

    const reservation = await tx.reservation.create({
      data: {
        customer_id: userId,
        room_type_id: roomTypeId,
        check_in_date: checkIn,
        check_out_date: checkOut,
        guest_count: guestCount,
        using_points: usePoints ?? 0,
        total_amount: totalAmount,
        status: ReservationStatus.WAITING_PAYMENT,
        payment_deadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
      },
    });

    return reservation;
  });
};
