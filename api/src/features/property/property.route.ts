import { Router } from "express";

import * as PropertyController from "./property.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { uploadCloud } from "../../shared/middleware/upload.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  uploadCloud.array("images", 5),
  PropertyController.create,
);

export default router;
