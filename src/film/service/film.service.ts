import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from '../dto/create-film.dto';
import { UpdateFilmDto } from '../dto/update-film.dto';
import { Film } from '../schemas/film.schema';
import { FilmRepository } from '../film.repository';
import { uuid } from 'uuidv4';

@Injectable()
export class FilmService {
  constructor(private readonly filmRepository: FilmRepository) {}
  /**
   * @description Funcion que crea nueva pelicula.
   * @param filmData CreateFilmDto - informacion brindada para la creacion de pelicula.
   * @returns informacion de la pelicula creada.
   */
  create(filmData: CreateFilmDto): Promise<Film> {
    return this.filmRepository.create({
      filmId: uuid(),
      created: Date.now(),
      edited: 0o0,
      ...filmData,
    });
  }
  /**
   * @description Funcion que consulta y trae el listado de peliculas
   * @param param0 - none
   * @returns Listado de peliculas
   */
  async findAll({}): Promise<string[]> {
    const movies: Film[] = await this.filmRepository.find({});
    const movieTitles: string[] = movies.map((movie) => movie.title);
    return movieTitles;
  }
  /**
   * @description Funcion que busca una pelicula por su filmId y la devuelve con sus detalles.
   * @param filmId string
   * @returns La pelicula consultada.
   */
  findOne(filmId: string): Promise<Film> {
    return this.filmRepository.findOne({ filmId });
  }
  /**
   * @description Funcion que busca una pelicula por filmId y la modifica.
   * @param filmId String.
   * @param updateFilmDto UpdateFilmDto - Informacion a modificar.
   * @returns La pelicula que fue modificada.
   */
  update(filmId: string, updateFilmDto: UpdateFilmDto): Promise<Film> {
    return this.filmRepository.findOneAndUpdate(
      { filmId },
      { edited: Date.now(), ...updateFilmDto },
    );
  }
  /**
   * @description Funcion que busca una pelicula y la elimina.
   * @param filmId String.
   * @returns La pelicula que fue eliminada.
   */
  remove(filmId: string): Promise<Film> {
    return this.filmRepository.findOneAndDelete({ filmId });
  }
}
