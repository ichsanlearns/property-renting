import { useQuery } from "@tanstack/react-query";
import { getReservationByCodeRequest } from "../api/reservations.service";

export const useReservationDetail = (reservationCode: string) => {
  return useQuery({
    queryKey: ["reservation", reservationCode],
    queryFn: async () => {
      const res = await getReservationByCodeRequest(reservationCode);
      return res.data;
    },
    enabled: !!reservationCode,
  });
};
