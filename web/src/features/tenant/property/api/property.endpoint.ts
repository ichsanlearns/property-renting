export const PROPERTY_ENDPOINTS = {
  CREATE: "/properties",
  GET_BY_ID_BASIC: (propertyId: string) => `/properties/${propertyId}/basic`,
  GET_BY_ID: (propertyId: string) => `/properties/${propertyId}`,
  GET_PROPERTY_ROOM_PRICES_DATE: (propertyId: string) =>
    `/properties/${propertyId}/availability`,
  CATEGORIES: {
    GET_ALL: "/property-categories",
  },
  AMENITIES: {
    GET_ALL: "/property-amenities",
  },
};
