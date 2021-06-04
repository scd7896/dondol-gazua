import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { PostController } from './post/post.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from 'lib/prisma.service';

@Module({
  imports: [AuthModule, UserModule, PrismaService],
  controllers: [AppController, UserController, PostController],
})
export class AppModule {}
