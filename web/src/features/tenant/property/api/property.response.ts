type PropertyBasicResponse = {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;
  averageRating: number;
  reviewCount: number;
  coverImage: string;
};

export type createPropertyResponse = PropertyBasicResponse;

export type getPropertyByIdBasicResponse = PropertyBasicResponse;
