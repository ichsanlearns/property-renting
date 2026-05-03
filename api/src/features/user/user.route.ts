import { Router } from "express";

import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

import * as UserController from "./user.controller.js";
import { uploadCloud } from "../../shared/middleware/upload.middleware.js";

const router = Router();

router.patch("/me", authMiddleware, UserController.updateMe);

router.patch(
  "/me/profile-image",
  authMiddleware,
  uploadCloud.single("profileImage"),
  UserController.updateProfilePhoto,
);
router.delete(
  "/me/profile-image",
  authMiddleware,
  UserController.deleteProfilePhoto,
);

router.patch("/me/password", authMiddleware, UserController.updatePassword);

router.patch("/me/email", authMiddleware, UserController.changeEmail);

router.post("/pricing-rule", authMiddleware, UserController.createPricingRule);

export default router;
