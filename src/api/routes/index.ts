import { Router } from "express";
import gameRoutes from "./game.routes";

const router = Router();

router.use("/api", gameRoutes);

export default router;
