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
  isCover: boolean;
  order: number;
};

type PropertyAmenityResponse = {
  amenity: {
    name: string;
    icon: string;
    description: string;
  };
};

type RoomTypeImageResponse = {
  imageUrl: string;
};

type RoomTypeAmenityResponse = {
  amenity: {
    icon: string;
  };
};

type RoomTypeResponse = {
  name: string;
  basePrice: number;
  capacity: number;
  bedType: string;
  bedCount: number;
  viewType: string;
  bathroomType: string;

  averageRating: number;
  reviewCount: number;

  roomTypeImages: RoomTypeImageResponse[];
  roomAmenities: RoomTypeAmenityResponse[];
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
  propertyImages: PropertyImageResponse[];
  propertyAmenities: PropertyAmenityResponse[];
  roomTypes: RoomTypeResponse[];
};

export type CreatePropertyResponse = PropertyBasicResponse;

export type GetPropertyByIdBasicResponse = PropertyBasicResponse;
