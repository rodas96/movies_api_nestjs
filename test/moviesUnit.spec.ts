import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../src/movies/movies.controller';
import { MoviesService } from '../src/movies/movies.service';
import { CreateMovieDto } from '../src/movies/dto/create-movie.dto';
import { UpdateMovieDto } from '../src/movies/dto/update-movie.dto';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue({
              data: [],
              meta: {
                totalItems: 0,
                currentPage: 1,
                totalPages: 1,
                hasNextPage: false,
              },
            }),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
            search: jest.fn().mockResolvedValue({
              data: [],
              meta: {
                totalItems: 0,
                currentPage: 1,
                totalPages: 1,
                hasNextPage: false,
              },
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a paginated list of movies', async () => {
      const result = {
        data: [
          {
            id: 1,
            title: 'Test Movie',
            description: 'Test Description',
            releaseDate: new Date('2020-01-01'),
            genres: [
              {
                id: 1,
                movieId: 1,
                genreId: 1,
                genre: {
                  id: 1,
                  name: 'Action',
                },
              },
            ],
          },
        ],
        meta: {
          totalItems: 1,
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false,
        },
      };
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single movie by id', async () => {
      const movieId = 1;
      const result = {
        id: movieId,
        title: 'Test Movie',
        description: 'Test Description',
        releaseDate: new Date('2020-01-01'),
        genres: [
          {
            id: 1,
            movieId: movieId,
            genreId: 1,
            genre: {
              id: 1,
              name: 'Action',
            },
          },
        ],
      };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(result);

      expect(await controller.findOne(movieId)).toBe(result);
    });

    it('should return null if movie is not found', async () => {
      const movieId = 999;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

      expect(await controller.findOne(movieId)).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const dto: CreateMovieDto = {
        title: 'New Movie',
        description: 'New Movie Description',
        releaseDate: '01/2020',
        genres: ['Action'],
      };
      const result = {
        id: 1,
        title: dto.title,
        description: dto.description,
        releaseDate: new Date(dto.releaseDate),
        genres: [
          {
            id: 1,
            movieId: 1,
            genreId: 1,
            genre: {
              id: 1,
              name: 'Action',
            },
          },
        ],
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(result);

      expect(await controller.create(dto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an existing movie', async () => {
      const dto: UpdateMovieDto = {
        title: 'Updated Movie',
        description: 'Updated Movie Description',
        releaseDate: '01/2021',
        genres: ['Drama'],
      };
      const movieId = 1;
      const result = {
        id: movieId,
        title: dto.title,
        description: dto.description,
        releaseDate: new Date(dto.releaseDate),
        genres: [
          {
            id: 1,
            movieId: movieId,
            genreId: 2,
            genre: {
              id: 2,
              name: 'Drama',
            },
          },
        ],
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(result);

      expect(await controller.update(movieId, dto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a movie by id', async () => {
      const movieId = 1;
      const result = {
        id: movieId,
        title: 'Removed Movie',
        description: '',
        releaseDate: new Date(),
        genres: [],
      };

      jest.spyOn(service, 'remove').mockResolvedValueOnce(result);

      expect(await controller.remove(movieId)).toBe(result);
    });
  });

  describe('search', () => {
    it('should return a paginated list of movies based on search criteria', async () => {
      const result = {
        data: [
          {
            id: 1,
            title: 'Test Movie',
            description: 'Test Description',
            releaseDate: new Date('2020-01-01'),
            genres: [
              {
                id: 1,
                movieId: 1,
                genreId: 1,
                genre: {
                  id: 1,
                  name: 'Action',
                },
              },
            ],
          },
        ],
        meta: {
          totalItems: 1,
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false,
        },
      };
      jest.spyOn(service, 'search').mockResolvedValueOnce(result);

      expect(await controller.search('Test', 'Action')).toBe(result);
    });
  });
});
