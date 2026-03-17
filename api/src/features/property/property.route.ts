import { Router } from "express";

import * as PropertyController from "./property.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, PropertyController.create);

export default router;
