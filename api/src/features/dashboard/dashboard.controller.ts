import type { Request, Response } from "express";
import { getTenantDashboard } from "./dashboard.service.js";
import { AppError } from "../../shared/utils/app-error.util.js";

export const getTenantDashboardController = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const tenantId = req.user.userId;

  const data = await getTenantDashboard(tenantId);

  res.status(200).json({
    message: "Dashboard fetched successfully",
    data,
  });
};
