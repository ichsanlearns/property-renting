import { Router } from "express";
import { createReservationController } from "./reservation.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post("/reservations", authMiddleware, createReservationController);

export default router;
