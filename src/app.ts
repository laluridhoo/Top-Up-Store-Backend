import cors from "cors";
import express, { Application, Request, Response } from "express";
import apiRoutes from "./api/routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use(apiRoutes);

export default app;
