import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { PostDto } from './dto/post.dto';

import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @Roles('user')
  allFind() {
    return this.postService.findAll();
  }

  @Post()
  @Roles('user')
  createPost(@Body() post: PostDto) {
    const result = this.postService.createPost(post);
    return result;
  }

  @Put(':id')
  @Roles('user')
  changePost(@Body() post: PostDto, @Param('id') id: string) {
    return this.postService.updatePost(parseInt(id, 10), post);
  }

  @Delete(':id')
  @Roles('user')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(parseInt(id, 10));
  }
}
