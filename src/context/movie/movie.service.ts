import { HttpException, Injectable } from '@nestjs/common';
import { CreateMovieRequest, CreateMovieResponse } from 'src/dtos/MovieDto';
import { IMovieRepository } from 'src/repositories/IMovieRepository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: IMovieRepository) {}

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

    return await this.movieRepository.create({
      title: createMovie.title,
      userId: createMovie.userId,
      note: Number(createMovie.note),
      img_url: new Date().toISOString() + file.originalname,
      description: createMovie.description,
    });
  }
}
