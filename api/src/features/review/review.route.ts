import { Router } from "express";
import { createReviewController } from "./review.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createReviewController);

export default router;
