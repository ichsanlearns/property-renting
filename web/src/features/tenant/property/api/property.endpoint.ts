export const PROPERTY_ENDPOINTS = {
  CREATE: "/properties",
  UPDATE: (propertyId: string) => `/properties/${propertyId}`,
  GET_ALL_BASIC: "/properties",
  GET_BY_TENANT_ID: "/properties/tenant",
  SEARCH: "/properties/search",
  GET_CITIES: "/properties/cities",
  GET_BY_ID_BASIC: (propertyId: string) => `/properties/${propertyId}/basic`,
  GET_BY_ID: (propertyId: string) => `/properties/${propertyId}`,
  GET_PROPERTY_ROOM_PRICES_DATE: (propertyId: string) =>
    `/properties/${propertyId}/availability`,
  GET_BY_ID_FULL_INFO: (propertyId: string) =>
    `/properties/${propertyId}/full-info`,
  CATEGORIES: {
    GET_ALL: "/property-categories",
  },
  AMENITIES: {
    GET_ALL: "/property-amenities",
  },
  DELETE: (propertyId: string) => `/properties/${propertyId}`,
};
