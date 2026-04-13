import { ensurePrices } from "../src/features/property/room/room.service.js";
import { prisma } from "../src/shared/lib/prisma.lib.js";

async function main() {
  try {
    console.info("Seeding prices...");

    await prisma.roomTypePrice.deleteMany({
      where: {
        roomTypeId: "2f1a064b-2a23-439c-a7f1-617cdd983023",
      },
    });

    await ensurePrices({
      roomTypeId: "2f1a064b-2a23-439c-a7f1-617cdd983023",
      daysAhead: 30,
    });
    console.info("Prices seeded successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
