import type { Product } from "@prisma/client";
import { ProductRepository } from "../repositories/product.repository";

export const ProductService = {
  async getProductsByGameId(gameId: number): Promise<Product[]> {
    return ProductRepository.findByGameId(gameId);
  },
};
