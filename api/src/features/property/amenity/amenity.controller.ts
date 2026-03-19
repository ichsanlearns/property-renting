import type { Request, Response } from "express";

import { catchAsync } from "../../../shared/utils/catch-async.util.js";

import * as AmenityService from "./amenity.service.js";

export const getAllController = catchAsync(
  async (req: Request, res: Response) => {
    const amenities = await AmenityService.getAll();

    res.status(200).json({
      message: "Amenities fetched successfully",
      data: amenities,
    });
  },
);
