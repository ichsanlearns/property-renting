export const queryKeys = {
  property: {
    allBasic: () => ["property", "all", "basic"] as const,
    basic: (propertyId: string) => ["property", propertyId, "basic"] as const,
    detail: (propertyId: string) => ["property", propertyId, "detail"] as const,
    roomPricesDate: (propertyId: string, startDate: string, endDate: string) =>
      ["property", propertyId, "availability", startDate, endDate] as const,
  },
};
