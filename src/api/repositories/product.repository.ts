import type { Product } from "@prisma/client";
import { prisma } from "../../config/database";

export const ProductRepository = {
  async findByGameId(gameId: number): Promise<Product[]> {
    return prisma.product.findMany({
      where: { gameId, isActive: true },
      orderBy: { id: "asc" },
    });
  },

  async findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  },
};
