import type { Product } from "@prisma/client";
import { prisma } from "../../config/database";

export const ProductRepository = {
  async findByGameId(gameId: number): Promise<Product[]> {
    return prisma.product.findMany({
      where: { gameId },
      orderBy: { id: "asc" },
    });
  },
};
