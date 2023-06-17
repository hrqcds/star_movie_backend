import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto, QueryUser } from 'src/dtos/UserDto';
import { DataResponse } from 'src/generics/DataResponse';
import {
  CreateUserResponse,
  IUserRepository,
  ListUserResponse,
} from 'src/repositories/IUserRepository';

@Injectable()
export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async create({
    name,
    email,
    password,
  }: CreateUserDto): Promise<CreateUserResponse> {
    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.create({ name, email, password });
  }

  async list(query: QueryUser): Promise<DataResponse<ListUserResponse>> {
    const result = await this.userRepository.list(query);
    const total = await this.userRepository.count(query);
    return new DataResponse<ListUserResponse>(result, total);
  }

  async find(id: string): Promise<User> {
    const result = await this.userRepository.find(id);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async update(
    id: string,
    { name, email, password }: CreateUserDto,
  ): Promise<boolean> {
    const userExist = await this.userRepository.find(id);

    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const emailExist = await this.userRepository.findByEmail(email);
    if (emailExist && emailExist.id !== id) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const result = await this.userRepository.update(id, {
      name,
      email,
      password,
    });

    if (!result) {
      throw new HttpException('Error updating user', HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async remove(id: string): Promise<boolean> {
    const userExist = await this.userRepository.find(id);

    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.userRepository.remove(id);
    if (!result) {
      throw new HttpException('Error removing user', HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
