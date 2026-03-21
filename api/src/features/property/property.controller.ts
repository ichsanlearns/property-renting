import type { Request, Response } from "express";

import { catchAsync } from "../../shared/utils/catch-async.util.js";
import { AppError } from "../../shared/utils/app-error.util.js";

import * as PropertyService from "./property.service.js";
import * as geocodingService from "./geocoding.service.js";

export const create = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError(401, "Unauthorized");
  const tenantId = req.user.userId;

  const {
    categoryId,
    title,
    description,
    latitude,
    longitude,
    numberOfBathrooms,
  } = req.body;

  const location = await geocodingService.reverseGeocode({
    lat: latitude,
    long: longitude,
  });

  const property = await PropertyService.create({
    data: {
      categoryId,
      title,
      description,
      country: location.country,
      city: location.city,
      province: location.province,
      fullAddress: location.fullAddress,
      latitude,
      longitude,
      numberOfBathrooms,
    },
    tenantId,
  });

  res.status(201).json({
    message: "Property created successfully",
    data: property,
  });
});
