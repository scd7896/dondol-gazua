import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { PrismaService } from 'lib/prisma.service';
import { PostModule } from './post/post.module';

import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UserModule, PrismaService, PostModule, AuthModule, UploadModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
