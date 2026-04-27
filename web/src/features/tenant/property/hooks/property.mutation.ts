import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as PropertyApi from "../api/property.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../../shared/lib/queryKeys.lib";

export const useUpdateProperty = (propertyId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) =>
      PropertyApi.updateProperty(data, propertyId),

    onMutate: () => {
      return toast.loading("Updating property...");
    },

    onSuccess: (res, _, toastId) => {
      toast.dismiss(toastId);
      toast.success(res.message || "Property updated successfully!");

      queryClient.invalidateQueries({
        queryKey: queryKeys.property.byTenantId(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.property.basic(propertyId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.property.detail(propertyId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.property.detailFullInfo(propertyId),
      });

      navigate("/tenant/properties");
    },

    onError: (error: any, _, toastId) => {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Failed to update property");
    },
  });
};
