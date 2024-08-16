import { Module } from '@nestjs/common';
import { GenresService } from './genres.services';
import { GenresController } from './genres.controller';
import { GenreRepository } from './generes.repository';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule, GenresModule],
  controllers: [GenresController],
  providers: [GenresService, GenreRepository],
  exports: [GenresService],
})
export class GenresModule {}
