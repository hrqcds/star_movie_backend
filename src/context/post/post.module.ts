import { Module } from '@nestjs/common';
import { MovieService } from '../movie/movie.service';
import { PrismaService } from 'src/database/prisma.service';
import { IMovieRepository } from 'src/repositories/IMovieRepository';
import { MoviePrismaRepository } from 'src/repositories/implementations/MoviePrismaRepository';
import { IPostRepository } from 'src/repositories/IPostRepository';
import { PostPrismaRepository } from 'src/repositories/implementations/PostPrismaRepository';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserPrismaRepository } from 'src/repositories/implementations/UserPrismaRepository';
import { IUserRepository } from 'src/repositories/IUserRepository';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    MovieService,
    PrismaService,
    { provide: IMovieRepository, useClass: MoviePrismaRepository },
    { provide: IUserRepository, useClass: UserPrismaRepository },
    { provide: IPostRepository, useClass: PostPrismaRepository },
  ],
})
export class PostModule {}
