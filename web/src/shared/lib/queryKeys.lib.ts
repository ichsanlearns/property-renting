export const queryKeys = {
  property: {
    cities: () => ["property", "cities"] as const,
    allBasic: () => ["property", "all", "basic"] as const,
    basic: (propertyId: string) => ["property", propertyId, "basic"] as const,
    detail: (propertyId: string) => ["property", propertyId, "detail"] as const,
    detailFullInfo: (propertyId: string) =>
      ["property", propertyId, "detail", "fullInfo"] as const,
    byTenantId: (page: number, limit: number) =>
      ["property", "byTenantId", page, limit] as const,
    search: (
      search?: string,
      checkIn?: string,
      checkOut?: string,
      city?: string,
      sortBy?: "name" | "price" | "createdAt",
      order?: "asc" | "desc",
      page?: number,
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
        page,
      ] as const,
    roomPricesDate: (
      propertyId: string,
      startDate: string | null,
      endDate: string | null,
    ) => ["property", propertyId, "availability", startDate, endDate] as const,
  },
  room: {
    getById: (roomId: string) => ["room", roomId, "getById"] as const,
  },
  pricing: {
    myPricing: () => ["pricing", "myPricing"] as const,
  },
  auth: {
    token: (token: string) => ["auth", token, "token"] as const,
  },
};
