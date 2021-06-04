import { Controller, Get, UseGuards } from '@nestjs/common';

import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  allFind() {
    return this.postService.findAll();
  }
}
