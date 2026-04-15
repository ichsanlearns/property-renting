import type { Request, Response } from "express";

import { catchAsync } from "../../shared/utils/catch-async.util.js";
import { AppError } from "../../shared/utils/app-error.util.js";

import * as PropertyService from "./property.service.js";
import * as geocodingService from "./geocoding.service.js";

import * as uploadService from "../../shared/services/upload.service.js";
import {
  getByIdBasicSchema,
  searchByParamsSchema,
} from "./property.validator.js";
import { transformRoomTypePrices } from "./property.transformer.js";

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

export const getAllBasic = catchAsync(async (req: Request, res: Response) => {
  const properties = await PropertyService.getAllBasic();

  res.status(200).json({
    message: "Properties fetched successfully",
    data: properties,
  });
});

export const getByIdBasic = catchAsync(async (req: Request, res: Response) => {
  const parsed = getByIdBasicSchema.safeParse(req.params);

  if (!parsed.success) {
    throw new AppError("Invalid property ID", 400);
  }

  const property = await PropertyService.getByIdBasic(parsed.data.propertyId);

  res.status(200).json({
    message: "Property fetched successfully",
    data: property,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const { propertyId } = req.params as { propertyId: string };

  const property = await PropertyService.getById({ id: propertyId });

  res.status(200).json({
    message: "Property fetched successfully",
    data: property,
  });
});

export const searchByParams = catchAsync(
  async (req: Request, res: Response) => {
    const parsed = searchByParamsSchema.safeParse(req.query);

    if (!parsed.success) {
      throw new AppError("Invalid search parameters", 400);
    }

    const { search, sortBy, order } = parsed.data;

    const finalSearch = typeof search === "string" ? search : undefined;

    const finalSortBy =
      sortBy === "name" || sortBy === "price" || sortBy === "createdAt"
        ? sortBy
        : "createdAt";

    const finalOrder = order === "asc" || order === "desc" ? order : "desc";

    const properties = await PropertyService.searchByParams({
      sortBy: finalSortBy,
      order: finalOrder,
      ...(finalSearch && { search: finalSearch }),
    });

    res.status(200).json({
      message: "Properties search fetched successfully",
      data: properties,
    });
  },
);

export const getPropertyRoomPricesDate = catchAsync(
  async (req: Request, res: Response) => {
    const { propertyId } = req.params as { propertyId: string };
    const { startDate, endDate } = req.query as {
      startDate: string;
      endDate: string;
    };

    const result = await PropertyService.getPropertyRoomPricesDate({
      propertyId,
      startDate,
      endDate,
    });

    res.status(200).json({
      message: "Property room prices by date fetched successfully",
      data: result,
    });
  },
);
