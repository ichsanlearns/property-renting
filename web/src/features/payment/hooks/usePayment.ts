import { useEffect, useState } from "react";
import api from "../../../api/client";

export function usePayment(reservationCode?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReservation = async () => {
    try {
      const res = await api.get(`/reservations/code/${reservationCode}`);
      setData(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reservationCode) fetchReservation();
  }, [reservationCode]);

  return {
    data,
    loading,
    refetch: fetchReservation,
  };
}
