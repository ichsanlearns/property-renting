import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../utils/app-error.util.js";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError(401, "Unauthorized"));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

    req.user = payload;

    next();
  } catch {
    next(new AppError(401, "Invalid token"));
  }
}
