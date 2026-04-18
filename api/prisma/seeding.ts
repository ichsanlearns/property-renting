import { prisma } from "../src/shared/lib/prisma.lib.js";
import {
  Role,
  AmenityType,
  PriceAdjustmentType,
  BedType,
  ViewType,
  BathroomType,
  PublishStatus,
  ScopeType,
  PriceAdjustmentDirection,
} from "../src/generated/prisma/enums.js";
import bcrypt from "bcrypt";

import { generateReferralCode } from "../src/shared/utils/referral.util.js";
import { create } from "../src/features/property/property.service.js";
import {
  createRoom,
  ensurePrices,
} from "../src/features/property/room/room.service.js";

const propertyImageList = [
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvAREB87iUaIPiQrQFjElsMZyP7AtyHYsZwqCultjARJMdx9SPObsw6XMIrkxy4RziMfqvefbdOYLLmFbq-CFR0CNhBXn5lZm3DRa-7rjiYz_s0R5c5_w_KLYnMdmg2pwKzuf8Rm-qCWL78KMF4_6R9YHK13j3i3Kx2HJPLjFW8J2hwwL3DewojeAwEfwldIk8246KJXfY--tWUoVoDpOMekNOMqoLFY09uiT5_BGDVF0hlHr8L8buidi0O-ipjoSmeKuuBOWMFipL",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ7GeYDTKx3Ujhkn2U9wMWHBesuXpt8uJKpkUNOw1icqcJi1tBs9GademUA9BLBQE3xeuE2NXk0fugQ_OtRiwMVzb6Ypts-QVavs8noRhUCSnDb_ajMjaM4TmbI6ezmTFUGRpZa6k9DvniyUl0qoNuzLDbhBi63KdD5m78Yq4PUTt8F1xmoAbRoEV0VU41_wnq5HtmATbafAFHQyhcoA_2BI12CBlOSvCnJLlSrjje3g6lq-EFHaMZfgXYb0L0PgCaf-fcq7k45bvf",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFhkJeSSDP9F7lzWJpj_IB7a8PhQG0cg95sZtfM6tk74OvZGGWNlqrqJTrEoT4EihEuEJeetk7vCVu_B05NMufVJ8q5ITFn2j5YrJFvqrzjeRyFxz9xTt0f5Fvc1uCe_uiD2TChuScrkn_6q2P9OHzyS8FocN9EazSaGLWv6FqYQEjtKOK1YDCr8q67JVfVb7jmsFn_2_8sf89S6dfv8mUm39fmWbgzx98uhWmMRf3DSTKiDpYjzUNyUxXFVcy2acbiHCA91JPhNzn",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHutSE0OjHRron2_P6tl-u9u6mGBOajrPBgwBt-SP0CgeDPf4NEFse7llZVdRcdrPsqN_ATMvlOrlj55ZHII9tCM1R8w_YG-O0yyA8OJqyDagyueCFWrd5whu3TcvxuHJjtfeQr0DN0dr1JxyNgFcNfhlwo7bBHP2j1EdA6lHKvJEfNr5Q-c8zDbTVIohFdzkrTvJNhOWQuFR0yuByRRCo-6uKZczQtjT-iPwZ-F1GiNPSqasuae9_gRVfFGBa8fRIcYVhBTcp_LRn",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzzL-FcjdXpJLH_mMxBLUXXJPlC8vDKm0nLPfx3ysaYxvESxqcjAMm3Qb_W21jeCBITn8POjoBtIoHQbp8Sphne290bn71kiTxI53wB_H3bGfk4PABV3EWCJZdy_TJl2kxkH8YdPq9n-8do-H8WzlmQUcrc4CbsTbevsn7tQv9t-VOJdF542l7fo1O3s-1ZCkmMkCtZn1P8hxNO2JiYuNzFJKlPIUV1kHkM6ZldNhDzxC9QlHaKfjvCHRpwoTl_CsbhVQnni8ofrQv",
  },
];

const roomImageList = [
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNFgtW4CWvDHWvY-nNMM_63NZrd6ZGDVqusBPOias7qisl3YWBXYFXG2qWBEewWgsZW8cwFksmyn3DjrAOH2bKXvgzxpqBl_aFWyCIWwiKGFSayktigbmSpMcUZcj-meqCQ5lHvN-I1gAW64SI3Tpbm8E72cTYk4szHXdxiXC3RIgy7dYlTwl7ORe6kChL4OvOTZc8ROjqKNM-HRB3YuWhqJaJR3P4oAKU_tcYWgzWUoiVE0yu85OAIqOBNjuTM9smgMQz12TklQnL",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB13Rf8Lpn9C4ffn9M2yMSzlkXrHa15KENVrM-19ay66RoKNwhrDsZ5v8_9x-rp8gLS_8Eo4fpzQEqmR4m7jetYC1hXcFVDPmhU0GukR0vqATtdKl4uLpKIBNb9MqC2oxowgGCu3MdDqF9QabxZHRAhHgJsBg8NDjyhPKenrn7DITfLUIZLeKuqrVR2mOfQ29lNM2G0qjVLHmlPn9pjvNaUxtuIbrgl2edzlR-WEfWyPZeOuqVsXyZt-OnrRXDK1F7l3P8S4V2QBRXy",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcDLLVQrOylPqeiPNIxfloWw2CfmGQh6znggU7ZhOnHfrozWoJUDmE8XRstCz2Ak4W0DqtBDYrrF7Jb02Byl6NEShBucIKlG_1NkjKhtj47M1EIlkZzyfbUMyw_CQ_JggrDtm7i3-bcksq9jgozScGFiWGWm7aMN8dJdPB_dpI0aW-KTsuJ_x43zCURyjqdmE6jxTb_7TCn1oaZw92vnBEoLJgvu7W_xVIP0I7ttjIhqQg3u3OeJQKHC1u559B6WUEVhzZXwvyvA2k",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyI4P2oFgSZJxNQLG4bea26CjfX-UgF9rcfHmRlHX3brzKeGYm9zTx62wtP04tRpATQVP6BPj15y6dj2fZtcAc6zW8F1FM2rNu-9b0Fw-xfhRu7MKfbVGGsrDRAOHD-USAQ9Z_y719i0PhhVm6fEfEoyP58LOx4noHzG-ToUMhDIGmWcKgZjSmAKIt_oH3xy5Y8l9Vg1N4R3w3j-_n_EEmR5wA-Qr5XBgbvNpBz6CvO3TzS-0SPfOxaIx28gBCcrMIPckXmXdgDGHy",
  },
];

const seed = async () => {
  try {
    console.info("Deleting all data...");

    await prisma.$transaction([
      prisma.payment.deleteMany(),
      prisma.review.deleteMany(),
      prisma.reservation.deleteMany(),
      prisma.pricingRule.deleteMany(),

      prisma.roomTypePrice.deleteMany(),
      prisma.priceOverride.deleteMany(),
      prisma.roomTypeAmenity.deleteMany(),
      prisma.roomTypeImage.deleteMany(),

      prisma.propertyAmenity.deleteMany(),
      prisma.propertyImage.deleteMany(),
      prisma.voucher.deleteMany(),

      prisma.roomType.deleteMany(),
      prisma.property.deleteMany(),

      prisma.amenity.deleteMany(),
      prisma.propertyCategory.deleteMany(),

      prisma.account.deleteMany(),
      prisma.refreshToken.deleteMany(),
      prisma.registerToken.deleteMany(),

      prisma.review.deleteMany(),

      prisma.point.deleteMany(),
      prisma.coupon.deleteMany(),

      prisma.user.deleteMany(),
    ]);

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
        description:
          "High-speed internet access that covers the entire property",
      },
      {
        id: "17a6619c-f6b5-469a-adf4-66196a67d187",
        name: "Parking",
        icon: "local_parking",
        type: AmenityType.PROPERTY,
        description: "Free parking available for all guests",
      },
      {
        id: "b1eac0c3-61c0-4f3f-b8fa-3a5c6b0e8b2c",
        name: "AC",
        icon: "ac_unit",
        type: AmenityType.PROPERTY,
        description: "Air conditioning available throughout the property",
      },
      {
        id: "e1f36b9c-8c6f-4c4f-b8b5-0c5c7e3f4b6d",
        name: "Kitchen",
        icon: "kitchen",
        type: AmenityType.PROPERTY,
        description: "Fully equipped kitchen that you can use",
      },
      {
        id: "b8c0d4f2-3f47-4f74-9c0d-9c2f0e4b1c11",
        name: "Gym",
        icon: "fitness_center",
        type: AmenityType.PROPERTY,
        description: "Gym available for all guests",
      },
      {
        id: "7a3e4b2d-6f5a-4a3d-9c8b-0d3f1e7b2a99",
        name: "Pool",
        icon: "pool",
        type: AmenityType.PROPERTY,
        description: "Pool available for all guests",
      },
      {
        id: "5c7a4b1e-3f9c-4a6d-8e7f-2c1a3b5d6e44",
        name: "Laundry",
        icon: "local_laundry_service",
        type: AmenityType.PROPERTY,
        description: "Laundry available for all guests",
      },
      {
        id: "2d6f3a4b-7e8c-4a9b-b1f2-5e3d6c7a8b12",
        name: "Security",
        icon: "security",
        type: AmenityType.PROPERTY,
        description: "Security available 24/7 throughout the property",
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
        description: "Air conditioning available in the room",
      },
      {
        id: "1c8a9d72-5b3f-4e6a-8f21-7d4c9b2a0e55",
        name: "Smart TV",
        icon: "tv",
        type: AmenityType.ROOM,
        description: "Smart TV available in the room",
      },
      {
        id: "7a2f1c9e-3d8b-4f6a-b5c2-9e1d7a3f4b68",
        name: "Balcony",
        icon: "balcony",
        type: AmenityType.ROOM,
        description: "Balcony with a view",
      },
      {
        id: "d4b9e2a1-6f3c-4a7d-8b25-1c9e0f2a6d73",
        name: "Workspace",
        icon: "computer",
        type: AmenityType.ROOM,
        description: "Workspace with a desk and chair",
      },
      {
        id: "3e7a1c5d-9b2f-4d6a-a8c1-5f3e9b7d2a10",
        name: "Minibar",
        icon: "coffee_maker",
        type: AmenityType.ROOM,
        description: "Minibar with a selection of drinks and snacks",
      },
      {
        id: "8c2d7a1f-4b6e-4f3a-9d25-6a1c7e2b9f44",
        name: "High Speed",
        icon: "wifi",
        type: AmenityType.ROOM,
        description: "High speed internet access in the room",
      },
      {
        id: "5b1e9d3a-7c4f-4a6d-b2c8-0f3a9e7d1c66",
        name: "In-room Safe",
        icon: "lock",
        type: AmenityType.ROOM,
        description: "In-room safe for storing valuables",
      },
      {
        id: "a9d3f7c1-2b6e-4a5d-8c21-7e4f1a9b3d88",
        name: "Mini Fridge",
        icon: "kitchen",
        type: AmenityType.ROOM,
        description: "Mini fridge with a selection of drinks and snacks",
      },
    ];

    await prisma.amenity.createMany({
      data: roomAmenities,
    });

    // const seedRoomAvailability = async () => {
    //   const roomTypes = await prisma.roomType.findMany();

    //   const today = new Date();
    //   const totalDays = 30;

    //   for (const room of roomTypes) {
    //     for (let i = 0; i < totalDays; i++) {
    //       const date = new Date();
    //       date.setDate(today.getDate() + i);
    //       date.setHours(0, 0, 0, 0);

    //       await prisma.roomTypePrice.upsert({
    //         where: {
    //           roomTypeId_date: {
    //             roomTypeId: room.id,
    //             date: date,
    //           },
    //         },
    //         update: {
    //           availableRooms: room.totalRooms,
    //         },
    //         create: {
    //           roomTypeId: room.id,
    //           date: date,
    //           availableRooms: room.totalRooms,
    //           price: room.basePrice,
    //         },
    //       });
    //     }
    //   }
    // };

    // await seedRoomAvailability();

    // =============================
    // PRICING RULES
    // =============================

    const pricingRules = [
      {
        id: "012e717a-2429-4757-945f-e24724bcd7ac",
        name: "Global Weekend",
        createdBy: "SYSTEM",

        scopeType: ScopeType.SYSTEM,

        startDate: "2026-01-01",
        endDate: "2026-12-31",

        dayOfWeek: [0, 6],

        adjustmentType: PriceAdjustmentType.PERCENTAGE,
        adjustmentDirection: PriceAdjustmentDirection.PLUS,
        adjustmentValue: 10,
      },
    ];

    await prisma.pricingRule.createMany({
      data: pricingRules,
    });

    // =============================
    // CREATE PROPERTY
    // =============================

    const property1 = await create({
      data: {
        categoryId: propertyCategories[0]!.id,
        name: "Property 1",
        description: "Description 1",
        latitude: -6.2088,
        longitude: 106.8456,
        numberOfBathrooms: 1,
        country: "Indonesia",
        city: "Jakarta",
        province: "DKI Jakarta",
        fullAddress: "Jl. Sudirman No. 1",
      },
      tenantId: users[1]!.id,
      images: [
        {
          imageUrl: propertyImageList[0]!.imageUrl,
          isCover: true,
          order: 1,
        },
        {
          imageUrl: propertyImageList[1]!.imageUrl,
          isCover: false,
          order: 2,
        },
        {
          imageUrl: propertyImageList[2]!.imageUrl,
          isCover: false,
          order: 3,
        },
        {
          imageUrl: propertyImageList[3]!.imageUrl,
          isCover: false,
          order: 4,
        },
        {
          imageUrl: propertyImageList[4]!.imageUrl,
          isCover: false,
          order: 5,
        },
      ],
      amenities: [
        propertyAmenities[0]!.id,
        propertyAmenities[1]!.id,
        propertyAmenities[2]!.id,
      ],
    });

    const property2 = await create({
      data: {
        categoryId: propertyCategories[1]!.id,
        name: "Property 2",
        description: "Description 2",
        latitude: -6.9175,
        longitude: 107.6191,
        numberOfBathrooms: 4,
        country: "Indonesia",
        city: "Bandung",
        province: "Jawa Barat",
        fullAddress: "Jl. Asia Afrika No. 1",
      },
      tenantId: users[1]!.id,
      images: [
        {
          imageUrl: propertyImageList[3]!.imageUrl,
          isCover: true,
          order: 1,
        },
        {
          imageUrl: propertyImageList[4]!.imageUrl,
          isCover: false,
          order: 2,
        },
        {
          imageUrl: propertyImageList[2]!.imageUrl,
          isCover: false,
          order: 3,
        },
        {
          imageUrl: propertyImageList[0]!.imageUrl,
          isCover: false,
          order: 4,
        },
        {
          imageUrl: propertyImageList[1]!.imageUrl,
          isCover: false,
          order: 5,
        },
      ],
      amenities: [
        propertyAmenities[3]!.id,
        propertyAmenities[4]!.id,
        propertyAmenities[5]!.id,
      ],
    });

    // =============================
    // CREATE ROOM
    // =============================

    const room1p1 = await createRoom({
      data: {
        propertyId: property1.id,
        name: "Room 1",
        description: "Description 1",
        basePrice: 100000,
        totalRooms: 10,
        bedType: BedType.DOUBLE_TWIN,
        bedCount: 1,
        viewType: ViewType.CITY_SKYLINE,
        bathroomType: BathroomType.PRIVATE,
        capacity: 2,
        isPublished: PublishStatus.PUBLISHED,
      },
      images: [
        {
          imageUrl: roomImageList[0]!.imageUrl,
          isCover: true,
          order: 1,
        },
        {
          imageUrl: roomImageList[1]!.imageUrl,
          isCover: false,
          order: 2,
        },
        {
          imageUrl: roomImageList[2]!.imageUrl,
          isCover: false,
          order: 3,
        },
      ],
      amenities: [
        roomAmenities[0]!.id,
        roomAmenities[1]!.id,
        roomAmenities[2]!.id,
      ],
    });

    const room2p1 = await createRoom({
      data: {
        propertyId: property1.id,
        name: "Room 2",
        description: "Description 2",
        basePrice: 200000,
        totalRooms: 10,
        bedType: BedType.DOUBLE_TWIN,
        bedCount: 1,
        viewType: ViewType.CITY_SKYLINE,
        bathroomType: BathroomType.PRIVATE,
        capacity: 2,
        isPublished: PublishStatus.PUBLISHED,
      },
      images: [
        {
          imageUrl: roomImageList[3]!.imageUrl,
          isCover: true,
          order: 1,
        },
        {
          imageUrl: roomImageList[1]!.imageUrl,
          isCover: false,
          order: 2,
        },
        {
          imageUrl: roomImageList[2]!.imageUrl,
          isCover: false,
          order: 3,
        },
      ],
      amenities: [
        roomAmenities[3]!.id,
        roomAmenities[4]!.id,
        roomAmenities[5]!.id,
      ],
    });

    await ensurePrices({ roomTypeId: room1p1.id, daysAhead: 30 });
    await ensurePrices({ roomTypeId: room2p1.id, daysAhead: 30 });

    const room1p2 = await createRoom({
      data: {
        propertyId: property2.id,
        name: "Room 1",
        description: "Description 1",
        basePrice: 150000,
        totalRooms: 4,
        bedType: BedType.KING_SIZE,
        bedCount: 1,
        viewType: ViewType.OCEAN_FRONT,
        bathroomType: BathroomType.PRIVATE,
        capacity: 2,
        isPublished: PublishStatus.PUBLISHED,
      },
      images: [
        {
          imageUrl: roomImageList[2]!.imageUrl,
          isCover: true,
          order: 1,
        },
        {
          imageUrl: roomImageList[1]!.imageUrl,
          isCover: false,
          order: 2,
        },
        {
          imageUrl: roomImageList[0]!.imageUrl,
          isCover: false,
          order: 3,
        },
      ],
      amenities: [
        roomAmenities[2]!.id,
        roomAmenities[1]!.id,
        roomAmenities[0]!.id,
      ],
    });

    const room2p2 = await createRoom({
      data: {
        propertyId: property2.id,
        name: "Room 2",
        description: "Description 2",
        basePrice: 200000,
        totalRooms: 4,
        bedType: BedType.QUEEN_SIZE,
        bedCount: 1,
        viewType: ViewType.POOL_SIDE,
        bathroomType: BathroomType.PRIVATE,
        capacity: 2,
        isPublished: PublishStatus.PUBLISHED,
      },
      images: [
        {
          imageUrl: roomImageList[1]!.imageUrl,
          isCover: true,
          order: 1,
        },
        {
          imageUrl: roomImageList[3]!.imageUrl,
          isCover: false,
          order: 2,
        },
        {
          imageUrl: roomImageList[2]!.imageUrl,
          isCover: false,
          order: 3,
        },
      ],
      amenities: [
        roomAmenities[6]!.id,
        roomAmenities[4]!.id,
        roomAmenities[5]!.id,
      ],
    });

    await ensurePrices({ roomTypeId: room1p2.id, daysAhead: 30 });
    await ensurePrices({ roomTypeId: room2p2.id, daysAhead: 30 });

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
