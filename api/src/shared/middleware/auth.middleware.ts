import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../utils/app-error.util.js";

type DecodedToken = {
  userId: string;
  role: string;
};

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN!,
    ) as DecodedToken;

    req.user = payload;

    next();
  } catch {
    next(new AppError("Invalid token", 401));
  }
}
