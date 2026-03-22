import { prisma } from "../src/shared/lib/prisma.lib.js";

async function deleteSeed() {
  try {
    // =============================
    // CLEAN DB
    // =============================
    console.info("🌱 Deleting everything...");

    await prisma.refreshToken.deleteMany({});
    await prisma.propertyAmenity.deleteMany({});
    await prisma.propertyImage.deleteMany({});
    await prisma.roomTypeImage.deleteMany({});
    await prisma.property.deleteMany({});
    await prisma.propertyCategory.deleteMany({});
    await prisma.amenity.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.reservation.deleteMany({});
    await prisma.priceAdjustment.deleteMany({});
    await prisma.voucher.deleteMany({});
    await prisma.point.deleteMany({});
    await prisma.coupon.deleteMany({});

    console.info("✅ Deleting everything completed successfully");
  } catch (error) {
    console.error("❌ Deleting everything failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

deleteSeed();
