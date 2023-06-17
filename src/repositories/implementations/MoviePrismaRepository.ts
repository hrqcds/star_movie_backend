import { CreateMovie, CreateMovieResponse } from 'src/dtos/MovieDto';
import { IMovieRepository } from '../IMovieRepository';
import { PrismaService } from 'src/database/prisma.service';
import { Movies } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviePrismaRepository implements IMovieRepository {
  constructor(private prisma: PrismaService) {}

  async create(createMovie: CreateMovie): Promise<CreateMovieResponse> {
    return await this.prisma.movies.create({
      data: {
        title: createMovie.title,
        userId: createMovie.userId,
        note: createMovie.note,
        img_url: createMovie.img_url,
        description: createMovie.description,
      },
      select: {
        id: true,
        title: true,
        description: true,
        note: true,
        img_url: true,
      },
    });
  }
  async findByTitle(title: string): Promise<Movies> {
    return await this.prisma.movies.findUnique({
      where: {
        title,
      },
    });
  }
}
