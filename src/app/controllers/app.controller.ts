import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

import IResponseDefault from '../contract/IResponseDefaul';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IResponseDefault {
    return this.appService.getHello();
  }
}
