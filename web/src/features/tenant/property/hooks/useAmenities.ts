import { useQuery } from "@tanstack/react-query";
import { getAmenities } from "../api/amenity.service";

export const useAmenities = (type: "PROPERTY" | "ROOM") => {
  return useQuery({
    queryKey: ["amenities", type],
    queryFn: () => getAmenities(type),
    select: (res) => res.data,
    staleTime: Infinity,
  });
};
