export const queryKeys = {
  property: {
    basic: (propertyId: string) => ["property", propertyId, "basic"] as const,
    detail: (propertyId: string) => ["property", propertyId, "detail"] as const,
    roomPricesDate: (propertyId: string, startDate: Date, endDate: Date) =>
      [
        "property",
        propertyId,
        "availability",
        startDate.toISOString(),
        endDate.toISOString(),
      ] as const,
  },
};
