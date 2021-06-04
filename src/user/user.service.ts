import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    return this.prisma.user.findUnique({
      select: {
        password: true,
        email: true,
      },
      where: {
        email,
      },
    });
  }
}
