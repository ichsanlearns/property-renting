import { Router } from "express";
import * as authController from "./auth.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { uploadCloud } from "../../shared/middleware/upload.middleware.js";

const router = Router();

router.post("/login", authController.login);
router.post("/login/google", authController.loginWithGoogle);
router.post("/register", authController.register);
router.post("/resend-token", authController.resendToken);
router.post("/forgot-password", authController.resetPassword);
router.post("/verify-password-token", authController.verifyPasswordToken);
router.patch("/reset-password", authController.updateResetPassword);
router.patch("/update-password", authController.updatePassword);

router.patch(
  "/update-profile",
  authMiddleware,
  uploadCloud.single("profileImage"),
  authController.updateProfile,
);

router.post("/refresh", authController.authRefreshToken);
router.post("/logout", authController.logout);

export default router;
