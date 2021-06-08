import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    allFind(size: number, number: number): Promise<{
        payload: Pick<import(".prisma/client").Post, "id" | "title" | "meetDate" | "createdAt" | "updatedAt">[];
        count: number;
    }>;
    findOne(id: number): Promise<import(".prisma/client").Post & {
        images: import(".prisma/client").Image[];
    }>;
    createPost(post: PostDto): Promise<import(".prisma/client").Post>;
    changePost(post: PostDto, id: number): Promise<import(".prisma/client").Post>;
    deletePost(id: number): Promise<string>;
}
