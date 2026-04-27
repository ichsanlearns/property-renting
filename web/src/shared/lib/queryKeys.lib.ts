export const queryKeys = {
  property: {
    cities: () => ["property", "cities"] as const,
    allBasic: () => ["property", "all", "basic"] as const,
    basic: (propertyId: string) => ["property", propertyId, "basic"] as const,
    detail: (propertyId: string) => ["property", propertyId, "detail"] as const,
    detailFullInfo: (propertyId: string) =>
      ["property", propertyId, "detail", "fullInfo"] as const,
    byTenantId: () => ["property", "byTenantId"] as const,
    search: (
      search?: string,
      checkIn?: string,
      checkOut?: string,
      city?: string,
      sortBy?: "name" | "price" | "createdAt",
      order?: "asc" | "desc",
    ) =>
      [
        "property",
        "search",
        search,
        checkIn,
        checkOut,
        city,
        sortBy,
        order,
      ] as const,
    roomPricesDate: (
      propertyId: string,
      startDate: string | null,
      endDate: string | null,
    ) => ["property", propertyId, "availability", startDate, endDate] as const,
  },
  pricing: {
    myPricing: () => ["pricing", "myPricing"] as const,
  },
  auth: {
    token: (token: string) => ["auth", token, "token"] as const,
  },
};
