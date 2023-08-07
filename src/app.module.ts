import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmModule } from './film/film.module';
import { SwapiService } from './swapi/service/swapi.service';
import { SwapiModule } from './swapi/swapi.module';
ConfigModule.forRoot();
process.env.DB_URI;
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://' +
        process.env.DB_USER +
        ':' +
        process.env.DB_PASS +
        '@' +
        process.env.DB_CLUSTER +
        '.t0lf35q.mongodb.net/?' +
        process.env.DB_SETTINGS,
    ),
    FilmModule,
    SwapiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
