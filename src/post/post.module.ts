import { Module } from '@nestjs/common';
import { PrismaService } from 'lib/prisma.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  providers: [PostService, PrismaService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
