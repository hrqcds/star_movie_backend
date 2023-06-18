import { Controller, Post, Body } from '@nestjs/common';
import { AuthUser, CreateUserDto } from 'src/dtos/UserDto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() request: AuthUser): Promise<{
    token: string;
    id: string;
    name: string;
    email: string;
  }> {
    const result = await this.authService.signIn(request);

    return {
      token: result.token,
      id: result.id,
      name: result.name,
      email: result.email,
    };
  }

  @Post('register')
  async create(@Body() body: CreateUserDto) {
    await this.userService.create(body);
    return { message: 'User created' };
  }
}
