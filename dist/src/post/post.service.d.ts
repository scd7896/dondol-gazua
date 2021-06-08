import { Post } from '.prisma/client';
import { PrismaService } from 'lib/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { PostDto } from './dto/post.dto';
export declare class PostService {
    private prisma;
    private upload;
    constructor(prisma: PrismaService, upload: UploadService);
    findOne(id: number): Promise<Post & {
        images: import(".prisma/client").Image[];
    }>;
    findAll(size?: number, number?: number): Promise<{
        payload: Pick<Post, 'title' | 'id' | 'meetDate' | 'updatedAt' | 'createdAt'>[];
        count: number;
    }>;
    createPost(post: PostDto): Promise<Post>;
    updatePost(id: number, post: PostDto): Promise<Post>;
    deletePost(id: number): Promise<string>;
}
