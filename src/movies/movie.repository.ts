import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { parseDate } from '../utils/date.utils';

const include = {
  genres: {
    include: {
      genre: true,
    },
  },
};

@Injectable()
export class MovieRepository {
  constructor(private prisma: PrismaService) {}
  private getPaginationMeta(totalCount: number, skip: number, take: number) {
    return {
      totalItems: totalCount,
      currentPage: Math.floor(skip / take) + 1,
      totalPages: Math.ceil(totalCount / take),
      hasNextPage: skip + take < totalCount,
    };
  }

  async findAll(skip = 0, take = 10) {
    const [movies, totalCount] = await this.prisma.$transaction([
      this.prisma.movie.findMany({
        orderBy: {
          releaseDate: 'desc',
        },
        include: include,
        skip,
        take,
      }),
      this.prisma.movie.count(),
    ]);

    return {
      data: movies,
      meta: this.getPaginationMeta(totalCount, skip, take),
    };
  }

  async findOne(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: include,
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  //using transaction because creating the movie, upserting genres, and creating movie-genre relations if failed we dont get a half created movie
  async create(data: CreateMovieDto) {
    const movie = await this.prisma.$transaction(async (prisma) => {
      const createdMovie = await prisma.movie.create({
        data: {
          title: data.title,
          description: data.description,
          releaseDate: parseDate(data.releaseDate),
        },
      });

      await Promise.all(
        data.genres.map(async (genreName) => {
          const genre = await prisma.genre.upsert({
            where: { name: genreName },
            update: {},
            create: { name: genreName },
          });

          await prisma.movieGenre.create({
            data: {
              movieId: createdMovie.id,
              genreId: genre.id,
            },
          });
        }),
      );

      return createdMovie;
    });
    return this.findOne(movie.id);
  }

  async update(id: number, data: UpdateMovieDto) {
    const movie = await this.prisma.$transaction(async (prisma) => {
      const updatedMovie = await prisma.movie.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          releaseDate: parseDate(data.releaseDate),
        },
      });

      await prisma.movieGenre.deleteMany({
        where: { movieId: id },
      });

      if (data.genres) {
        await Promise.all(
          data.genres.map(async (genreName) => {
            const genre = await prisma.genre.upsert({
              where: { name: genreName },
              update: {},
              create: { name: genreName },
            });

            await prisma.movieGenre.create({
              data: {
                movieId: updatedMovie.id,
                genreId: genre.id,
              },
            });
          }),
        );
      }

      return updatedMovie;
    });
    return this.findOne(movie.id);
  }

  async remove(id: number) {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.movieGenre.deleteMany({
        where: { movieId: id },
      });
      return prisma.movie.delete({
        where: { id },
      });
    });
  }

  async search(title?: string, genre?: string, skip = 0, take = 10) {
    const [movies, totalCount] = await this.prisma.$transaction([
      this.prisma.movie.findMany({
        where: {
          AND: [
            title ? { title: { contains: title } } : {},
            genre
              ? { genres: { some: { genre: { name: { equals: genre } } } } }
              : {},
          ],
        },
        orderBy: {
          releaseDate: 'desc',
        },
        include: include,
        skip,
        take,
      }),
      this.prisma.movie.count({
        where: {
          AND: [
            title ? { title: { contains: title } } : {},
            genre
              ? { genres: { some: { genre: { name: { equals: genre } } } } }
              : {},
          ],
        },
      }),
    ]);
    return {
      data: movies,
      meta: this.getPaginationMeta(totalCount, skip, take),
    };
  }
}
