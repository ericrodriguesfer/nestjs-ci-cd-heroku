import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';

import User from 'src/database/models/User';
import ICreateUserDTO from '../dto/ICreateUserDTO';
import IResponseSoftDelete from '../dto/IResponseSoftDelete';
import IUpdateUserDTO from '../dto/IUpdateUserDTO';

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async listAll(): Promise<Array<User>> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }

  async listById(id: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne(id);

      if (!user) {
        throw new NotFoundException(
          'This user does not exists in our database',
        );
      }

      return user;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }

  async listByName(name: string): Promise<Array<User>> {
    try {
      const users: Array<User> = await this.userRepository.find({
        where: { name: Like(`%${name}%`) },
      });

      return users;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }

  async create({ name, email, age }: ICreateUserDTO): Promise<User> {
    try {
      const searchUsersByEmail: User = await this.userRepository.findOne({
        where: { email },
      });

      if (searchUsersByEmail) {
        throw new ConflictException('Already exists user with this email');
      }

      const user: User = await this.userRepository.save(
        this.userRepository.create({ name, email, age }),
      );

      return user;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }

  async update({
    id,
    data: { name, email, age },
  }: IUpdateUserDTO): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(
          'This user does not exists in our database',
        );
      }

      const userExistsByEmail: User = await this.userRepository.findOne({
        where: { email },
      });

      if (userExistsByEmail && userExistsByEmail.id !== user.id) {
        throw new ConflictException(
          'This email already in usage for other user',
        );
      }

      const updatedUser: User = await this.userRepository.save(
        this.userRepository.merge(user, { name, email, age }),
      );

      return updatedUser;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }

  async delete(id: string): Promise<IResponseSoftDelete> {
    try {
      const user: User = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(
          'This user does not exists in our database',
        );
      }

      const userDeleted: UpdateResult = await this.userRepository.softDelete(
        user.id,
      );

      return userDeleted.affected === 1
        ? { message: 'User deleted with success' }
        : { message: 'Fail in delete user' };
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default UsersService;
