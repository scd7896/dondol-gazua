import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma.service';
import * as bcrypt from 'bcrypt';
import { salt } from 'src/auth/constant';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser({ email, password }: Pick<User, 'email' | 'password'>) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return null;
    } else {
      const hashedPassword = await bcrypt.hash(password, salt);
      return this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    }
  }

  async findOne(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
