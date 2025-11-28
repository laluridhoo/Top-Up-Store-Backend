import type { Game } from "../../models/types";
import { GameRepository } from "../repositories/game.repository";

export const GameService = {
  async getGames(): Promise<Game[]> {
    // Temp: tidak ada bisnis logic rumit, hanya ambil semua game.
    return GameRepository.findAll();
  },
};


