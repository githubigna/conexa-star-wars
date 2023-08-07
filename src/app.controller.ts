import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * @description Redirects from the base URL to API DOCS.
   * @param res
   * @returns
   */
  @ApiTags('Info')
  @Get()
  redirect(@Res() res) {
    return res.redirect('/docs');
  }
}
