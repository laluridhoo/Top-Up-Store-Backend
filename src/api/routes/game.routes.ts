import { Router } from "express";
import { getGames } from "../controllers/game.controller";

const router = Router();

router.get("/games", getGames);

export default router;


