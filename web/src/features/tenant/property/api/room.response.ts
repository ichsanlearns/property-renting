export type GetRoomByIdResponse = {
  id: string;
  name: string;
  basePrice: number;
  totalRooms: number;

  bedType: string;
  capacity: number;
  viewType: string;
  bathroomType: string;
  bedCount: number;

  availableRooms: number;

  averageRating: number;
  reviewCount: number;

  isPublished: string;
  isVerified: string;

  amenities: string[];

  roomTypeImages: string[];
};
