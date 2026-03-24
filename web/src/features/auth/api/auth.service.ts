import { apiAuth } from "../../../api/client";

import { AUTH_ENDPOINTS } from "./auth.endpoint";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginRequest = async (data: LoginPayload) => {
  return await apiAuth.post(AUTH_ENDPOINTS.LOGIN, data);
};

export const logoutRequest = async () => {
  return await apiAuth.post(AUTH_ENDPOINTS.LOGOUT);
};

export const refreshSession = async () => {
  try {
    console.log("refreshing session");
    return await apiAuth.post(AUTH_ENDPOINTS.REFRESH);
  } catch (error: any) {
    if (!error.response) {
      console.log("refreshing session because no response");
      return await apiAuth.post(AUTH_ENDPOINTS.REFRESH);
    }
    throw error;
  }
};
