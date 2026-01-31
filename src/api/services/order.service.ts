import type { Order, OrderItem, Transaction } from "@prisma/client";
import { ProductRepository } from "../repositories/product.repository";
import { OrderRepository } from "../repositories/order.repository";

interface CreateOrderRequest {
  userId: string;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

export const OrderService = {
  async createOrder(data: CreateOrderRequest): Promise<Order & { items: OrderItem[]; transaction: Transaction | null }> {
    // Validasi produk
    const productIds = data.items.map((item) => item.productId);
    const products = await Promise.all(
      productIds.map((id) => ProductRepository.findById(id))
    );

    // Cek apakah semua produk ada
    const missingProducts = products.filter((p) => p === null);
    if (missingProducts.length > 0) {
      const error = new Error("One or more products not found");
      (error as { statusCode?: number }).statusCode = 404;
      throw error;
    }

    // Cek apakah produk aktif
    const inactiveProducts = products.filter((p) => p !== null && !p.isActive);
    if (inactiveProducts.length > 0) {
      const error = new Error("One or more products are not active");
      (error as { statusCode?: number }).statusCode = 400;
      throw error;
    }

    // Validasi quantity
    for (const item of data.items) {
      if (item.quantity <= 0) {
        const error = new Error("Quantity must be greater than 0");
        (error as { statusCode?: number }).statusCode = 400;
        throw error;
      }
    }

    // Hitung total harga
    let totalPrice = 0;
    const orderItems = data.items.map((item) => {
      const product = products.find((p) => p?.id === item.productId)!;
      const itemPrice = product.price * item.quantity;
      totalPrice += itemPrice;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: itemPrice,
      };
    });

    // Create order dengan status PENDING
    const order = await OrderRepository.create({
      userId: data.userId,
      totalPrice,
      items: orderItems,
    });

    return order;
  },
};



