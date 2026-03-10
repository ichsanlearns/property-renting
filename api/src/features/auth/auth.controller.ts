import type { Request, Response } from "express";
import * as authService from "./auth.service.js";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  res.status(200).json({ message: "Login success", data: result });
};
