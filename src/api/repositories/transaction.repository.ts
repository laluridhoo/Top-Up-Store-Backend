import { prisma } from "../../config/database";

interface UpdateTransactionData {
  snapToken?: string;
  paymentId?: string;
  status?: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
}

export const TransactionRepository = {
  async updateByOrderId(orderId: number, data: UpdateTransactionData) {
    return prisma.transaction.update({
      where: { orderId },
      data,
    });
  },

  async findByOrderId(orderId: number) {
    return prisma.transaction.findUnique({
      where: { orderId },
    });
  },
};


