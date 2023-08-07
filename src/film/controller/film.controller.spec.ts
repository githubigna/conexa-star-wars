import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './film.controller';
import { FilmService } from '../service/film.service';
import { CreateFilmDto } from '../dto/create-film.dto';
import { UpdateFilmDto } from '../dto/update-film.dto';
import { RoleAccess } from '../../user/jwt/decorator/role.decorator';
import { PublicAccess } from '../../user/jwt/decorator/public.decorator';
import { ExecutionContext } from '@nestjs/common';
import { RolesGuard } from '../../user/jwt/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

describe('FilmController', () => {
  let filmController: FilmController;
  let filmService: Partial<FilmService>; // Partial<FilmService> to mock methods
  class MockRolesGuard {
    canActivate(context: ExecutionContext): boolean {
      return true; // Mocked behavior, always allowing access
    }
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmController],
      providers: [
        {
          provide: FilmService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        Reflector, // Provide the Reflector
      ],
    })
      .overrideGuard(RolesGuard) // Override the RolesGuard with a mock
      .useValue(new MockRolesGuard())
      .compile();

    filmController = module.get<FilmController>(FilmController);
    filmService = module.get<FilmService>(FilmService);
  });

  describe('create', () => {
    it('should create a new film', async () => {
      const createFilmDto: CreateFilmDto = {
        title: 'title',
        opening_crawl: 'crawl',
        episode_id: 0,
        director: 'director',
        producer: 'producer',
        release_date: '01/01/1900',
        species: ['', ''],
        starships: ['', ''],
        planets: ['', ''],
        vehicles: ['', ''],
        characters: ['', ''],
        url: 'url.com',
      };

      const expectedResult = {
        title: 'title',
        opening_crawl: 'crawl',
        episode_id: 0,
        director: 'director',
        producer: 'producer',
        release_date: '01/01/1900',
        species: ['', ''],
        starships: ['', ''],
        planets: ['', ''],
        vehicles: ['', ''],
        characters: ['', ''],
        url: 'url.com',
      }; // Define the expected result from the service

      (filmService.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await filmController.create(createFilmDto);

      expect(result).toBe(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const expectedResult = [
        {
          title: 'title',
          opening_crawl: 'crawl',
          episode_id: 0,
          director: 'director',
          producer: 'producer',
          release_date: '01/01/1900',
          species: ['', ''],
          starships: ['', ''],
          planets: ['', ''],
          vehicles: ['', ''],
          characters: ['', ''],
          url: 'url.com',
        },
        {
          title: 'title',
          opening_crawl: 'crawl',
          episode_id: 0,
          director: 'director',
          producer: 'producer',
          release_date: '01/01/1900',
          species: ['', ''],
          starships: ['', ''],
          planets: ['', ''],
          vehicles: ['', ''],
          characters: ['', ''],
          url: 'url.com',
        },
      ]; // Define the expected result from the service

      (filmService.findAll as jest.Mock).mockResolvedValue(expectedResult);

      const result = await filmController.findAll();

      expect(result).toBe(expectedResult);
    });
  });

  // Add similar tests for other methods (findOne, update, remove) using the same pattern
});
