import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map, pipe } from 'rxjs';
import { Film } from 'src/film/schemas/film.schema';

@Injectable()
export class SwapiService {
  constructor(private readonly httpService: HttpService) {}
  async getFilmList(): Promise<any> {
    return this.httpService
      .get(process.env.SWAPI_BASE_URL + '/films/')
      .pipe(map((response) => response.data));
  }
}
