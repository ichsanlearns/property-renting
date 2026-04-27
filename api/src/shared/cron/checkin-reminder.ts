import cron from "node-cron";
import { prisma } from "../lib/prisma.lib.js";
import { sendCheckinReminderEmail } from "../services/reminder-email.service.js";

export const checkinReminderJob = () => {
  cron.schedule("0 8 * * *", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const start = new Date(tomorrow);
    start.setHours(0, 0, 0, 0);

    const end = new Date(tomorrow);
    end.setHours(23, 59, 59, 999);

    const bookings = await prisma.reservation.findMany({
      where: {
        status: "PAID",
        checkInDate: {
          gte: start,
          lte: end,
        },
      },
      include: {
        customer: true,
      },
    });

    for (const item of bookings) {
      await sendCheckinReminderEmail({
        to: item.customer.email,
        name: item.customer.firstName || "Guest",
        property: item.propertyNameSnapshot,
        checkIn: item.checkInDate,
      });
    }
  });
};
