import { prisma } from "../../shared/lib/prisma.lib.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import { uploadToCloudinary } from "../../shared/services/upload.service.js";
import { ReservationStatus } from "../../generated/prisma/client.js";

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

    if (reservation.status !== ReservationStatus.WAITING_PAYMENT) {
      throw new AppError("Invalid reservation status", 400);
    }

    // upload ke cloudinary
    const uploadResult = await uploadToCloudinary(file.buffer);

    // update reservation (simple dulu tanpa table payment)
    const updated = await tx.reservation.update({
      where: { id: reservationId },
      data: {
        status: ReservationStatus.WAITING_CONFIRMATION,
        paymentProof: uploadResult,
      },
    });

    return updated;
  });
};

export const confirmPayment = async ({ reservationId, tenantId }: { reservationId: string; tenantId: string }) => {
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

    const updated = await tx.reservation.update({
      where: { id: reservationId },
      data: {
        status: ReservationStatus.PAID,
      },
    });

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

    const updated = await tx.reservation.update({
      where: { id: reservationId },
      data: {
        status: "WAITING_PAYMENT", // balik lagi
        rejectionReason: reason || "Payment rejected",
        paymentProof: null, // reset proof
      },
    });

    return updated;
  });
};
