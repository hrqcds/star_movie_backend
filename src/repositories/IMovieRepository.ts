import { Movies } from '@prisma/client';
import { CreateMovie, CreateMovieResponse } from 'src/dtos/MovieDto';

export abstract class IMovieRepository {
  abstract create(createMovie: CreateMovie): Promise<CreateMovieResponse>;
  abstract findByTitle(title: string): Promise<Movies>;
}
