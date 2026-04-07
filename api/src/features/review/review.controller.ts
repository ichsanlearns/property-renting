import { catchAsync } from "../../shared/utils/catch-async.util.js";
import * as reviewService from "./review.service.js";
import { createReviewSchema } from "./review.validator.js";

export const createReviewController = catchAsync(async (req, res) => {
  const parsed = createReviewSchema.parse(req.body);

  const result = await reviewService.createReview({
    userId: req.user!.userId,
    reservationId: parsed.reservationId,
    rating: parsed.rating,
    comment: parsed.comment,
  });

  res.status(201).json({
    message: "Review Created Successfully",
    data: result,
  });
});

export const getPropertyReviewsController = catchAsync(async (req, res) => {
  const { propertyId } = req.params as { propertyId: string };

  const result = await reviewService.getPropertyReviews(propertyId);

  res.status(200).json({
    message: "Property Reviews Retrieved Successfully",
    data: result,
  });
});
