import { Module } from '@nestjs/common';
import { FilmService } from './service/film.service';
import { FilmController } from './controller/film.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './schemas/film.schema';
import { FilmRepository } from './film.repository';
import { UserService } from 'src/user/service/user.service';
import { UserRepository } from 'src/user/user.repository';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [FilmController],
  providers: [FilmService, FilmRepository, UserService, UserRepository],
})
export class FilmModule {}
