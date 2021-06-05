import { Post } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async createPost(post: PostDto): Promise<Post> {
    const images = post.images ? post.images.map((path) => ({ path })) : [];
    return this.prisma.post.create({
      data: {
        title: post.title,
        contents: post.contents,
        createdAt: new Date(),
        updatedAt: new Date(),
        meetDate: post.meetDate,
        images: {
          create: images,
        },
      },
      include: {
        images: true,
      },
    });
  }

  async updatePost(id: number, post: PostDto): Promise<Post> {
    const beforeDate = await this.prisma.post.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });
    if (!beforeDate) return null;

    await this.prisma.image.deleteMany({
      where: {
        postId: beforeDate.id,
      },
    });

    if (post.images) {
      await this.prisma.image.createMany({
        data: post.images.map((path) => ({ path, postId: beforeDate.id })),
      });
    }

    const updateData = await this.prisma.post.update({
      where: { id },
      data: {
        title: post.title,
        contents: post.contents,
        meetDate: post.meetDate,
        updatedAt: new Date(),
      },
      include: {
        images: true,
      },
    });
    const removeImages = [];
    beforeDate.images?.map(({ path }) => {
      removeImages.push(path);
    });
    await this.prisma.image.deleteMany({
      where: {
        path: {
          in: removeImages,
        },
      },
    });
    return updateData;
  }

  async deletePost(id: number): Promise<string> {
    await this.prisma.image.deleteMany({
      where: {
        postId: id,
      },
    });
    const result = await this.prisma.post.delete({
      where: { id },
      include: { images: true },
    });
    result.images.map(({ path }) => console.log(path, '삭제'));
    return '삭제 완료';
  }
}
