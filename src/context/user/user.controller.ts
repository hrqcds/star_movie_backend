import { Body, Controller, Get, Put, Query, Param } from '@nestjs/common';
import { QueryUser, UpdateUser } from 'src/dtos/UserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list(@Query() query: QueryUser) {
    return await this.userService.list(query);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.userService.find(id);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUser,
  ): Promise<string> {
    await this.userService.update(id, body);
    return 'User updated';
  }

  @Put('/remove/:id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return 'User removed';
  }
}
