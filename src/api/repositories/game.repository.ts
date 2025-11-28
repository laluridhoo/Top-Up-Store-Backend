import { prisma } from "../../config/database";

export const GameRepository = {
  async findAll() {
    return prisma.game.findMany();
  },
};
