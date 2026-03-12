import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./features/auth/auth.route.js";
import { notFound } from "./shared/middleware/not-found.middleware.js";
import { error } from "./shared/middleware/error.middleware.js";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json());
app.use(cors({ origin: `${process.env.WEB_URL}`, credentials: true }));
app.use(cookieParser());

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/api/status", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(error);

app.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
});

export default app;
