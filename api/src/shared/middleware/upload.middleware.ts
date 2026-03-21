import multer from "multer";
import { AppError } from "../utils/app-error.util.js";

export const uploadCloud = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req: any, file: any, cb: any) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new AppError(400, "Invalid file type"));
    }
    cb(null, true);
  },
});
