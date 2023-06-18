import { Posts } from '@prisma/client';
import { CreatePost } from 'src/dtos/PostDto';

export abstract class IPostRepository {
  abstract create(createPost: CreatePost): Promise<Posts>;
  abstract findById(id: string): Promise<Posts>;
  abstract remove(id: string): Promise<boolean>;
}
