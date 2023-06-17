import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/UserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<string> {
    await this.userService.create(body);
    return 'User created';
  }
}
