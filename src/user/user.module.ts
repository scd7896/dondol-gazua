import { Module } from '@nestjs/common';
import { PrismaService } from 'lib/prisma.service';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaService],
  imports: [],
  exports: [UserService],
})
export class UserModule {}
