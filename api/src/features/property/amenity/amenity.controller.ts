import type { Request, Response } from "express";

import { catchAsync } from "../../../shared/utils/catch-async.util.js";

import type { AmenityType } from "../../../generated/prisma/enums.js";
import * as AmenityService from "./amenity.service.js";

export const getAllController = catchAsync(
  async (req: Request, res: Response) => {
    const type = req.query.type as AmenityType;

    const amenities = await AmenityService.getAll(type);

    res.status(200).json({
      message: "Amenities fetched successfully",
      data: amenities,
    });
  },
);
