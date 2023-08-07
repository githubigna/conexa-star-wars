import { Module } from '@nestjs/common';
import { SwapiService } from './service/swapi.service';
import { HttpModule } from '@nestjs/axios';
import { SwapiController } from './controller/swapi.controller';

@Module({
  imports: [HttpModule],
  providers: [SwapiService],
  controllers: [SwapiController],
})
export class SwapiModule {}
