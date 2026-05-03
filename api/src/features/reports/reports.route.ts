import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { getReportsDashboardController, getSalesReportController } from "./reports.controller.js";

const router = Router();

router.get("/dashboard", authMiddleware, getReportsDashboardController);
router.get("/sales", authMiddleware, getSalesReportController);

export default router;
