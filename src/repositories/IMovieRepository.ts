import { Movies } from '@prisma/client';
import {
  CreateMovie,
  CreateMovieResponse,
  QueryMovie,
  UpdateMovie,
} from 'src/dtos/MovieDto';

export abstract class IMovieRepository {
  abstract create(createMovie: CreateMovie): Promise<CreateMovieResponse>;
  abstract list(query: QueryMovie): Promise<Movies[]>;
  abstract find(id: string): Promise<Movies>;
  abstract findByTitle(title: string): Promise<Movies>;
  abstract getNotes(id: string): Promise<Movies[]>;
  abstract updateNote(id: string, note: number): Promise<boolean>;
  abstract update(id: string, movie: UpdateMovie): Promise<boolean>;
  abstract remove(id: string): Promise<boolean>;
  abstract count(query: QueryMovie): Promise<number>;
}
