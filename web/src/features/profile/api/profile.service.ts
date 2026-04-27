import api from "../../../api/client";
import type { ApiResponse } from "../../../shared/types/api-response";

import { PROFILE_ENDPOINTS } from "./profile.endpoint";
import type { FillProfileResponse } from "./profile.response";

type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profileImage?: File;
  role?: "CUSTOMER" | "TENANT";
};

export const updateMeRequest = async (data: UpdateProfilePayload) => {
  const response = await api.patch<ApiResponse<FillProfileResponse>>(
    PROFILE_ENDPOINTS.UPDATE_PROFILE,
    data,
  );

  return response.data;
};

export const updateProfilePhotoRequest = async (data: FormData) => {
  const response = await api.patch<ApiResponse<FillProfileResponse>>(
    PROFILE_ENDPOINTS.UPDATE_PROFILE_PHOTO,
    data,
  );

  return response.data;
};

export const deleteProfilePhotoRequest = async () => {
  const response = await api.delete<ApiResponse<FillProfileResponse>>(
    PROFILE_ENDPOINTS.DELETE_PROFILE_PHOTO,
  );

  return response.data;
};
