import { prisma } from "../../shared/lib/prisma.lib.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import { ReservationStatus } from "../../generated/prisma/enums.js";

export const createReview = async ({ userId, reservationId, rating, comment }: { userId: string; reservationId: string; rating: number; comment: string }) => {
  return await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({
      where: { id: reservationId },
      include: {
        roomType: true,
      },
    });

    if (!reservation) {
      throw new AppError("Reservation not found", 404);
    }

    if (reservation.customerId !== userId) {
      throw new AppError("Unauthorized to review this reservation", 403);
    }

    if (reservation.status !== ReservationStatus.PAID) {
      throw new AppError("You can only review paid reservations", 400);
    }

    const existingReview = await tx.review.findUnique({
      where: { reservationId },
    });

    if (existingReview) {
      throw new AppError("You have already reviewed this reservation", 400);
    }

    const review = await tx.review.create({
      data: {
        reservationId,
        customerId: userId,
        propertyId: reservation.roomType.propertyId,
        rating,
        comment,
      },
    });

    const reviews = await tx.review.findMany({
      where: { propertyId: reservation.roomType.propertyId },
    });

    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    const roundedAvg = Number(avg.toFixed(1));

    await tx.property.update({
      where: { id: reservation.roomType.propertyId },
      data: {
        averageRating: roundedAvg,
        reviewCount: reviews.length,
      },
    });

    await tx.reservation.update({
      where: { id: reservationId },
      data: {
        status: ReservationStatus.REVIEWED,
      },
    });

    return review;
  });
};

export const getPropertyReviews = async (propertyId: string) => {
  const reviews = await prisma.review.findMany({
    where: { propertyId },
    include: {
      customer: {
        select: {
          id: true,
          firstName: true,
          profileImage: true,
        },
      },
    },
  });

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return {
    averageRating,
    totalReviews: reviews.length,
    reviews,
  };
};
