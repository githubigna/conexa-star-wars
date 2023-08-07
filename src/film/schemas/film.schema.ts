import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  @ApiProperty()
  @Prop()
  filmId: string;
  @ApiProperty()
  @Prop({ default: 'title' })
  title: string;
  @ApiProperty()
  @Prop({ default: 0 })
  episode_id: number;
  @Prop({ default: 'Crawl' })
  @ApiProperty()
  opening_crawl: string;
  @Prop({ default: 'Director' })
  @ApiProperty()
  director: string;
  @Prop({ default: 'Producer' })
  @ApiProperty()
  producer: string;
  @Prop({ default: '01/01/1900' })
  @ApiProperty()
  release_date: string;
  @Prop({ default: [] })
  @ApiProperty()
  species: string[];
  @Prop({ default: [] })
  @ApiProperty()
  starships: string[];
  @Prop({ default: [] })
  @ApiProperty()
  vehicles: string[];
  @Prop({ default: [] })
  @ApiProperty()
  characters: string[];
  @Prop({ default: [] })
  @ApiProperty()
  planets: string[];
  @Prop({ default: 'No url' })
  @ApiProperty()
  url: string;
  @Prop({ default: Date.now })
  @ApiProperty()
  created: number;
  @Prop({ default: 0o0 })
  @ApiProperty()
  edited: number;
}
export const FilmSchema = SchemaFactory.createForClass(Film);
