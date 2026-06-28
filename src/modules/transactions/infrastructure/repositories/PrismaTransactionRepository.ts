import { Prisma } from "@prisma/client";
import { prisma } from "../../../../shared/database/prisma.js";
import { Transaction, TransactionType, ExpenseStatus } from "../../domain/entities/Transaction.js";
import type { TransactionFilters, TransactionRepository } from "../../domain/repositories/TransactionRepository.js";

export class PrismaTransactionRepository implements TransactionRepository {
  public async findById(id: string): Promise<Transaction | null> {
    const row = await prisma.transaction.findUnique({ where: { id } });
    if (!row) return null;
    return Transaction.create({ ...row, type: row.type as TransactionType, status: row.status as ExpenseStatus });
  }

  public async listByUserId(userId: string, filters?: TransactionFilters): Promise<Transaction[]> {
    const where: Prisma.TransactionWhereInput = { userId };

    if (filters?.categoryId) where.categoryId = filters.categoryId;
    if (filters?.type) where.type = filters.type;
    if (filters?.month && filters?.year) {
      where.occurredAt = {
        gte: new Date(filters.year, filters.month - 1, 1),
        lt: new Date(filters.year, filters.month, 1),
      };
    }

    const rows = await prisma.transaction.findMany({ where });
    return rows.map(row =>
      Transaction.restore({
        ...row,
        type: row.type as TransactionType,
        status: row.status as ExpenseStatus | null,
      })
    );
  }

  public async create(transaction: Transaction): Promise<void> {
    await prisma.transaction.create({
      data: {
        id: transaction.id,
        userId: transaction.userId,
        categoryId: transaction.categoryId,
        type: transaction.type,
        description: transaction.description,
        amount: transaction.amount,
        occurredAt: transaction.occurredAt,
        status: transaction.status,
        createdAt: transaction.createdAt,
      },
    });
  }

  public async update(transaction: Transaction): Promise<void> {
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        paidAt: transaction.paidAt,
        status: transaction.status,
      },
    });
  }
}
