import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';

import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @Roles('user')
  allFind() {
    return this.postService.findAll();
  }
}
