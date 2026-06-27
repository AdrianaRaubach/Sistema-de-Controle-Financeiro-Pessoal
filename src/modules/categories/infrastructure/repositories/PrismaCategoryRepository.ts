import { prisma } from "../../../../shared/database/prisma.js";
import { Category, type CategoryKind } from "../../domain/entities/Category.js";
import type { CategoryRepository } from "../../domain/repositories/CategoryRepository.js";

export class PrismaCategoryRepository implements CategoryRepository {
  async findById(id: string): Promise<Category | null> {
    const row = await prisma.category.findUnique({ where: { id } });
    if (!row) return null;
    return Category.create({ ...row, kind: row.kind as CategoryKind });
  }

  async findByUserIdAndName(userId: string, name: string): Promise<Category | null> {
    const row = await prisma.category.findFirst({ where: { userId, name } });
    if (!row) return null;
    return Category.create({ ...row, kind: row.kind as CategoryKind });
  }

  async listByUserId(userId: string): Promise<Category[]> {
    const rows = await prisma.category.findMany({ where: { userId } });
    return rows.map((row) => Category.create({ ...row, kind: row.kind as CategoryKind }));
  }

  async create(category: Category): Promise<void> {
    await prisma.category.create({
      data: {
        id: category.id,
        userId: category.userId,
        name: category.name,
        kind: category.kind,
        createdAt: category.createdAt,
      },
    });
  }
}
