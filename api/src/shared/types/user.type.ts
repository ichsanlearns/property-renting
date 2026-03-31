import type { Role } from "../../generated/prisma/enums.js";

export type UpdateMe = {
  fullName?: string;
  email?: string;
  phoneNumbers?: string;
  role?: Role;
  isVerified?: boolean;
  profileImage?: string;
};
