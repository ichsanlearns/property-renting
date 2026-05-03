import type { Request, Response } from "express";
import * as RoomService from "./room.service.js";
import { catchAsync } from "../../../shared/utils/catch-async.util.js";
import * as uploadService from "../../../shared/services/upload.service.js";

import * as RoomValidator from "./room.validator.js";
import type {
  BathroomType,
  BedType,
  PublishStatus,
  ViewType,
} from "../../../generated/prisma/enums.js";

export const createRoomController = catchAsync(
  async (req: Request, res: Response) => {
    const { propertyId } = req.params as { propertyId: string };

    const files = req.files as Express.Multer.File[];
    const imagesMeta = JSON.parse(req.body.imagesMeta);

    const parsed = RoomValidator.createSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid credentials",
        errors: parsed.error.issues,
      });
    }

    const data = {
      propertyId,
      name: parsed.data.name,
      basePrice: parsed.data.basePrice,
      totalRooms: parsed.data.totalRooms,
      bedType: parsed.data.bedType as BedType,
      bedCount: parsed.data.bedCount,
      viewType: parsed.data.viewType as ViewType,
      bathroomType: parsed.data.bathroomType as BathroomType,
      capacity: parsed.data.capacity,
      isPublished: parsed.data.isPublished as PublishStatus,
    };

    const uploadedImagesUrl = await Promise.all(
      files.map((file) =>
        uploadService.uploadToCloudinary(file.buffer, "roomImages"),
      ),
    );

    const images = uploadedImagesUrl.map((item, index) => {
      return {
        imageUrl: item.url,
        imagePublicId: item.publicId,
        isCover: imagesMeta[index].isCover,
        order: imagesMeta[index].order,
      };
    });

    const room = await RoomService.createRoom({
      data,
      images,
      amenities: parsed.data.amenities ?? [],
    });

    RoomService.ensurePrices({
      roomTypeId: room.id,
      daysAhead: 30,
    });

    res.status(201).json({
      message: "Room created successfully",
      data: {
        roomId: room.id,
        roomName: room.name,
        coverImage: images.find((image) => image.isCover)?.imageUrl,
      },
    });
  },
);

export const updateRoomController = catchAsync(
  async (req: Request, res: Response) => {
    const { roomId } = req.params as { roomId: string };
    const tenantId = req.user?.userId as string;

    const files = req.files as Express.Multer.File[];
    const imagesMeta = JSON.parse(req.body.imagesMeta);

    const parsed = RoomValidator.updateSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid credentials",
        errors: parsed.error.issues,
      });
    }

    const data = {
      name: parsed.data.name,
      basePrice: parsed.data.basePrice,
      totalRooms: parsed.data.totalRooms,
      bedType: parsed.data.bedType as BedType,
      bedCount: parsed.data.bedCount,
      viewType: parsed.data.viewType as ViewType,
      bathroomType: parsed.data.bathroomType as BathroomType,
      capacity: parsed.data.capacity,
      isPublished: parsed.data.isPublished as PublishStatus,
    };

    const uploadedImagesUrl = await Promise.all(
      files.map((file) =>
        uploadService.uploadToCloudinary(file.buffer, "roomImages"),
      ),
    );

    const images = uploadedImagesUrl.map((item, index) => {
      return {
        imageUrl: item.url,
        publicId: item.publicId,
        isCover: imagesMeta[index].isCover,
        order: imagesMeta[index].order,
      };
    });

    await RoomService.updateRoom({
      tenantId,
      roomId,
      data,
      images,
      amenities: parsed.data.amenities ?? [],
    });

    res.status(200).json({
      message: "Room updated successfully",
    });
  },
);

export const getRoomController = catchAsync(
  async (req: Request, res: Response) => {
    const { roomId } = req.params as { roomId: string };
    const tenantId = req.user?.userId as string;

    const room = await RoomService.getRoomById({ roomId, tenantId });

    res.status(200).json({
      message: "Room fetched successfully",
      data: room,
    });
  },
);
