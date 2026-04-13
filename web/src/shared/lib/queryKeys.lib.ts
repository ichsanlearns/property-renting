export const queryKeys = {
  property: {
    allBasic: () => ["property", "all", "basic"] as const,
    basic: (propertyId: string) => ["property", propertyId, "basic"] as const,
    detail: (propertyId: string) => ["property", propertyId, "detail"] as const,
    search: (
      search: string,
      sortBy?: "name" | "price" | "createdAt",
      order?: "asc" | "desc",
    ) => ["property", "search", search, sortBy, order] as const,
    roomPricesDate: (propertyId: string, startDate: string, endDate: string) =>
      ["property", propertyId, "availability", startDate, endDate] as const,
  },
};
