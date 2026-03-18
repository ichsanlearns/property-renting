import type { Request, Response } from "express";

import { catchAsync } from "../../shared/utils/catch-async.util.js";
import { AppError } from "../../shared/utils/app-error.util.js";

import * as PropertyService from "./property.service.js";

export const create = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError(401, "Unauthorized");
  const tenantId = req.user.id;

  const {
    categoryId,
    title,
    description,
    country,
    city,
    fullAddress,
    latitude,
    longitude,
    numberOfBathrooms,
  } = req.body;

  console.log(req.body);
  return;

  const property = await PropertyService.create({
    data: {
      tenantId,
      categoryId,
      title,
      description,
      country,
      city,
      fullAddress,
      latitude,
      longitude,
      numberOfBathrooms,
    },
  });

  res.status(201).json({
    message: "Property created successfully",
    data: property,
  });
});
