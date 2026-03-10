import { prisma } from "../../shared/lib/prisma.lib.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { StringValue } from "ms";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRES_IN as StringValue,
    },
  );

  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");

  return {
    token,
    user: {
      id: user.id,
      fullName,
      email: user.email,
      phoneNumbers: user.phone_number,
      role: user.role,
      isVerified: user.is_verified,
      profileImage: user.profile_image,
    },
  };
};
