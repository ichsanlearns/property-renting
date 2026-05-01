export const ROOM_ENDPOINTS = {
  CREATE: "/properties/:propertyId/rooms",
  GET_BY_ID: (roomId: string) => `/rooms/${roomId}`,
};
