import { Router } from "express";
import { login, authRefreshToken } from "./auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/refresh", authRefreshToken);

export default router;
