import { prisma } from "../src/shared/lib/prisma.lib.js";
import { Role, AmenityType } from "../src/generated/prisma/enums.js";
import bcrypt from "bcrypt";

import { generateReferralCode } from "../src/shared/utils/referral.util.js";

const seed = async () => {
  try {
    console.log("Deleting all data...");

    await prisma.refreshToken.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.propertyAmenity.deleteMany({});
    await prisma.propertyImage.deleteMany({});
    await prisma.roomTypeImage.deleteMany({});
    await prisma.property.deleteMany({});
    await prisma.registerToken.deleteMany({});
    await prisma.propertyCategory.deleteMany({});
    await prisma.amenity.deleteMany({});
    await prisma.roomType.deleteMany({});
    await prisma.reservation.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.voucher.deleteMany({});
    await prisma.point.deleteMany({});
    await prisma.coupon.deleteMany({});
    await prisma.roomTypePrice.deleteMany({});
    await prisma.priceOverride.deleteMany({});
    await prisma.pricingRule.deleteMany({});

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
        isVerified: true,
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
        isVerified: true,
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
    // AMENITIES
    // =============================
    const propertyAmenities = [
      {
        id: "012e717a-2429-4757-945f-e24724bcd7ac",
        name: "WiFi",
        icon: "wifi",
        type: AmenityType.PROPERTY,
      },
      {
        id: "17a6619c-f6b5-469a-adf4-66196a67d187",
        name: "Parking",
        icon: "local_parking",
        type: AmenityType.PROPERTY,
      },
      {
        id: "b1eac0c3-61c0-4f3f-b8fa-3a5c6b0e8b2c",
        name: "AC",
        icon: "ac_unit",
        type: AmenityType.PROPERTY,
      },
      {
        id: "e1f36b9c-8c6f-4c4f-b8b5-0c5c7e3f4b6d",
        name: "Kitchen",
        icon: "kitchen",
        type: AmenityType.PROPERTY,
      },
      {
        id: "b8c0d4f2-3f47-4f74-9c0d-9c2f0e4b1c11",
        name: "Gym",
        icon: "fitness_center",
        type: AmenityType.PROPERTY,
      },
      {
        id: "7a3e4b2d-6f5a-4a3d-9c8b-0d3f1e7b2a99",
        name: "Pool",
        icon: "pool",
        type: AmenityType.PROPERTY,
      },
      {
        id: "5c7a4b1e-3f9c-4a6d-8e7f-2c1a3b5d6e44",
        name: "Laundry",
        icon: "local_laundry_service",
        type: AmenityType.PROPERTY,
      },
      {
        id: "2d6f3a4b-7e8c-4a9b-b1f2-5e3d6c7a8b12",
        name: "Security",
        icon: "security",
        type: AmenityType.PROPERTY,
      },
    ];

    await prisma.amenity.createMany({
      data: propertyAmenities,
    });

    const roomAmenities = [
      {
        id: "9f6b7c3e-8d2a-4b1f-9c75-3a6e2f9d1c40",
        name: "AC",
        icon: "ac_unit",
        type: AmenityType.ROOM,
      },
      {
        id: "1c8a9d72-5b3f-4e6a-8f21-7d4c9b2a0e55",
        name: "Smart TV",
        icon: "tv",
        type: AmenityType.ROOM,
      },
      {
        id: "7a2f1c9e-3d8b-4f6a-b5c2-9e1d7a3f4b68",
        name: "Balcony",
        icon: "balcony",
        type: AmenityType.ROOM,
      },
      {
        id: "d4b9e2a1-6f3c-4a7d-8b25-1c9e0f2a6d73",
        name: "Workspace",
        icon: "computer",
        type: AmenityType.ROOM,
      },
      {
        id: "3e7a1c5d-9b2f-4d6a-a8c1-5f3e9b7d2a10",
        name: "Minibar",
        icon: "coffee_maker",
        type: AmenityType.ROOM,
      },
      {
        id: "8c2d7a1f-4b6e-4f3a-9d25-6a1c7e2b9f44",
        name: "High Speed",
        icon: "wifi",
        type: AmenityType.ROOM,
      },
      {
        id: "5b1e9d3a-7c4f-4a6d-b2c8-0f3a9e7d1c66",
        name: "In-room Safe",
        icon: "lock",
        type: AmenityType.ROOM,
      },
      {
        id: "a9d3f7c1-2b6e-4a5d-8c21-7e4f1a9b3d88",
        name: "Mini Fridge",
        icon: "kitchen",
        type: AmenityType.ROOM,
      },
    ];

    await prisma.amenity.createMany({
      data: roomAmenities,
    });

    const seedRoomAvailability = async () => {
      const roomTypes = await prisma.roomType.findMany();

      const today = new Date();
      const totalDays = 30;

      for (const room of roomTypes) {
        for (let i = 0; i < totalDays; i++) {
          const date = new Date();
          date.setDate(today.getDate() + i);
          date.setHours(0, 0, 0, 0);

          await prisma.roomTypePrice.upsert({
            where: {
              roomTypeId_date: {
                roomTypeId: room.id,
                date: date,
              },
            },
            update: {
              availableRooms: room.totalRooms,
            },
            create: {
              roomTypeId: room.id,
              date: date,
              availableRooms: room.totalRooms,
              price: room.basePrice,
            },
          });
        }
      }

      console.log("✅ Room availability seeded (UPSERT)");
    };

    await seedRoomAvailability();

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
