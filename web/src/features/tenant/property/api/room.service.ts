import api from "../../../../api/client";
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
