import { Router } from "express";

import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

import * as UserController from "./user.controller.js";

const router = Router();

router.patch("/me", authMiddleware, UserController.updateMe);

export default router;
