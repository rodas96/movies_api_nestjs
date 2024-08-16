import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GenresService } from './genres.services';
import { CreateGenreDto } from './create-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.genresService.remove(name);
  }
}
