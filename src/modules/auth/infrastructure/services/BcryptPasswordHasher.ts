import bcrypt from "bcryptjs";
import type { PasswordHasher } from "../../application/services/PasswordHasher.js";

export class BcryptPasswordHasher implements PasswordHasher {
    async hash(value: string): Promise<string> {
        return bcrypt.hash(value, 10);
    }

    async compare(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }
}
