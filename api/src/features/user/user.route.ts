import { Router } from "express";

import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

import * as UserController from "./user.controller.js";

const router = Router();

router.patch("/me", authMiddleware, UserController.updateMe);

router.post("/pricing-rule", authMiddleware, UserController.createPricingRule);

export default router;
