import cors from "cors";
import express, { type Application, type Request, type Response } from "express";
import apiRoutes from "./api/routes";
import { errorHandler } from "./api/middlewares/errorHandler";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req: Request, res: Response): void => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use(apiRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
