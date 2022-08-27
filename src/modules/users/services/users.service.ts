import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import ICreateUserDTO from '../dto/ICreateUserDTO';
import User from '../entity/User';

@Injectable()
class UsersService {
  private data: Array<User>;

  constructor() {
    this.data = [];
  }

  async listAll(): Promise<Array<User>> {
    try {
      return this.data;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }

  async create({ name, email, age }: ICreateUserDTO): Promise<User> {
    try {
      const searchUsersByEmail = this.data.find(
        (user: User) => user.email === email,
      );

      if (searchUsersByEmail) {
        throw new ConflictException('Already exists user with this email');
      }

      const user = new User({ name, email, age });

      this.data.push(user);

      return user;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default UsersService;
