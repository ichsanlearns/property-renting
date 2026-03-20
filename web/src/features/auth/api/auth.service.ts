import api from "../../../api/client";

import { AUTH_ENDPOINTS } from "./auth.endpoint";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginRequest = async (data: LoginPayload) => {
  return await api.post(AUTH_ENDPOINTS.LOGIN, data);
};

export const logoutRequest = async () => {
  return await api.post(AUTH_ENDPOINTS.LOGOUT);
};

export const refreshSession = async () => {
  return await api.post(AUTH_ENDPOINTS.REFRESH);
};
