import { Router } from "express";
import { getByTenantIdController } from "./pricing.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.get("/tenant/:tenantId", getByTenantIdController);

export default router;
