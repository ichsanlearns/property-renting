import api from "../../../../api/client";

export const replyReviewRequest = (reviewId: string, reply: string) => {
  return api.patch(`/reviews/${reviewId}/reply`, { reply });
};
