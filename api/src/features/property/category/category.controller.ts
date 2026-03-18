import type { Request, Response } from "express";

import { catchAsync } from "../../../shared/utils/catch-async.util.js";

import * as CategoryService from "./category.service.js";

export const getAllCategory = catchAsync(
  async (req: Request, res: Response) => {
    const categories = await CategoryService.getAll();

    return res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  },
);
