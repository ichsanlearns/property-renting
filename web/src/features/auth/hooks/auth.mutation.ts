import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as AuthService from "../api/auth.service";
import { useAuthStore } from "../stores/auth.store";

export const useVerifyEmailChange = () => {
  const setUserPartial = useAuthStore((state) => state.setUserPartial);
  return useMutation({
    mutationFn: (token: string) => AuthService.verifyChangeEmailRequest(token),
    onMutate: () => {
      toast.loading("Verifying email...");
    },
    onSuccess: (res) => {
      toast.dismiss();
      toast.success(res.message);
      setUserPartial({ email: res.data.email });
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
