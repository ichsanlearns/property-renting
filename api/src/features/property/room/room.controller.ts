import type { Request, Response } from "express";
import * as RoomService from "./room.service.js";
import { catchAsync } from "../../../shared/utils/catch-async.util.js";

export const createRoomController = catchAsync(
  async (req: Request, res: Response) => {
    const { propertyId } = req.params as { propertyId: string };

    const {
      name,
      description,
      basePrice,
      quantity,
      bedType,
      bedCount,
      viewType,
      bathroomType,
      capacity,
      isPublished,
    } = req.body;

    const room = await RoomService.createRoom({
      data: {
        propertyId,
        name,
        description,
        basePrice,
        quantity,
        bedType,
        bedCount,
        viewType,
        bathroomType,
        capacity,
        isPublished,
      },
    });
    res.status(201).json({ message: "Room created successfully", data: room });
  },
);
