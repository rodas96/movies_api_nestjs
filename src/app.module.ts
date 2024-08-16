import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './utils/prisma.exceptions';

@Module({
  imports: [MoviesModule, GenresModule],
  controllers: [], //should reconize the controllers from the imported modules check later
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
