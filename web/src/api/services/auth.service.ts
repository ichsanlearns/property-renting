import api from "../client";

import { API_ENDPOINTS } from "../endpoints";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginRequest = async (data: LoginPayload) => {
  return await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
};

export const refreshToken = async () => {
  return await api.post(API_ENDPOINTS.AUTH.REFRESH);
};
