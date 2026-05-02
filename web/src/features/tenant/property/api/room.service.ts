import api from "../../../../api/client";
import type { ApiResponse } from "../../../../shared/types/api-response";
import * as RoomResponse from "./room.response";
import { ROOM_ENDPOINTS } from "./room.endpoint";

export const createRoom = async ({
  propertyId,
  data,
}: {
  propertyId: string;
  data: FormData;
}) => {
  const endpoint = ROOM_ENDPOINTS.CREATE.replace(":propertyId", propertyId);

  const response = await api.post(endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateRoom = async ({
  roomId,
  data,
}: {
  roomId: string;
  data: FormData;
}) => {
  const endpoint = ROOM_ENDPOINTS.UPDATE(roomId);

  const response = await api.patch<ApiResponse<void>>(endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getRoomById = async ({ roomId }: { roomId: string }) => {
  const response = await api.get<ApiResponse<RoomResponse.GetRoomByIdResponse>>(
    ROOM_ENDPOINTS.GET_BY_ID(roomId),
  );
  return response.data;
};
