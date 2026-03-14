import { Router } from "express";
import { createProperty } from "./property.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createProperty);

export default router;
