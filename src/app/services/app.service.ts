import { Injectable } from '@nestjs/common';

import IResponseDefault from '../contract/IResponseDefaul';

@Injectable()
export class AppService {
  getHello(): IResponseDefault {
    return { message: 'CI/CD running on Heroku' };
  }
}
