import type {
  BedType,
  ViewType,
  BathroomType,
  VerificationStatus,
  PublishStatus,
} from "../../../generated/prisma/enums.js";

export type CreateRoomPayload = {
  propertyId: string;
  name: string;
  description: string;
  basePrice: number;
  quantity: number;
  bedType: BedType;
  bedCount: number;
  viewType: ViewType;
  bathroomType: BathroomType;
  capacity: number;
  isVerified: VerificationStatus;
  isPublished: PublishStatus;
};
