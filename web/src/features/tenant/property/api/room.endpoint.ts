export const ROOM_ENDPOINTS = {
  CREATE: "/properties/:propertyId/rooms",
  UPDATE: (roomId: string) => `/rooms/${roomId}`,
  GET_BY_ID: (roomId: string) => `/rooms/${roomId}`,
};
