import cron from "node-cron";
import { prisma } from "../lib/prisma.lib.js";
import { ReservationStatus } from "../../generated/prisma/client.js";

export const expiredReservationJob = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("Running expired reservation job....");

    const now = new Date();

    const expiredReservations = await prisma.reservation.findMany({
      where: {
        status: ReservationStatus.WAITING_PAYMENT,
        paymentDeadline: {
          lt: now,
        },
      },
    });

    for (const reservation of expiredReservations) {
      let current = new Date(reservation.checkInDate);
      const end = new Date(reservation.checkOutDate);

      while (current < end) {
        await prisma.roomAvailability.updateMany({
          where: {
            roomTypeId: reservation.roomTypeId,
            date: {
              gte: new Date(current.setHours(0, 0, 0, 0)),
              lt: new Date(current.setHours(23, 59, 59, 999)),
            },
          },
          data: {
            availableQuantity: {
              increment: 1,
            },
          },
        });
        current.setDate(current.getDate() + 1);
      }

      // update status

      await prisma.reservation.update({
        where: { id: reservation.id },
        data: {
          status: ReservationStatus.EXPIRED,
        },
      });
    }

    console.log(`✅ Expired ${expiredReservations.length} reservations`);
  });
};
