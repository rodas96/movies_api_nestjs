import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieRepository } from './movie.repository';
import { PrismaModule } from '../database/prisma.module';
import { GenresModule } from '../genres/genres.module';

@Module({
  imports: [PrismaModule, GenresModule],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRepository],
})
export class MoviesModule {}
