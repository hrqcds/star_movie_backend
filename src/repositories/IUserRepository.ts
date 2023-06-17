import { User } from '@prisma/client';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from 'src/dtos/UserDto';

export abstract class IUserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<CreateUserResponse>;
  abstract list(query: QueryUserDto): Promise<ListUserResponse[]>;
  abstract find(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<boolean>;
  abstract remove(id: string): Promise<boolean>;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
}

export interface ListUserResponse {
  id: string;
  name: string;
  email: string;
}
