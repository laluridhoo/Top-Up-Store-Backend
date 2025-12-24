import type { Request, Response, NextFunction } from "express";
import type { ApiResponse } from "../../types/api";
import type { Product } from "@prisma/client";
import { ProductService } from "../services/product.service";

export const getProductsByGame = async (req: Request, res: Response<ApiResponse<Product[]>>, next: NextFunction): Promise<void> => {
  try {
    const gameId = Number(req.params.gameId);

    if (Number.isNaN(gameId)) {
      const error = new Error("Invalid gameId parameter");
      (error as { statusCode?: number }).statusCode = 400;
      throw error;
    }

    const products = await ProductService.getProductsByGameId(gameId);
    res.status(200).json({ data: products });
  } catch (error) {
    next(error);
  }
};
