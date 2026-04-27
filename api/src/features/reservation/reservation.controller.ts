import type { Request, Response } from "express";
import * as reservationService from "./reservation.service.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";
import { createReservationSchema } from "./reservation.validator.js";

export const createReservationController = catchAsync(async (req: Request, res: Response) => {
  const parsed = createReservationSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: parsed.error.issues,
    });
  }

  const userId = req.user!.userId;

  const result = await reservationService.createReservation({
    userId,
    payload: parsed.data,
  });

  res.status(201).json({
    message: "Reservation created successfully",
    data: result,
  });
});

export const getMyReservationsController = catchAsync(async (req: Request, res: Response) => {
  const result = await reservationService.getMyReservations(req.user!.userId);

  res.status(200).json({
    message: "Success get my reservations",
    data: result,
  });
});

export const getTenantReservationsController = catchAsync(async (req: Request, res: Response) => {
  const result = await reservationService.getTenantReservations(req.user!.userId);

  res.status(200).json({
    message: "Success get tenant reservations",
    data: result,
  });
});

export const getReservationByCodeController = catchAsync(async (req: Request, res: Response) => {
  const { reservationCode } = req.params;

  if (typeof reservationCode !== "string") {
    return res.status(400).json({
      message: "Invalid reservation code",
    });
  }

  const result = await reservationService.getReservationByCode({
    reservationCode,
    userId: req.user!.userId,
  });

  res.status(200).json({
    message: "Success get reservation",
    data: result,
  });
});

export const getReservationByIdController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({
      message: "Invalid reservation id",
    });
  }

  const result = await reservationService.getReservationById({
    id,
    userId: req.user!.userId,
  });

  res.status(200).json({
    message: "Success get reservation",
    data: result,
  });
});

export const cancelReservationController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({
      message: "Invalid reservation id",
    });
  }

  const result = await reservationService.cancelReservation({
    reservationId: id,
    userId: req.user!.userId,
  });

  res.status(200).json({
    message: "Reservation canceled successfully",
    data: result,
  });
});
