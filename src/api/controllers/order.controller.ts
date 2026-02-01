import type { Request, Response, NextFunction } from "express";
import type { ApiResponse } from "../../types/api";
import type { Order, OrderItem, Transaction } from "@prisma/client";
import { OrderService } from "../services/order.service";

interface CreateOrderBody {
  userId: string;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

export const createOrder = async (
  req: Request<{}, ApiResponse<Order & { items: OrderItem[]; transaction: Transaction | null }>, CreateOrderBody>,
  res: Response<ApiResponse<Order & { items: OrderItem[]; transaction: Transaction | null }>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId, items } = req.body;

    // Validasi input
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      const error = new Error("userId and items (non-empty array) are required");
      (error as { statusCode?: number }).statusCode = 400;
      throw error;
    }

    const order = await OrderService.createOrder({
      userId,
      items,
    });

    res.status(201).json({ data: order });
  } catch (error) {
    next(error);
  }
};





