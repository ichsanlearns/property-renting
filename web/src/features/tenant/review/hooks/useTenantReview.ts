import { useState } from "react";
import { usePropertyByTenantId } from "../../property/hooks/useProperty";

export default function useTenantReview() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = usePropertyByTenantId();

  const properties = data?.data;

  const filteredProperties =
    properties?.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const totalAssets = properties?.length || 0;

  const totalPublished =
    properties?.filter((item: any) => item.isPublished).length || 0;

  const avgRating =
    properties && properties.length > 0
      ? (
          properties.reduce(
            (acc: number, item: any) => acc + Number(item.averageRating || 0),
            0,
          ) / properties.length
        ).toFixed(1)
      : "0.0";

  return {
    searchQuery,
    setSearchQuery,
    isLoading,
    filteredProperties,
    totalAssets,
    totalPublished,
    avgRating,
  };
}
