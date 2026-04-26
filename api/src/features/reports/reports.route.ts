import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { getReportsDashboardController } from "./reports.controller.js";

const router = Router();

router.get("/dashboard", authMiddleware, getReportsDashboardController);

export default router;
