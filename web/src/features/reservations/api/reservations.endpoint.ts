export const RESERVATION_ENDPOINTS = {
  CREATE_RESERVATION: "/reservations",
  GET_MY_RESERVATIONS: "reservations/me",
  GET_RESERVATION_BY_CODE: (code: string) => `/reservations/code/${code}`,
};
