import {
  CreateMovie,
  CreateMovieResponse,
  QueryMovie,
  UpdateMovie,
} from 'src/dtos/MovieDto';
import { IMovieRepository } from '../IMovieRepository';
import { PrismaService } from 'src/database/prisma.service';
import { Movies } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviePrismaRepository implements IMovieRepository {
  constructor(private prisma: PrismaService) {}
  async getNotes(id: string): Promise<Movies[]> {
    return await this.prisma.movies.findMany({
      where: {
        id,
        posts: {
          some: {
            note: 0,
          },
        },
      },
    });
  }
  async updateNote(id: string, note: number): Promise<boolean> {
    const result = await this.prisma.movies.update({
      where: {
        id,
      },
      data: {
        note,
      },
    });
    return result ? true : false;
  }

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

  async list(query: QueryMovie): Promise<Movies[]> {
    return await this.prisma.movies.findMany({
      take: query.take,
      skip: query.skip * query.take,
      where: {
        title: {
          contains: query.title,
        },
        note: query.note,
        deleted_at: null,
      },
      include: {
        posts: true,
      },
    });
  }

  async count(query: QueryMovie): Promise<number> {
    return await this.prisma.movies.count({
      where: {
        title: {
          contains: query.title,
        },
        note: query.note,
        deleted_at: null,
      },
    });
  }

  async find(id: string): Promise<Movies> {
    return await this.prisma.movies.findUnique({
      where: { id },
      include: {
        posts: true,
        User: true,
      },
    });
  }
  async update(id: string, movie: UpdateMovie): Promise<boolean> {
    const result = await this.prisma.movies.update({
      where: { id },
      data: {
        title: movie.title,
        description: movie.description,
        img_url: movie.img_url,
      },
    });
    return result ? true : false;
  }
  async remove(id: string): Promise<boolean> {
    const result = await this.prisma.movies.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
    return result ? true : false;
  }
}
