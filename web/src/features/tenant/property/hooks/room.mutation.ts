import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as RoomApi from "../api/room.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { queryKeys } from "../../../../shared/lib/queryKeys.lib";

export const useUpdateRoom = (roomId: string, propertyId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => RoomApi.updateRoom({ roomId, data }),

    onMutate: () => {
      return toast.loading("Updating room...");
    },

    onSuccess: (res, _, toastId) => {
      toast.dismiss(toastId);
      toast.success(res.message || "Room updated successfully!");

      queryClient.invalidateQueries();

      navigate(`/tenant/properties`);
    },
    onError: (error: any, _, toastId) => {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Failed to update room");
    },
  });
};
