import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/lib/queryKeys.lib";
import * as RoomService from "../api/room.service";

export const useRoom = ({ roomId }: { roomId: string }) => {
  return useQuery({
    queryKey: queryKeys.room.getById(roomId),
    queryFn: () => RoomService.getRoomById({ roomId }),
    select: (res) => res.data,
    enabled: !!roomId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
