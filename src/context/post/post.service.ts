import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from '@prisma/client';
import { CreatePost } from 'src/dtos/PostDto';
import { IMovieRepository } from 'src/repositories/IMovieRepository';
import { IPostRepository } from 'src/repositories/IPostRepository';

@Injectable()
export class PostService {
  constructor(
    private postRepository: IPostRepository,
    private movieRepository: IMovieRepository,
  ) {}

  async create(createPost: CreatePost): Promise<Posts> {
    const movie = await this.movieRepository.find(createPost.moviesId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const result = await this.postRepository.create(createPost);

    const posts = await this.movieRepository.getNotes(createPost.moviesId);

    if (posts.length > 0) {
      const notes = posts.map((post) => post.note);
      const note = notes.reduce((a, b) => a + b) / notes.length;
      await this.movieRepository.updateNote(createPost.moviesId, note);
    }

    return result;
  }

  async remove(id: string): Promise<boolean> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return await this.postRepository.remove(id);
  }
}
