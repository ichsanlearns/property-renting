import type { Request, Response } from "express";
import { getByTenantId } from "./pricing.service.js";

export const getByTenantIdController = async (req: Request, res: Response) => {
  const tenantId = req.user?.userId;

  if (!tenantId) {
    throw new Error("Tenant not found");
  }

  const pricingRules = await getByTenantId(tenantId);

  res.status(200).json({
    message: "Get pricing rules success",
    data: pricingRules,
  });
};
