import type { Role } from "../../generated/prisma/enums.js";

export type UpdateMe = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: Role;
  isVerified?: boolean;
  profileImage?: string;
};
