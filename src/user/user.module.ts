import { Module } from '@nestjs/common';

import { PrismaService } from 'lib/prisma.service';
import { AuthService } from 'src/auth/auth.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
