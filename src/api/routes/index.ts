import { Router } from "express";
import gameRoutes from "./game.routes";
import productRoutes from "./product.routes";

const router = Router();

router.use("/api", gameRoutes);
router.use("/api", productRoutes);

export default router;
