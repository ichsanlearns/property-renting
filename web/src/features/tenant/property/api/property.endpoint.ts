export const PROPERTY_ENDPOINTS = {
  CREATE: "/properties",
  GET_BY_ID_BASIC: (propertyId: string) => `/properties/${propertyId}/basic`,
  CATEGORIES: {
    GET_ALL: "/property-categories",
  },
  AMENITIES: {
    GET_ALL: "/property-amenities",
  },
};
