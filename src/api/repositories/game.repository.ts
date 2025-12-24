import type { Game } from "@prisma/client";
import { prisma } from "../../config/database";

export const GameRepository = {
  async findAll(): Promise<Game[]> {
    return prisma.game.findMany();
  },
};
