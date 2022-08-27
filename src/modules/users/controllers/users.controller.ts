import { Body, Controller, Get, Post } from '@nestjs/common';
import ICreateUserDTO from '../dto/ICreateUserDTO';
import User from '../entity/User';
import UsersService from '../services/users.service';

@Controller('users')
class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async listAll(): Promise<Array<User>> {
    return await this.usersService.listAll();
  }

  @Post()
  async create(@Body() { name, email, age }: ICreateUserDTO): Promise<User> {
    return await this.usersService.create({ name, email, age });
  }
}

export default UsersController;
