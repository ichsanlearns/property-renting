import { prisma } from "../../shared/lib/prisma.lib.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import { uploadToCloudinary } from "../../shared/services/upload.service.js";
import { ReservationStatus } from "../../generated/prisma/client.js";
import { createSnapTransaction } from "./midtrans.service.js";
import { sendBookingConfirmedEmail } from "../../shared/services/reminder-email.service.js";
import crypto from "crypto";

export const uploadPaymentProof = async ({ userId, reservationId, file }: { userId: string; reservationId: string; file: Express.Multer.File }) => {
  return await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new AppError("Reservation not found", 404);
    }

    if (reservation.customerId !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    if (reservation.status !== ReservationStatus.WAITING_PAYMENT && reservation.status !== ReservationStatus.REJECTED) {
      throw new AppError("Invalid reservation status", 400);
    }

    const uploadResult = await uploadToCloudinary(file.buffer);

    const updated = await tx.reservation.update({
      where: { id: reservationId },
      data: {
        status: ReservationStatus.WAITING_CONFIRMATION,
        paymentProof: uploadResult.url,
      },
    });

    return updated;
  });
};

const sendPaidReservationEmail = async (reservation: any) => {
  await sendBookingConfirmedEmail({
    to: reservation.customer.email,
    name: reservation.customer.firstName || "Guest",
    property: reservation.propertyNameSnapshot,
    checkIn: reservation.checkInDate,
    checkOut: reservation.checkOutDate,
  });
};

export const confirmPayment = async ({ reservationId, tenantId }: { reservationId: string; tenantId: string }) => {
  return await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({
      where: { id: reservationId },
      include: {
        customer: true,
        roomType: {
          include: {
            property: true,
          },
        },
      },
    });

    if (!reservation) {
      throw new AppError("Reservation not found", 404);
    }

    if (reservation.roomType.property.tenantId !== tenantId) {
      throw new AppError("Unauthorized", 403);
    }

    if (reservation.status !== ReservationStatus.WAITING_CONFIRMATION) {
      throw new AppError("Invalid reservation status", 400);
    }

    const updated = await tx.reservation.update({
      where: { id: reservationId },
      data: {
        status: ReservationStatus.PAID,
      },
    });

    await sendPaidReservationEmail(reservation);

    return updated;
  });
};

export const rejectPayment = async ({ reservationId, tenantId, reason }: { reservationId: string; tenantId: string; reason?: string }) => {
  return await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({
      where: { id: reservationId },
      include: {
        roomType: {
          include: {
            property: true,
          },
        },
      },
    });

    if (!reservation) {
      throw new AppError("Reservation not found", 404);
    }

    if (reservation.roomType.property.tenantId !== tenantId) {
      throw new AppError("Unauthorized", 403);
    }

    if (reservation.status !== ReservationStatus.WAITING_CONFIRMATION) {
      throw new AppError("Invalid reservation status", 400);
    }

    return await tx.reservation.update({
      where: { id: reservationId },
      data: {
        status: ReservationStatus.REJECTED,
        rejectionReason: reason || "Payment rejected",
        paymentProof: null,
      },
    });
  });
};

export const createMidtransTransaction = async (reservationId: string) => {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: {
      customer: true,
    },
  });

  if (!reservation) {
    throw new AppError("Reservation not found", 404);
  }
  const snapToken = await createSnapTransaction(reservation);

  return snapToken;
};

export const handleMidtransNotification = async (payload: any) => {
  const { order_id, transaction_status, gross_amount, signature_key } = payload;

  const hash = crypto
    .createHash("sha512")
    .update(order_id + payload.status_code + gross_amount + process.env.MIDTRANS_SERVER_KEY)
    .digest("hex");

  if (hash !== signature_key) {
    throw new AppError("Invalid signature", 403);
  }

  const reservationCode = order_id.split("-").slice(0, 3).join("-");

  const reservation = await prisma.reservation.findUnique({
    where: { reservationCode },
    include: {
      customer: true,
      roomType: {
        include: {
          property: true,
        },
      },
    },
  });

  if (!reservation) {
    throw new AppError("Reservation not found", 404);
  }

  if (transaction_status === "settlement" || (transaction_status === "capture" && payload.fraud_status === "accept")) {
    await prisma.reservation.update({
      where: { reservationCode },
      data: { status: ReservationStatus.PAID },
    });

    await sendPaidReservationEmail(reservation);
  }

  if (["expire", "cancel", "deny"].includes(transaction_status)) {
    await prisma.reservation.update({
      where: { reservationCode },
      data: { status: ReservationStatus.CANCELED },
    });
  }

  return true;
};
