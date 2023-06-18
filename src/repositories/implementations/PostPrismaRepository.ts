import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../IPostRepository';
import { Posts } from '@prisma/client';
import { CreatePost } from 'src/dtos/PostDto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostPrismaRepository implements IPostRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Posts> {
    return await this.prisma.posts.findUnique({
      where: {
        id,
      },
    });
  }
  async create(createPost: CreatePost): Promise<Posts> {
    return await this.prisma.posts.create({
      data: {
        title: createPost.title,
        content: createPost.content,
        user_name: createPost.user_name,
        moviesId: createPost.moviesId,
        note: createPost.note,
      },
    });
  }
  async remove(id: string): Promise<boolean> {
    const result = await this.prisma.posts.delete({
      where: {
        id,
      },
    });
    return result ? true : false;
  }
}
