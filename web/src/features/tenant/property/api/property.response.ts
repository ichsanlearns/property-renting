export type PropertyBasicResponse = {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;
  averageRating: number;
  reviewCount: number;
  coverImage: string;
};

type TenantResponse = {
  id: string;
  firstName: string;
  profileImage: string;
};

type CategoryResponse = {
  name: string;
};

type PropertyImageResponse = {
  imageUrl: string;
};

export type GetPropertyByIdResponse = {
  name: string;
  description: string;
  country: string;
  city: string;
  province: string;
  fullAddress: string;

  latitude: number;
  longitude: number;

  numberOfBathrooms: number;

  averageRating: number;
  reviewCount: number;

  tenant: TenantResponse;
  category: CategoryResponse;
  images: PropertyImageResponse[];
};

export type CreatePropertyResponse = PropertyBasicResponse;

export type GetPropertyByIdBasicResponse = PropertyBasicResponse;
