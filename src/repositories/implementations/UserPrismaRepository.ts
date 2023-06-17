import { User } from '@prisma/client';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from 'src/dtos/UserDto';
import { IUserRepository } from '../IUserRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create({ name, email, password }: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
  list(query: QueryUserDto): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  find(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
