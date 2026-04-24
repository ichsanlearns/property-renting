import { Router } from "express";
import { createReservationController, getMyReservationsController, getTenantReservationsController, getReservationByCodeController, getReservationByIdController } from "./reservation.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createReservationController);
router.get("/me", authMiddleware, getMyReservationsController);
router.get("/tenant", authMiddleware, getTenantReservationsController);
router.get("/code/:reservationCode", authMiddleware, getReservationByCodeController);
router.get("/:id", authMiddleware, getReservationByIdController);
export default router;
