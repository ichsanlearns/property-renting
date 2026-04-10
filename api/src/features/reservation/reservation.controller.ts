import type { Request, Response } from "express";
import * as reservationService from "./reservation.service.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";
import { createReservationSchema } from "./reservation.validator.js";

export const createReservationController = catchAsync(
  async (req: Request, res: Response) => {
    const parsed = createReservationSchema.parse(req.body);

    const userId = req.user!.userId;

    const result = await reservationService.createReservation({
      userId,
      payload: parsed,
    });

    res.status(201).json({
      message: "Reservation created successfully",
      data: result,
    });
  },
);

export const getMyReservationsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await reservationService.getMyReservations(req.user!.userId);

    res.status(200).json({
      message: "Success get my reservations",
      data: result,
    });
  },
);

export const getTenantReservationsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await reservationService.getTenantReservations(
      req.user!.userId,
    );

    res.status(200).json({
      message: "Success get tenant reservations",
      data: result,
    });
  },
);
