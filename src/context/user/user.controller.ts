import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto, QueryUserDto } from 'src/dtos/UserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list(query: QueryUserDto) {
    return await this.userService.list(query);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<string> {
    await this.userService.create(body);
    return 'User created';
  }
}
