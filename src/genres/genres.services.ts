import { Injectable, NotFoundException } from '@nestjs/common';
import { GenreRepository } from './generes.repository';
import { CreateGenreDto } from './create-genre.dto';

@Injectable()
export class GenresService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async findAll() {
    return this.genreRepository.findAll();
  }

  async create(createGenreDto: CreateGenreDto) {
    console.log('here');
    return this.genreRepository.create(createGenreDto);
  }
  async upsert(name: string) {
    return this.genreRepository.upsertGenre(name);
  }

  async remove(name: string) {
    const genre = await this.genreRepository.findByName(name);
    if (!genre) {
      throw new NotFoundException(`Genre with name '${name}' not found.`);
    }

    // Remove the genre from all movies first
    await this.genreRepository.removeGenreFromMovies(genre.id);

    // Then delete the genre itself
    return this.genreRepository.delete(genre.id);
  }
}
