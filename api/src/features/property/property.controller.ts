import type { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async.util.js";

import * as PropertyService from "./property.service.js";

export const createProperty = catchAsync(
  async (req: Request, res: Response) => {
    const tenant_id = req.user?.id;

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

    const payload = {
      tenant_id,
      category_id: categoryId,
      title,
      description,
      country,
      city,
      full_address: fullAddress,
      latitude,
      longitude,
      number_of_bathrooms: numberOfBathrooms,
    };

    await PropertyService.create(payload);

    res.status(201).json({
      status: "Property created successfully",
    });
  },
);
