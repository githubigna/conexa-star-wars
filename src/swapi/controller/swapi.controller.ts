import { Controller, Get } from '@nestjs/common';
import { SwapiService } from '../service/swapi.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('swapi')
export class SwapiController {
  constructor(private readonly swapiService: SwapiService) {}
  @ApiTags('swapi')
  @Get('get/')
  getFilms() {
    return this.swapiService.getFilmList();
  }
}
