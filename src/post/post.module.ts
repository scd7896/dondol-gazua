import { Module } from '@nestjs/common';
import { PrismaService } from 'lib/prisma.service';
import { PostService } from './post.service';

@Module({
  providers: [PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
