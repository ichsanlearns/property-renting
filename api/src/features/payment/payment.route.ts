import { Router } from "express";
import { confirmPaymentController, midtransWebhookController, rejectPaymentController, uploadPaymentProofController } from "./payment.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { uploadCloud } from "../../shared/middleware/upload.middleware.js";

const router = Router();

router.post("/upload-proof", authMiddleware, uploadCloud.single("file"), uploadPaymentProofController);
router.patch("/confirm", authMiddleware, confirmPaymentController);
router.patch("/reject", authMiddleware, rejectPaymentController);
router.post("/midtrans/webhook", midtransWebhookController);

export default router;
