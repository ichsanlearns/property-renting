import { Router } from "express";
import { getTenantDashboardController } from "./dashboard.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.get("/tenant", authMiddleware, getTenantDashboardController);

export default router;
