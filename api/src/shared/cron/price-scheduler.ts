import cron from "node-cron";
import * as RoomService from "../../features/property/room/room.service.js";
import { prisma } from "../lib/prisma.lib.js";

export function startPriceScheduler() {
  cron.schedule(
    "0 0 * * *",
    async () => {
      console.log("Running ensurePrices job...");

      const rooms = await prisma.roomType.findMany({
        select: { id: true },
      });

      await Promise.all(
        rooms.map((room) =>
          RoomService.ensurePrices({
            roomTypeId: room.id,
            daysAhead: 90,
          }),
        ),
      );
    },
    {
      timezone: "Asia/Jakarta",
    },
  );
}
