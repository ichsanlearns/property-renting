import { Router } from "express";
import * as AmenityController from "./amenity.controller.js";

const router = Router();

router.get("/", AmenityController.getAllController);

export default router;
