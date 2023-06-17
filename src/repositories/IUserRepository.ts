import { User } from '@prisma/client';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from 'src/dtos/UserDto';

export abstract class IUserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract list(query: QueryUserDto): Promise<User[]>;
  abstract find(id: string): Promise<User>;
  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<boolean>;
  abstract remove(id: string): Promise<boolean>;
}
