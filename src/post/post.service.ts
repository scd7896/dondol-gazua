import { Post } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }
}
