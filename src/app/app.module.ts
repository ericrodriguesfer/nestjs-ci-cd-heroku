import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '../modules/users/users.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

ConfigModule.forRoot();
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
