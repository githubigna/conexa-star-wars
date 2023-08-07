import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map, pipe } from 'rxjs';
import { Film } from 'src/film/schemas/film.schema';

@Injectable()
export class SwapiService {
  constructor(private readonly httpService: HttpService) {}
  async getFilmList(): Promise<any> {
    try {
      return await this.httpService
        .get(process.env.SWAPI_BASE_URL + '/films/')
        .pipe(map((response) => response.data));
    } catch (error) {
      throw new Error('SWAPI API connection failed');
    }
  }
}
