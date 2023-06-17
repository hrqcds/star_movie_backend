import { User } from '@prisma/client';
import { CreateUserDto, QueryUser, UpdateUser } from 'src/dtos/UserDto';
import {
  CreateUserResponse,
  IUserRepository,
  ListUserResponse,
} from '../IUserRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    name,
    email,
    password,
  }: CreateUserDto): Promise<CreateUserResponse> {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
  async list(query: QueryUser): Promise<ListUserResponse[]> {
    return await this.prisma.user.findMany({
      take: query.take,
      skip: query.skip * query.take,
      where: {
        name: {
          contains: query.name,
        },
        email: {
          contains: query.email,
        },
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
  async count(query: QueryUser): Promise<number> {
    return await this.prisma.user.count({
      where: {
        name: {
          contains: query.name,
        },
        email: {
          contains: query.email,
        },
        deleted_at: null,
      },
    });
  }
  async find(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUser): Promise<boolean> {
    const result = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password,
      },
    });
    return result ? true : false;
  }
  async remove(id: string): Promise<boolean> {
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return result ? true : false;
  }
}
