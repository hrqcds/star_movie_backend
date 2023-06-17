import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/UserDto';
import { IUserRepository } from 'src/repositories/IUserRepository';

@Injectable()
export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async create({ name, email, password }: CreateUserDto): Promise<string> {
    await this.userRepository.create({ name, email, password });
    return 'User created';
  }
}
