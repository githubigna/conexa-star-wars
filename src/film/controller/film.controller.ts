import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilmService } from '../service/film.service';
import { CreateFilmDto } from '../dto/create-film.dto';
import { UpdateFilmDto } from '../dto/update-film.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/user/jwt/guards/jwt-auth.guard';
import { Roles } from 'src/user/jwt/guards/roles.guard';
import { RoleAccess } from 'src/user/jwt/decorator/role.decorator';
import { PublicAccess } from 'src/user/jwt/decorator/public.decorator';
@ApiTags('Film')
@UseGuards(RolesGuard, Roles)
@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}
  @ApiBearerAuth()
  @ApiBody({
    type: CreateFilmDto,
    description: 'Film creation data',
  })
  @RoleAccess('Administrador')
  @Post('post/')
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.create(createFilmDto);
  }
  @PublicAccess()
  @Get('get/')
  findAll() {
    return this.filmService.findAll({});
  }
  @ApiBearerAuth()
  @ApiParam({ name: 'filmId', description: 'filmId', required: true })
  @RoleAccess('Usuario Regular')
  @Get('get/:filmId')
  findOne(@Param('filmId') id: string) {
    return this.filmService.findOne(id);
  }
  @ApiBearerAuth()
  @ApiParam({ name: 'filmId', description: 'filmId', required: true })
  @ApiBody({
    type: UpdateFilmDto,
    description: 'Film update data',
  })
  @RoleAccess('Administrador')
  @Patch('put/:filmId')
  update(@Param('filmId') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.update(id, updateFilmDto);
  }
  @ApiBearerAuth()
  @ApiParam({ name: 'filmId', description: 'filmId', required: true })
  @RoleAccess('Administrador')
  @Delete(':filmId')
  remove(@Param('filmId') id: string) {
    return this.filmService.remove(id);
  }
}
