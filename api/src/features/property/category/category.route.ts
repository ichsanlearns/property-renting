import { Router } from "express";

import * as CategoryController from "./category.controller.js";

const router = Router();

router.get("/", CategoryController.getAllCategory);

export default router;
