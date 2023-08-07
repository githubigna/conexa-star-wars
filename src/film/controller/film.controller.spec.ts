import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './film.controller';
import { FilmService } from '../service/film.service';

describe('FilmController', () => {
  let controller: FilmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmController],
      providers: [FilmService],
    }).compile();

    controller = module.get<FilmController>(FilmController);
  });
  it(`should be protected with JwtAuthGuard.`, async () => {
    expect(isGuarded(UsersController.prototype.findMe, JwtAuthGuard)).toBe(
      true,
    );
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
