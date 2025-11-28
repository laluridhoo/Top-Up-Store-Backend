import { GameRepository } from "../repositories/game.repository";

export const GameService = {
  async getGames() {
    // Temp: tidak ada bisnis logic rumit, hanya ambil semua game.
    return GameRepository.findAll();
  },
};
