import { Post } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { basePath } from './constants';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private upload: UploadService) {}
  async findOne(id: number) {
    const target = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    target.images = target.images.map((image) => ({
      ...image,
      path: basePath + image.path,
    }));

    return target;
  }

  async findAll(
    size = 30,
    number = 1,
  ): Promise<{
    payload: Pick<
      Post,
      'title' | 'id' | 'meetDate' | 'updatedAt' | 'createdAt'
    >[];
    count: number;
  }> {
    const list = await this.prisma.post.findMany({
      take: size,
      skip: (number - 1) * size,
      select: {
        title: true,
        id: true,
        meetDate: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    const count = await this.prisma.post.count();
    return { payload: list, count };
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

    post.images?.map((path) => {
      const pathId = path.split(basePath).pop();
      postImagesMap[pathId] = pathId;
    });

    const updateData = await this.prisma.post.update({
      where: { id },
      data: {
        title: post.title,
        contents: post.contents,
        meetDate: post.meetDate,
        updatedAt: new Date(),
        images: {
          create: post.images?.map((path) => ({
            path: path.split(basePath).pop(),
          })),
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
    const promises = result.images.map(({ path }) =>
      this.upload.delete(path.split(basePath).pop()),
    );
    await Promise.all(promises);
    return '삭제 완료';
  }
}
