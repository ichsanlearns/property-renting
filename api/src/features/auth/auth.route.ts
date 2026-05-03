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

router.get("/verify-password-token", authController.verifyPasswordToken);
router.get("/verify-email-change", authController.verifyChangeEmail);

router.patch("/reset-password", authController.updateResetPassword);
router.patch("/update-password", authController.updatePassword);

router.patch(
  "/fill-profile",
  authMiddleware,
  uploadCloud.single("profileImage"),
  authController.fillProfile,
);

router.post("/refresh", authController.authRefreshToken);
router.post("/logout", authController.logout);

export default router;
