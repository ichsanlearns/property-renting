import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/category.service";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    select: (res) => res.data,
    staleTime: Infinity,
  });
};
