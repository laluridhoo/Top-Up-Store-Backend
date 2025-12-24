import type { Request, Response, NextFunction } from "express";
import type { ApiResponse } from "../../types/api";
import type { Game } from "@prisma/client";
import { GameService } from "../services/game.service";

export const getGames = async (_req: Request, res: Response<ApiResponse<Game[]>>, next: NextFunction): Promise<void> => {
  try {
    const games = await GameService.getGames();
    res.status(200).json({ data: games });
  } catch (error) {
    next(error);
  }
};
