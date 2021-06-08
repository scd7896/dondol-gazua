import { User } from '.prisma/client';
import { PrismaService } from 'lib/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser({ email, password }: Pick<User, 'email' | 'password'>): Promise<User>;
    findOne(email: string): Promise<User>;
}
