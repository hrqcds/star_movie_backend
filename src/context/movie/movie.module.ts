import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { IMovieRepository } from 'src/repositories/IMovieRepository';
import { MoviePrismaRepository } from 'src/repositories/implementations/MoviePrismaRepository';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [
    MovieService,
    PrismaService,
    { provide: IMovieRepository, useClass: MoviePrismaRepository },
  ],
})
export class MovieModule {}
