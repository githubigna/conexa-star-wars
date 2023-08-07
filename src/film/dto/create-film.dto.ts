import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateFilmDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Title of the movie',
    example: 'Movie Title',
  })
  title: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Opening crawl of the movie',
    example: 'Once upon a time...',
  })
  opening_crawl: string;
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Episode number',
    example: 0,
  })
  episode_id: number;
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Movie director',
    example: 'Ignacio Garate',
  })
  director: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Movie producer',
    example: 'Ignacio Garate',
  })
  producer: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Movie release date',
    example: '01/01/1900',
  })
  release_date: string;
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description:
      'Array of links to the SWAPI DDBB of the species starring in the movie',
    example: ['https://swapi.dev/api/species/1/'],
  })
  species: string[];
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description:
      'Array of links to the SWAPI DDBB of the starships starring in the movie',
    example: ['https://swapi.dev/api/starships/1/'],
  })
  starships: string[];
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description:
      'Array of links to the SWAPI DDBB of the vehicles starring in the movie',
    example: ['https://swapi.dev/api/vehicles/1/'],
  })
  vehicles: string[];
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description:
      'Array of links to the SWAPI DDBB of the character starring in the movie',
    example: ['https://swapi.dev/api/characters/1/'],
  })
  characters: string[];
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description:
      'Array of links to the SWAPI DDBB of the planets starring in the movie',
    example: ['https://swapi.dev/api/planets/1/'],
  })
  planets: string[];
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Link to the SWAPI DDBB of the  movie',
    example: 'https://swapi.dev/api/films/1/',
  })
  url: string;
}
