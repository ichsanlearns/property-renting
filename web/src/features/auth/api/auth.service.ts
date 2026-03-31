import api, { apiAuth } from "../../../api/client";

import { AUTH_ENDPOINTS } from "./auth.endpoint";

import type { ApiResponse } from "../../../shared/types/api-response";
import type {
  LoginResponse,
  RefreshSessionResponse,
  ResendTokenResponse,
  UpdateProfileResponse,
} from "./auth.response";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
};

type UpdatePasswordPayload = {
  password: string;
  token: string;
};

type UpdateProfilePayload = {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profileImage?: File;
  role: "CUSTOMER" | "TENANT";
};

type GoogleLoginPayload = {
  token: string;
};

export const loginRequest = async (data: LoginPayload) => {
  const response = await apiAuth.post<ApiResponse<LoginResponse>>(
    AUTH_ENDPOINTS.LOGIN,
    data,
  );

  return response.data;
};

export const googleLoginRequest = async (data: GoogleLoginPayload) => {
  const response = await apiAuth.post<ApiResponse<LoginResponse>>(
    AUTH_ENDPOINTS.GOOGLE_LOGIN,
    data,
  );

  return response.data;
};

export const registerRequest = async (data: RegisterPayload) => {
  const response = await apiAuth.post<ApiResponse<void>>(
    AUTH_ENDPOINTS.REGISTER,
    data,
  );

  return response.data;
};

export const resendTokenRequest = async (data: RegisterPayload) => {
  const response = await apiAuth.post<ApiResponse<ResendTokenResponse>>(
    AUTH_ENDPOINTS.RESEND_TOKEN,
    data,
  );

  return response.data;
};

export const updatePasswordRequest = async (data: UpdatePasswordPayload) => {
  const response = await apiAuth.patch<ApiResponse<LoginResponse>>(
    AUTH_ENDPOINTS.UPDATE_PASSWORD,
    data,
  );

  return response.data;
};

export const updateProfileRequest = async (data: UpdateProfilePayload) => {
  const response = await api.patch<ApiResponse<UpdateProfileResponse>>(
    AUTH_ENDPOINTS.UPDATE_PROFILE,
    data,
  );

  return response.data;
};

export const logoutRequest = async () => {
  const response = await apiAuth.post<ApiResponse<void>>(AUTH_ENDPOINTS.LOGOUT);

  return response.data;
};

export const refreshSession = async () => {
  try {
    console.log("refreshing basic session");
    const response = await apiAuth.post<ApiResponse<RefreshSessionResponse>>(
      AUTH_ENDPOINTS.REFRESH,
    );
    console.log("refreshing basic session success");

    return response.data;
  } catch (error: any) {
    if (!error.response) {
      console.log("refreshing session because no response");
      const response = await apiAuth.post<ApiResponse<RefreshSessionResponse>>(
        AUTH_ENDPOINTS.REFRESH,
      );
      console.log("refreshing session because no response success");

      return response.data;
    }
    throw error;
  }
};
