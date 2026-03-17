import type { Request, Response } from "express";

import { catchAsync } from "../../shared/utils/catch-async.util.js";
import { AppError } from "../../shared/utils/app-error.util.js";

import * as PropertyService from "./property.service.js";

export const create = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError(401, "Unauthorized");
  const tenant_id = req.user.id;

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

  const mapped = {
    category_id: categoryId,
    full_address: fullAddress,
    number_of_bathrooms: numberOfBathrooms,
  };

  const property = await PropertyService.create({
    tenant_id,
    category_id: mapped.category_id,
    title,
    description,
    country,
    city,
    full_address: mapped.full_address,
    latitude,
    longitude,
    number_of_bathrooms: mapped.number_of_bathrooms,
  });

  res.status(201).json({
    message: "Property created successfully",
    data: property,
  });
});
