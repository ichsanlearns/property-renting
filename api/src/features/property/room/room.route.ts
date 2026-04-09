import { Router } from "express";
import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";
import { uploadCloud } from "../../../shared/middleware/upload.middleware.js";
import * as RoomController from "./room.controller.js";

const router = Router({ mergeParams: true });

export const createRoomRouter = router.post(
  "/",
  authMiddleware,
  uploadCloud.array("images", 3),
  RoomController.createRoomController,
);

router.get(
  "/:propertyId/availability",
  RoomController.getPropertyRoomPricesDate,
);

export default router;
