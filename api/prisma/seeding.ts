import { prisma } from "../src/shared/lib/prisma.lib.js";
import { Role } from "../src/generated/prisma/enums.js";
import bcrypt from "bcrypt";

import { generateReferralCode } from "../src/shared/utils/referral.util.js";

const seed = async () => {
  try {
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.propertyCategory.deleteMany({});

    console.info("🌱 Seeding started...");

    // =============================
    // USERS
    // =============================
    const password = await bcrypt.hash("password123", 10);

    const users = [
      {
        id: "012e717a-2429-4757-945f-e24724bcd7ac",
        firstName: "customer",
        lastName: "",
        email: "customer@mail.com",
        phoneNumber: "087827689265",
        password: password,
        role: Role.CUSTOMER,
        isVerified: false,
        referralCode: generateReferralCode(),
        profileImage:
          "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
      },
      {
        id: "17a6619c-f6b5-469a-adf4-66196a67d187",
        firstName: "tenant",
        lastName: "",
        email: "tenant@mail.com",
        phoneNumber: "087812345678",
        password: password,
        role: Role.TENANT,
        isVerified: false,
        referralCode: generateReferralCode(),
        profileImage:
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
      {
        id: "b1eac0c3-61c0-4f3f-b8fa-3a5c6b0e8b2c",
        name: "Villa",
      },
      {
        id: "e1f36b9c-8c6f-4c4f-b8b5-0c5c7e3f4b6d",
        name: "Condominium",
      },
      {
        id: "b8c0d4f2-3f47-4f74-9c0d-9c2f0e4b1c11",
        name: "Townhouse",
      },
      {
        id: "9f0c3a5b-91b7-4d71-b5d8-8c3e4c5a2d55",
        name: "Guesthouse",
      },
      {
        id: "7a3e4b2d-6f5a-4a3d-9c8b-0d3f1e7b2a99",
        name: "Studio",
      },
      {
        id: "5c7a4b1e-3f9c-4a6d-8e7f-2c1a3b5d6e44",
        name: "Loft",
      },
      {
        id: "2d6f3a4b-7e8c-4a9b-b1f2-5e3d6c7a8b12",
        name: "Cabin",
      },
      {
        id: "8a1e3c5b-4d7f-4f2b-a6c3-9d5e1b7a3f90",
        name: "Bungalow",
      },
      {
        id: "3f6b9c1d-7a2e-4c8b-9d3f-1a7e5c6b2d44",
        name: "Cottage",
      },
      {
        id: "4a9b1c7d-2e3f-4b8a-9c5d-6f1e7a2b3c88",
        name: "Serviced Apartment",
      },
      {
        id: "6e2c7b4a-9d1f-4b3a-8c7e-3f5a2b6c1d77",
        name: "Resort Villa",
      },
    ];
    await prisma.propertyCategory.createMany({
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
