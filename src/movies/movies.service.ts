import { Injectable, BadRequestException } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async findAll() {
    return this.movieRepository.findAll();
  }

  async findOne(id: number) {
    return this.movieRepository.findOne(id);
  }

  async create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.create(createMovieDto);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: number) {
    return this.movieRepository.remove(id);
  }

  async search(title?: string, genre?: string) {
    return this.movieRepository.search(title, genre);
  }
}
