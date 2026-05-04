import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { getReportsDashboardController, getSalesReportController, getAvailabilityCalendarController } from "./reports.controller.js";

const router = Router();

router.get("/dashboard", authMiddleware, getReportsDashboardController);
router.get("/sales", authMiddleware, getSalesReportController);
router.get("/availability", authMiddleware, getAvailabilityCalendarController);

export default router;
