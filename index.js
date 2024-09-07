import express, { json } from "express";
import cors from "cors";
import envCaptured from "./config/env-validation.js";
import connectDB from "./config/database.js";
import usersRoutes from "./routes/users-routes.js";
import authRoutes from "./routes/auth-routes.js";
import invoiceRoutes from "./routes/invoice-routes.js";
import errorHandler from "./middlewares/error-handler.js";
import setupSwagger from "./swagger/swagger-config.js";
import globalException from "./middlewares/global-exception.js";

const app = express(),
  PORT = envCaptured.port;
connectDB(envCaptured.mongoose.url);
app.use(json({ limit: "50mb" }));
app.use(cors());
setupSwagger(app);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use(errorHandler);
app.use(globalException);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App is running on Port ${PORT}`);
});
