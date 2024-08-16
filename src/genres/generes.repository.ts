import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateGenreDto } from './create-genre.dto';
import { Movie } from '.prisma/client'; // Correct import for Movie type

@Injectable()
export class GenreRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.genre.findMany();
  }

  async findByName(name: string) {
    return this.prisma.genre.findUnique({
      where: { name },
    });
  }

  async create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({
      data: {
        name: createGenreDto.name,
      },
    });
  }

  async upsertGenre(genreName: string) {
    return this.prisma.genre.upsert({
      where: { name: genreName },
      update: {},
      create: { name: genreName },
    });
  }

  async delete(genreId: number) {
    return this.prisma.genre.delete({
      where: { id: genreId },
    });
  }

  async removeGenreFromMovies(genreId: number) {
    const movieGenres = await this.prisma.movieGenre.findMany({
      where: { genreId },
    });

    await Promise.all(
      movieGenres.map((movieGenre) =>
        this.prisma.movieGenre.delete({
          where: { id: movieGenre.id },
        }),
      ),
    );
  }
}
