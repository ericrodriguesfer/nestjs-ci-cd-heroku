import { Controller, Get } from '@nestjs/common';

import IResponseDefault from '../contract/IResponseDefaul';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IResponseDefault {
    return this.appService.getHello();
  }
}
