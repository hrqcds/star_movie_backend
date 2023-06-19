import { HttpException, Injectable } from '@nestjs/common';
import { Movies } from '@prisma/client';
import {
  CreateMovieRequest,
  CreateMovieResponse,
  QueryMovie,
  UpdateMovie,
} from 'src/dtos/MovieDto';
import { DataResponse } from 'src/generics/DataResponse';
import { IMovieRepository } from 'src/repositories/IMovieRepository';
import { IUserRepository } from 'src/repositories/IUserRepository';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: IMovieRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async create(
    createMovie: CreateMovieRequest,
    file: Express.Multer.File,
  ): Promise<CreateMovieResponse> {
    const movieTitleExist = await this.movieRepository.findByTitle(
      createMovie.title,
    );

    if (movieTitleExist)
      throw new HttpException('Movie title already exists', 400);

    if (file === undefined) throw new HttpException('File is required', 400);

    const userExist = await this.userRepository.find(createMovie.userId);

    if (!userExist) throw new HttpException('User not found', 404);

    return await this.movieRepository.create({
      title: createMovie.title,
      userId: createMovie.userId,
      note: Number(createMovie.note),
      img_url: process.env.IMG_URL + process.env.PORT + '/' + file.filename,
      description: createMovie.description,
    });
  }

  async list(query: QueryMovie): Promise<DataResponse<Movies>> {
    query.skip = Number(query.skip);
    query.take = Number(query.take);
    const result = await this.movieRepository.list(query);
    const total = await this.movieRepository.count(query);
    return new DataResponse<Movies>(result, total);
  }

  async find(id: string): Promise<Movies> {
    const result = await this.movieRepository.find(id);
    if (!result) throw new HttpException('Movie not found', 404);
    return result;
  }

  async remove(id: string): Promise<boolean> {
    const movieExist = await this.movieRepository.find(id);

    if (!movieExist) throw new HttpException('Movie not found', 404);

    return await this.movieRepository.remove(id);
  }

  async update(
    id: string,
    movie: UpdateMovie,
    file?: Express.Multer.File,
  ): Promise<boolean> {
    const movieExist = await this.movieRepository.find(id);

    if (!movieExist) throw new HttpException('Movie not found', 404);

    if (movie.title) {
      const movieTitleExist = await this.movieRepository.findByTitle(
        movie.title,
      );
      if (movieTitleExist && movieTitleExist.id !== id)
        throw new HttpException('Movie title already exists', 400);
    }

    if (file === undefined) {
      return await this.movieRepository.update(id, {
        title: movie.title,
        description: movie.description,
      });
    }

    return await this.movieRepository.update(id, {
      title: movie.title,
      description: movie.description,
      img_url: process.env.IMG_URL + process.env.PORT + '/' + file.filename,
    });
  }
}
