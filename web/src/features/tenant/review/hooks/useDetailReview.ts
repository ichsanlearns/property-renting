import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import api from "../../../../api/client";

export default function useDetailReview() {
  const { propertyId } = useParams();

  const [search, setSearch] = useState("");
  const [filterStar, setFilterStar] = useState("ALL");

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", propertyId],
    queryFn: async () => {
      const res = await api.get(`/reviews/property/${propertyId}`);
      return res.data.data;
    },
    enabled: !!propertyId,
  });

  const reviews = data?.reviews || [];

  const filteredReviews = useMemo(() => {
    return reviews.filter((item: any) => {
      const matchSearch = item.comment.toLowerCase().includes(search.toLowerCase()) || item.customer?.firstName?.toLowerCase().includes(search.toLowerCase());

      const matchStar = filterStar === "ALL" ? true : item.rating === Number(filterStar);

      return matchSearch && matchStar;
    });
  }, [reviews, search, filterStar]);

  return {
    search,
    setSearch,

    filterStar,
    setFilterStar,

    data,
    isLoading,

    filteredReviews,
  };
}
