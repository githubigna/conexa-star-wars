import { Test, TestingModule } from '@nestjs/testing';
import { SwapiController } from './swapi.controller';
import { SwapiService } from '../service/swapi.service';
import { HttpModule } from '@nestjs/axios';

describe('SwapiController', () => {
  let controller: SwapiController;
  let swapiService: SwapiService;

  const newMockSwapiService = {
    getFilmList: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwapiController],
      providers: [SwapiService],
      imports: [HttpModule],
    })
      .overrideProvider(SwapiService)
      .useValue(newMockSwapiService)
      .compile();

    controller = module.get<SwapiController>(SwapiController);
    swapiService = module.get<SwapiService>(SwapiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call SwapiService.getFilmList() when getFilms() is called', async () => {
    const filmList = [{ title: 'Film 1', episode_id: 1 }];

    jest.spyOn(swapiService, 'getFilmList').mockResolvedValue(filmList);

    const result = await controller.getFilms();

    expect(result).toEqual(filmList);
  });
});
