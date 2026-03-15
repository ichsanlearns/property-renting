import { apiRefresh } from "../client";

import { API_ENDPOINTS } from "../endpoints";
import type { LoginPayload } from "../types/auth.type";

export const loginRequest = async (data: LoginPayload) => {
  const res = await apiRefresh.post(API_ENDPOINTS.AUTH.LOGIN, data);

  return res.data;
};

export const logoutRequest = async () => {
  const res = await apiRefresh.post(API_ENDPOINTS.AUTH.LOGOUT);

  return res.data;
};

export const refreshSession = async () => {
  const res = await apiRefresh.post(API_ENDPOINTS.AUTH.REFRESH);

  return res.data;
};
