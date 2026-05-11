import { Router } from "express";
import { createReviewController, getPropertyReviewsController, replyReviewController, getLatestReviewsController } from "./review.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createReviewController);
router.get("/", getLatestReviewsController);
router.patch("/:reviewId/reply", authMiddleware, replyReviewController);
router.get("/property/:propertyId", getPropertyReviewsController);

export default router;
