export const queryKeys = {
  property: {
    basic: (propertyId: string) => ["property", propertyId, "basic"] as const,
  },
};
