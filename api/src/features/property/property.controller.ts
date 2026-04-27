import type { Request, Response } from "express";

import { catchAsync } from "../../shared/utils/catch-async.util.js";
import { AppError } from "../../shared/utils/app-error.util.js";

import * as PropertyService from "./property.service.js";
import * as geocodingService from "./geocoding.service.js";

import * as uploadService from "../../shared/services/upload.service.js";
import {
  getByIdBasicSchema,
  searchByParamsSchema,
  updateSchema,
} from "./property.validator.js";

export const create = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.userId;

  if (!tenantId) throw new AppError("Unauthorized", 401);

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

  const images = uploadedImagesUrl.map((item, index) => {
    return {
      imageUrl: item.url,
      publicId: item.publicId,
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

export const update = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.userId!;

  const { propertyId } = req.params as { propertyId: string };

  const files = req.files as Express.Multer.File[];
  const imagesMeta = JSON.parse(req.body.imagesMeta);

  const parsed = updateSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError("Invalid request body", 400);
  }

  const data = {
    name: parsed.data.name,
    description: parsed.data.description,
    latitude: Number(parsed.data.latitude),
    longitude: Number(parsed.data.longitude),
    numberOfBathrooms: Number(parsed.data.numberOfBathrooms),
  };

  let images: any[] = [];
  if (files.length > 0) {
    const uploadedImagesUrl = await Promise.all(
      files.map((file) =>
        uploadService.uploadToCloudinary(file.buffer, "propertyImages"),
      ),
    );

    images = uploadedImagesUrl.map((item, index) => {
      return {
        imageUrl: item.url,
        publicId: item.publicId,
        isCover: imagesMeta[index].isCover,
        order: imagesMeta[index].order,
      };
    });
  }

  const location = await geocodingService.reverseGeocode({
    lat: data.latitude,
    long: data.longitude,
  });

  const property = await PropertyService.update({
    propertyId,
    data: {
      ...data,
      country: location.country,
      city: location.city,
      province: location.province,
      fullAddress: location.fullAddress,
    },
    categoryId: parsed.data.categoryId,
    tenantId,
    ...(images.length > 0 && { images }),
    amenities: parsed.data.amenities ?? [],
  });

  res.status(200).json({
    message: "Property updated successfully",
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

export const getByPropertyIdFullInfo = catchAsync(
  async (req: Request, res: Response) => {
    const { propertyId } = req.params as { propertyId: string };

    const property = await PropertyService.getByPropertyIdFullInfo({
      propertyId,
    });

    res.status(200).json({
      message: "Property fetched successfully",
      data: property,
    });
  },
);

export const getByTenantId = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.userId;

  if (!tenantId) throw new AppError("Unauthorized", 401);

  const properties = await PropertyService.getByTenantId(tenantId);

  res.status(200).json({
    message: "Properties fetched successfully",
    data: properties,
  });
});

export const searchByParams = catchAsync(
  async (req: Request, res: Response) => {
    const parsed = searchByParamsSchema.safeParse(req.query);

    if (!parsed.success) {
      throw new AppError("Invalid search parameters", 400);
    }

    const { search, checkIn, checkOut, city, sortBy, order, page } =
      parsed.data;

    const finalSearch = typeof search === "string" ? search : undefined;
    const finalCheckIn = typeof checkIn === "string" ? checkIn : undefined;
    const finalCheckOut = typeof checkOut === "string" ? checkOut : undefined;
    const finalCity = typeof city === "string" ? city : undefined;
    const finalPage = typeof page === "number" ? page : undefined;

    const finalSortBy =
      sortBy === "name" || sortBy === "price" || sortBy === "createdAt"
        ? sortBy
        : "createdAt";

    const finalOrder = order === "asc" || order === "desc" ? order : "desc";

    const properties = await PropertyService.searchByParams({
      sortBy: finalSortBy,
      order: finalOrder,
      ...(finalCheckIn && { checkIn: finalCheckIn }),
      ...(finalCheckOut && { checkOut: finalCheckOut }),
      ...(finalSearch && { search: finalSearch }),
      ...(finalCity && { city: finalCity }),
      ...(finalPage && { page: finalPage }),
    });

    res.status(200).json({
      message: "Properties search fetched successfully",
      data: properties,
      pagination: {},
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

export const getCities = catchAsync(async (req: Request, res: Response) => {
  const cities = await PropertyService.getCities();

  res.status(200).json({
    message: "Cities fetched successfully",
    data: cities,
  });
});

export const deleteProperty = catchAsync(
  async (req: Request, res: Response) => {
    const tenantId = req.user?.userId!;
    const { propertyId } = req.params as { propertyId: string };

    await PropertyService.deleteProperty(propertyId, tenantId);

    res.status(200).json({
      message: "Property deleted successfully",
    });
  },
);
