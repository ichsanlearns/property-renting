export type CreatePropertyDto = {
  categoryId: string;
  name: string;
  description: string;
  country: string;
  city: string;
  province: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  numberOfBathrooms: number;
};

export type updatePropertPayload = {
  name: string;
  description: string;
  country: string;
  city: string;
  province: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  numberOfBathrooms: number;
};
