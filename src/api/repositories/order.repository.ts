import type { Order, OrderItem, Transaction } from "@prisma/client";
import { prisma } from "../../config/database";

interface CreateOrderData {
  userId: string;
  totalPrice: number;
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
}

export const OrderRepository = {
  async create(data: CreateOrderData): Promise<Order & { items: OrderItem[]; transaction: Transaction | null }> {
    return prisma.order.create({
      data: {
        userId: data.userId,
        totalPrice: data.totalPrice,
        status: "PENDING",
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        transaction: {
          create: {
            status: "PENDING",
          },
        },
      },
      include: {
        items: true,
        transaction: true,
      },
    });
  },
};


