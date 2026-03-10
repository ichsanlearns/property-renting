import { prisma } from "../src/shared/lib/prisma.lib.js";
import { Role } from "../src/generated/prisma/enums.js";

import { generateReferralCode } from "../src/shared/utils/referral.util.js";

const seed = async () => {
  try {
    await prisma.user.deleteMany({});

    console.info("🌱 Seeding started...");

    // =============================
    // USERS
    // =============================
    const users = [
      {
        id: "012e717a-2429-4757-945f-e24724bcd7ac",
        first_name: "Ichsan",
        last_name: "",
        email: "ichsan@mail.com",
        phone_number: "087827689265",
        password: "password123",
        role: Role.CUSTOMER,
        is_verified: false,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
      },
    ];
    await prisma.user.createMany({
      data: users,
    });

    // =============================
    // DONE
    // =============================
    console.info("✅ Seeding completed successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
