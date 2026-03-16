import type { Request, Response } from "express";
import * as reservationService from "./reservation.service.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";
import { createReservationSchema } from "./reservation.validator.js";

export const createReservationController = catchAsync(async (req: Request, res: Response) => {
  const parsed = createReservationSchema.parse(req.body);

  const result = await reservationService.createReservation({
    userId: req.user!.userId,
    payload: parsed,
  });
  res.status(201).json({
    message: "Reservation created successfully",
    data: result,
  });
});
