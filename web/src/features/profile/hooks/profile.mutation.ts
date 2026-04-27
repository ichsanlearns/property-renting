import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/stores/auth.store";
import * as ProfileApi from "../api/profile.service";
import { useNavigate } from "react-router";

export const useUpdateProfileImage = () => {
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: ProfileApi.updateProfilePhotoRequest,
    onSuccess: (res) => {
      setUser(res.data.user);
    },
  });
};

export const useDeleteProfilePhoto = () => {
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: ProfileApi.deleteProfilePhotoRequest,
    onSuccess: (res) => {
      setUser(res.data.user);
    },
  });
};

export const useUpdatePassword = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ProfileApi.updatePasswordRequest,
    onSuccess: () => {
      logout();
      navigate("/login");
    },
  });
};
