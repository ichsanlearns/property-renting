import type { Request, Response } from "express";
import * as paymentService from "./payment.service.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";

export const uploadPaymentProofController = catchAsync(async (req: Request, res: Response) => {
  const reservationId = req.body.reservationId;

  if (!req.file) {
    throw new Error("File is required");
  }

  const result = await paymentService.uploadPaymentProof({
    userId: req.user!.userId,
    reservationId,
    file: req.file,
  });

  res.status(200).json({
    message: "Payment proof uploaded successfully",
    data: result,
  });
});
