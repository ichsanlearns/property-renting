import type { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  res.status(200).json({ message: "Login success", data: result });
});
