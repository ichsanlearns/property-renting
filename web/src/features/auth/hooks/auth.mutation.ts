import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as AuthService from "../api/auth.service";

export const useVerifyEmailChange = () => {
  return useMutation({
    mutationFn: (token: string) => AuthService.verifyChangeEmailRequest(token),
    onMutate: () => {
      toast.loading("Verifying email...");
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
