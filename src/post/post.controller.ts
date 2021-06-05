import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  changePost(@Body() post: PostDto, @Param('id', ParseIntPipe) id: number) {
    return this.postService.updatePost(id, post);
  }

  @Delete(':id')
  @Roles('user')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }
}
