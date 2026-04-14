import { Router } from "express";

import * as PropertyController from "./property.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { uploadCloud } from "../../shared/middleware/upload.middleware.js";

import { createRoomRouter } from "./room/room.route.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  uploadCloud.array("images", 5),
  PropertyController.create,
);

router.get("/", PropertyController.getAllBasic);
router.get("/search", PropertyController.searchByParams);
router.get("/:propertyId/basic", PropertyController.getByIdBasic);
router.get("/:propertyId", PropertyController.getById);
router.get(
  "/:propertyId/availability",
  PropertyController.getPropertyRoomPricesDate,
);

router.use("/:propertyId/rooms", createRoomRouter);

export default router;
