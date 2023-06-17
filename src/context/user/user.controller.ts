import { Body, Controller, Post, Get, Put } from '@nestjs/common';
import { CreateUserDto, QueryUser } from 'src/dtos/UserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list(query: QueryUser) {
    return await this.userService.list(query);
  }

  @Get(':id')
  async find(id: string) {
    return await this.userService.find(id);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<string> {
    await this.userService.create(body);
    return 'User created';
  }

  @Put(':id')
  async update(@Body() body: CreateUserDto, id: string): Promise<string> {
    await this.userService.update(id, body);
    return 'User updated';
  }
}
