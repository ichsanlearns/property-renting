import type { Request, Response } from "express";
import * as paymentService from "./payment.service.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";
import { uploadPaymentProofSchema } from "./payment.validator.js";

export const uploadPaymentProofController = catchAsync(async (req, res) => {
  const parsed = uploadPaymentProofSchema.parse(req.body);

  if (!req.file) {
    throw new Error("File is required");
  }

  const result = await paymentService.uploadPaymentProof({
    userId: req.user!.userId,
    reservationId: parsed.reservationId,
    file: req.file,
  });

  res.status(200).json({
    message: "Payment proof uploaded successfully",
    data: result,
  });
});

export const confirmPaymentController = catchAsync(async (req, res) => {
  const { reservationId } = req.body;

  const result = await paymentService.confirmPayment({
    reservationId,
    tenantId: req.user!.userId,
  });

  res.status(200).json({
    message: "Payment confirmed successfully",
    data: result,
  });
});

export const rejectPaymentController = catchAsync(async (req, res) => {
  const { reservationId, reason } = req.body;

  const result = await paymentService.rejectPayment({
    reservationId,
    tenantId: req.user!.userId,
    reason,
  });

  res.status(200).json({
    message: "Payment rejected",
    data: result,
  });
});

export const midtransWebhookController = catchAsync(async (req, res) => {
  await paymentService.handleMidtransNotification(req.body);

  res.status(200).json({
    message: "Webhook received",
  });
});
