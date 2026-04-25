import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";

import api from "../../../api/client";

export default function useReviewPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchReservation();
  }, []);

  const fetchReservation = async () => {
    try {
      const res = await api.get(`/reservations/${reservationId}`);
      setData(res.data.data);
    } catch (error) {
      toast.error("Failed to load reservation");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      return toast("Please select a rating first");
    }

    try {
      setSubmitting(true);

      await api.post("/reviews", {
        reservationId,
        rating,
        comment: review,
      });

      setSuccess(true);

      toast.success("Review submitted successfully!");

      setTimeout(() => {
        navigate("/mybooking");
      }, 2200);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => navigate("/mybooking");

  return {
    loading,
    data,
    success,
    submitting,

    rating,
    hoverRating,
    review,

    setRating,
    setHoverRating,
    setReview,

    handleSubmit,
    handleSkip,
  };
}
