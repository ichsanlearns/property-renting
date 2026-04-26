import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../shared/lib/queryKeys.lib";
import * as AuthService from "../api/auth.service";

export const usePasswordToken = ({ token }: { token: string }) => {
  return useQuery({
    queryKey: queryKeys.auth.token(token),
    queryFn: () => AuthService.verifyPasswordTokenRequest(token),
    select: (res) => res.data,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      if (status === 400 || status === 401) {
        return false;
      }
      return failureCount < 1;
    },
  });
};
