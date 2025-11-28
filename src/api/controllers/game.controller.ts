import type { Request, Response, NextFunction } from "express";
import { GameService } from "../services/game.service";

export const getGames = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const games = await GameService.getGames();
    res.json({ data: games });
  } catch (error) {
    next(error);
  }
};


