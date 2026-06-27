import { prisma } from "../../../../shared/database/prisma.js";
import { User } from "../../domain/entities/User.js";
import type { UserRepository } from "../../domain/repositories/UserRepository.js";

export class PrismaUserRepository implements UserRepository {
    async findById(id: string): Promise<User | null> {
        const row = await prisma.user.findUnique({ where: { id } });
        if (!row) return null;
        return User.create(row);
    }

    async findByEmail(email: string): Promise<User | null> {
        const row = await prisma.user.findUnique({ where: { email } });
        if (!row) return null;
        return User.create(row);
    }

    async create(user: User): Promise<void> {
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                passwordHash: user.passwordHash,
                createdAt: user.createdAt,
            },
        });
    }
}
