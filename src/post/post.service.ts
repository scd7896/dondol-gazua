import { Post } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private upload: UploadService) {}

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
    const postImagesMap = {};

    post.images?.map((path) => (postImagesMap[path] = path));

    const updateData = await this.prisma.post.update({
      where: { id },
      data: {
        title: post.title,
        contents: post.contents,
        meetDate: post.meetDate,
        updatedAt: new Date(),
        images: {
          create: post.images?.map((path) => ({ path })),
        },
      },
      include: {
        images: true,
      },
    });
    const removeImages = [];
    beforeDate.images?.map(({ path }) => {
      if (!postImagesMap[path]) removeImages.push(path);
    });
    const promises = removeImages.map((path) => this.upload.delete(path));
    await Promise.all(promises);
    await this.prisma.image.deleteMany({
      where: {
        path: {
          in: beforeDate.images.map(({ path }) => path),
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
    const promises = result.images.map(({ path }) => this.upload.delete(path));
    await Promise.all(promises);
    return '삭제 완료';
  }
}
