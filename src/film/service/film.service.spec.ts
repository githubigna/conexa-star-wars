import { Test, TestingModule } from '@nestjs/testing';
import { FilmService } from './film.service';
import { FilmRepository } from '../film.repository';

describe('FilmService', () => {
  let service: FilmService;
  let filmRepository: FilmRepository;
  const mockUpfilmRepository = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmService, FilmRepository],
    })
      .overrideProvider(FilmRepository)
      .useValue(mockUpfilmRepository)
      .compile();

    service = module.get<FilmService>(FilmService);
    filmRepository = module.get<FilmRepository>(FilmRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('filmRepository should be defined', () => {
    expect(filmRepository).toBeDefined();
  });
});
