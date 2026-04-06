export const queryKeys = {
  property: {
    basic: (propertyId: string) => ["property", propertyId, "basic"] as const,
    detail: (propertyId: string) => ["property", propertyId, "detail"] as const,
  },
};
