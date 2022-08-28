import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import User from 'src/database/models/User';
import ICreateUserDTO from '../dto/ICreateUserDTO';
import IResponseSoftDelete from '../dto/IResponseSoftDelete';
import UsersService from '../services/users.service';

@Controller('users')
class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async listAll(): Promise<Array<User>> {
    return await this.usersService.listAll();
  }

  @Get(':id')
  async listById(@Param('id') id: string): Promise<User> {
    return await this.usersService.listById(id);
  }

  @Get('name/:name')
  async listByName(@Param('name') name: string): Promise<Array<User>> {
    return await this.usersService.listByName(name);
  }

  @Post()
  async create(@Body() { name, email, age }: ICreateUserDTO): Promise<User> {
    return await this.usersService.create({ name, email, age });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() { name, email, age }: ICreateUserDTO,
  ): Promise<User> {
    return await this.usersService.update({ id, data: { name, email, age } });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IResponseSoftDelete> {
    return await this.usersService.delete(id);
  }
}

export default UsersController;
