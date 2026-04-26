import type { Request, Response } from "express";
import * as RoomService from "./room.service.js";
import { catchAsync } from "../../../shared/utils/catch-async.util.js";
import * as uploadService from "../../../shared/services/upload.service.js";

export const createRoomController = catchAsync(
  async (req: Request, res: Response) => {
    const { propertyId } = req.params as { propertyId: string };

    const files = req.files as Express.Multer.File[];
    const imagesMeta = JSON.parse(req.body.imagesMeta);

    const {
      name,
      basePrice,
      totalRooms,
      bedType,
      bedCount,
      viewType,
      bathroomType,
      capacity,
      isPublished,
      amenities,
    } = req.body;

    const data = {
      propertyId,
      name,
      basePrice: Number(basePrice),
      totalRooms: Number(totalRooms),
      bedType: bedType.toUpperCase(),
      bedCount: Number(bedCount),
      viewType: viewType.toUpperCase(),
      bathroomType: bathroomType.toUpperCase(),
      capacity: Number(capacity),
      isPublished: isPublished.toUpperCase(),
    };

    const uploadedImagesUrl = await Promise.all(
      files.map((file) =>
        uploadService.uploadToCloudinary(file.buffer, "roomImages"),
      ),
    );

    const images = uploadedImagesUrl.map((url, index) => {
      return {
        imageUrl: url,
        isCover: imagesMeta[index].isCover,
        order: imagesMeta[index].order,
      };
    });

    const room = await RoomService.createRoom({
      data,
      images,
      amenities,
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
