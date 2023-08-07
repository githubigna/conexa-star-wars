import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { SwapiService } from './swapi.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('SwapiService', () => {
  let swapiService: SwapiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwapiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    swapiService = module.get<SwapiService>(SwapiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(swapiService).toBeDefined();
  });

  describe('getFilmList', () => {
    it('should return an array of films', async () => {
      const mockFilmData = {
        data: [
          { title: 'Film 1', episode_id: 1 },
          { title: 'Film 2', episode_id: 2 },
        ],
      };

      const mockAxiosResponse = {
        data: mockFilmData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      httpService.get = jest.fn().mockReturnValue(of(mockAxiosResponse));

      const result = await swapiService.getFilmList();

      expect(result).toEqual(mockFilmData.data);
    });

    it('should handle errors', async () => {
      const mockAxiosResponse = {
        data: {},
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: {},
      };

      httpService.get = jest.fn().mockReturnValue(of(mockAxiosResponse));

      await expect(swapiService.getFilmList()).rejects.toThrowError();
    });
  });
});
