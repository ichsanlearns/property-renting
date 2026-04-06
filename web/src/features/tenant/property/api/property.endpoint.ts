export const PROPERTY_ENDPOINTS = {
  CREATE: "/properties",
  GET_BY_ID_BASIC: (propertyId: string) => `/properties/${propertyId}/basic`,
  GET_BY_ID: (propertyId: string) => `/properties/${propertyId}`,
  CATEGORIES: {
    GET_ALL: "/property-categories",
  },
  AMENITIES: {
    GET_ALL: "/property-amenities",
  },
};
