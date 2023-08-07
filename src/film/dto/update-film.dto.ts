import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsString()
  opening_crawl: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  episode_id: number;
  @ApiProperty()
  @IsString()
  director: string;
  @ApiProperty()
  @IsString()
  producer: string;
  @ApiProperty()
  @IsString()
  release_date: string;
  @ApiProperty()
  species: string[];
  @ApiProperty()
  starships: string[];
  @ApiProperty()
  vehicles: string[];
  @ApiProperty()
  characters: string[];
  @ApiProperty()
  planets: string[];
  @IsString()
  url: string;
}
