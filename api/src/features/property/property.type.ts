export type CreatePropertyDto = {
  categoryId: string;
  title: string;
  description: string;
  country: string;
  city: string;
  province: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  numberOfBathrooms: number;
};
