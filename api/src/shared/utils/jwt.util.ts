import jwt from "jsonwebtoken";

import type { Role } from "../../generated/prisma/enums.js";

export function generateRefreshToken({
  userId,
  role,
}: {
  userId: string;
  role: Role;
}) {
  return jwt.sign({ userId, role }, process.env.JWT_REFRESH_TOKEN!, {
    expiresIn: "7d",
  });
}

export function generateAccessToken({
  userId,
  role,
}: {
  userId: string;
  role: Role;
}) {
  return jwt.sign({ userId, role }, process.env.JWT_ACCESS_TOKEN!, {
    expiresIn: "15m",
  });
}

export function generateRegisterToken({ email }: { email: string }) {
  return jwt.sign({ email }, process.env.JWT_REGISTER_TOKEN!, {
    expiresIn: "120m",
  });
}
