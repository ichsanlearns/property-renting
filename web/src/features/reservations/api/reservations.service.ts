import api from "../../../api/client";
import type { ApiResponse } from "../../../shared/types/api-response";
import { RESERVATION_ENDPOINTS } from "./reservations.endpoint";
import type { CreateReservationResponse } from "./reservations.response";

type CreateReservationPayload = {
  roomTypeId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  totalAmount: number;
  roomNameSnapshot: string;
  propertyNameSnapshot: string;
  averageRoomPerNightSnapshot: number;
};

export const createReservationRequest = async (data: CreateReservationPayload) => {
  const response = await api.post<ApiResponse<CreateReservationResponse>>(RESERVATION_ENDPOINTS.CREATE_RESERVATION, data);

  return response.data;
};

export const getMyReservationsRequest = async () => {
  const response = await api.get<ApiResponse<any[]>>(RESERVATION_ENDPOINTS.GET_MY_RESERVATIONS);

  return response.data;
};
