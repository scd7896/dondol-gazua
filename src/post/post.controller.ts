import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  allFind() {
    return this.postService.findAll();
  }
}
