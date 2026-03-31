import { Router } from "express";
import { uploadPaymentProofController } from "./payment.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { uploadCloud } from "../../shared/middleware/upload.middleware.js";

const router = Router();

router.post("/upload-proof", authMiddleware, uploadCloud.single("file"), uploadPaymentProofController);

export default router;
