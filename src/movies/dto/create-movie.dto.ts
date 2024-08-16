import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
  Matches,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(50, { message: 'Title must be shorter than 50 characters' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(15, { message: 'Description must be at least 15 characters long' })
  @MaxLength(500, {
    message: 'Description must be shorter than 500 characters',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[1-9]|1[0-2])[-\/]\d{4}$/, {
    message: 'releaseDate must be in the format MM/yyyy or MM-yyyy',
  })
  releaseDate: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @MinLength(3, {
    each: true,
    message: 'Genre must be at least 3 characters long',
  })
  @MaxLength(9, {
    each: true,
    message: 'Genre must be shorter than 9 characters',
  })
  genres: string[];
}
