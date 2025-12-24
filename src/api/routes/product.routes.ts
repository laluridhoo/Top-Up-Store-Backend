import { Router } from "express";
import { getProductsByGame } from "../controllers/product.controller";

const router = Router();

router.get("/products/:gameId", getProductsByGame);

export default router;
