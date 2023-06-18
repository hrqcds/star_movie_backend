import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreatePost } from 'src/dtos/PostDto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async create(@Body() body: CreatePost) {
    await this.postService.create(body);
    return 'Post created';
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postService.remove(id);
    return 'Post deleted';
  }
}
