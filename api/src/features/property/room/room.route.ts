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

export const getRoomRouter = router.get(
  "/:roomId",
  authMiddleware,
  RoomController.getRoomController,
);
