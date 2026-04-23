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

export type GetPropertyAllBasicResponse = {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;

  price: number;
  averageRating: number;
  reviewCount: number;
  coverImage: string;
}[];

export type GetPropertySearchResponse = {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;

  latitude: number;
  longitude: number;

  price: number;
  averageRating: number;
  reviewCount: number;
  coverImage: string;
}[];

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
  id: string;
  name: string;
  price: number;
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

export type GetPropertyByTenantIdResponse = {
  id: string;
  name: string;

  category: string;

  city: string;
  country: string;

  averageRating: number;
  reviewCount: number;

  numberOfBathrooms: number;
  updatedAt: string;

  isPublished: string;

  coverImage: string;
  roomTypes: {
    name: string;
    basePrice: number;
    capacity: number;
  };
}[];

// export type GetPropertyRoomPricesDateResponse = {
//   roomTypeId: string;
//   date: string;
//   price: number;
//   availableRooms: number;
//   isClosed: boolean;
// };

export type GetPropertyRoomPricesDateResponse = {
  [roomTypeId: string]: {
    basePrice: number;
    dates: {
      [date: string]: {
        price: number;
        availableRooms: number;
        isClosed: boolean;
      };
    };
  };
};

export type CreatePropertyResponse = PropertyBasicResponse;

export type GetPropertyByIdBasicResponse = PropertyBasicResponse;
