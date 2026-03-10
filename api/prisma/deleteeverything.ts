import { prisma } from "../src/shared/lib/prisma.lib.js";

async function deleteSeed() {
  try {
    // =============================
    // CLEAN DB
    // =============================
    await prisma.user.deleteMany({});

    console.info("✅ Seeding completed successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

deleteSeed();
