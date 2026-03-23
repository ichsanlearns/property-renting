import type { Request, Response } from "express";

import { catchAsync } from "../../shared/utils/catch-async.util.js";
import { AppError } from "../../shared/utils/app-error.util.js";

import * as PropertyService from "./property.service.js";
import * as geocodingService from "./geocoding.service.js";

import * as uploadService from "../../shared/services/upload.service.js";

export const create = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Unauthorized", 401);

  const tenantId = req.user.userId;

  const files = req.files as Express.Multer.File[];
  const imagesMeta = JSON.parse(req.body.imagesMeta);

  const {
    categoryId,
    name,
    description,
    latitude,
    longitude,
    numberOfBathrooms,
    amenities,
  } = req.body;

  const data = {
    categoryId,
    name,
    description,
    latitude: Number(latitude),
    longitude: Number(longitude),
    numberOfBathrooms: Number(numberOfBathrooms),
  };

  const uploadedImagesUrl = await Promise.all(
    files.map((file) =>
      uploadService.uploadToCloudinary(file.buffer, "propertyImages"),
    ),
  );

  const images = uploadedImagesUrl.map((url, index) => {
    return {
      imageUrl: url,
      isCover: imagesMeta[index].isCover,
      order: imagesMeta[index].order,
    };
  });

  const location = await geocodingService.reverseGeocode({
    lat: data.latitude,
    long: data.longitude,
  });

  const property = await PropertyService.create({
    data: {
      ...data,
      country: location.country,
      city: location.city,
      province: location.province,
      fullAddress: location.fullAddress,
    },
    tenantId,
    images,
    amenities,
  });

  res.status(201).json({
    message: "Property created successfully",
    data: property,
  });
});

export const getByIdBasic = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const property = await PropertyService.getByIdBasic(id);

  res.status(200).json({
    message: "Property fetched successfully",
    data: property,
  });
});
