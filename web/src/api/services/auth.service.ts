import api from "../client";

import { API_ENDPOINTS } from "../endpoints";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginRequest = (data: LoginPayload) => {
  return api.post(API_ENDPOINTS.AUTH.LOGIN, data);
};
