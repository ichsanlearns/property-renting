import api from "../../../api/client";
import type { ApiResponse } from "../../../shared/types/api-response";

import { PROFILE_ENDPOINTS } from "./profile.endpoint";
import type { UpdateProfileResponse } from "./profile.response";

type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profileImage?: File;
  role?: "CUSTOMER" | "TENANT";
};

export const updateMeRequest = async (data: UpdateProfilePayload) => {
  const response = await api.patch<ApiResponse<UpdateProfileResponse>>(
    PROFILE_ENDPOINTS.UPDATE_PROFILE,
    data,
  );

  return response.data;
};
