import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from 'src/database/models/User';
import { UsersModule } from '../modules/users/users.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

ConfigModule.forRoot();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      url: `${process.env.TYPEORM_URL}`,
      entities: [User],
      synchronize: true,
      logging: true,
      ssl: true,
      pool: {
        max: 3,
        min: 1,
        idle: 10000,
      },
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
        keepAlive: true,
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
