import { prisma } from "../src/shared/lib/prisma.lib.js";
import { Role } from "../src/generated/prisma/enums.js";
import bcrypt from "bcrypt";

import { generateReferralCode } from "../src/shared/utils/referral.util.js";

const seed = async () => {
  try {
    await prisma.user.deleteMany({});

    console.info("🌱 Seeding started...");

    // =============================
    // USERS
    // =============================
    const password = await bcrypt.hash("password123", 10);

    const users = [
      {
        id: "012e717a-2429-4757-945f-e24724bcd7ac",
        first_name: "customer",
        last_name: "",
        email: "customer@mail.com",
        phone_number: "087827689265",
        password: password,
        role: Role.CUSTOMER,
        is_verified: false,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
      },
      {
        id: "17a6619c-f6b5-469a-adf4-66196a67d187",
        first_name: "tenant",
        last_name: "",
        email: "tenant@mail.com",
        phone_number: "087812345678",
        password: password,
        role: Role.TENANT,
        is_verified: false,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475",
      },
    ];
    await prisma.user.createMany({
      data: users,
    });

    // =============================
    // Property Categories
    // =============================
    const propertyCategories = [
      {
        id: "012e717a-2429-4757-945f-e24724bcd7ac",
        name: "Apartment",
      },
      {
        id: "17a6619c-f6b5-469a-adf4-66196a67d187",
        name: "House",
      },
    ];
    await prisma.category.createMany({
      data: propertyCategories,
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
