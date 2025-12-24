import type { Game } from "@prisma/client";
import { GameRepository } from "../repositories/game.repository";

export const GameService = {
  async getGames(): Promise<Game[]> {
    return GameRepository.findAll();
  },
};
