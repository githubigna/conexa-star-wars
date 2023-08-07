import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class FilmRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}
  async findOne(filmFilterQuery: FilterQuery<Film>): Promise<Film> {
    return this.filmModel.findOne(filmFilterQuery);
  }
  async find(filmFilterQuery: FilterQuery<Film>): Promise<Film[]> {
    return this.filmModel.find(filmFilterQuery);
  }
  async create(film: Film): Promise<Film> {
    const newFilm = new this.filmModel(film);
    return newFilm.save();
  }
  async findOneAndUpdate(
    filmFilterQuery: FilterQuery<Film>,
    film: Partial<Film>,
  ): Promise<Film> {
    return this.filmModel.findOneAndUpdate(filmFilterQuery, film);
  }
  async deleteById(filmId: string): Promise<Film> {
    return await this.filmModel.findByIdAndDelete(filmId);
  }
  async findOneAndDelete(filmFilterQuery: FilterQuery<Film>): Promise<Film> {
    return await this.filmModel.findOneAndDelete(filmFilterQuery);
  }
}
