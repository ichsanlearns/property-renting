import express, { type Application, type Request, type Response } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./features/auth/auth.route.js";
import userRoutes from "./features/user/user.route.js";
import propertyRoutes from "./features/property/property.route.js";
import categoryRoutes from "./features/property/category/category.route.js";
import amenityRoutes from "./features/property/amenity/amenity.route.js";
import reservationRoutes from "./features/reservation/reservation.route.js";
import paymentRoutes from "./features/payment/payment.route.js";

import { notFound } from "./shared/middleware/not-found.middleware.js";
import { error } from "./shared/middleware/error.middleware.js";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json());
app.use(cors({ origin: `${process.env.WEB_URL}`, credentials: true }));
app.use(cookieParser());

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/api/status", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is running!", uptime: process.uptime() });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/property-categories", categoryRoutes);
app.use("/api/property-amenities", amenityRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/payments", paymentRoutes);

app.use(notFound);
app.use(error);

app.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
});

export default app;
