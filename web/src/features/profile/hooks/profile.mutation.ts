import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/stores/auth.store";
import * as ProfileApi from "../api/profile.service";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const useUpdateProfileImage = () => {
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: ProfileApi.updateProfilePhotoRequest,
    onSuccess: (res) => {
      setUser(res.data.user);
    },
  });
};

export const useChangeEmail = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      ProfileApi.changeEmailRequest({ email, password }),
    onMutate: () => {
      toast.loading("Changing email...");
    },
    onSuccess: (res) => {
      toast.dismiss();
      toast.success(res.message);
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error(error.response?.data?.message || error.message);
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
