import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { PrismaService } from 'lib/prisma.service';
import { PostModule } from './post/post.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PrismaService, PostModule, AuthModule],
})
export class AppModule {}
