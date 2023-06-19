import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthUser, CreateUserDto } from 'src/dtos/UserDto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() request: AuthUser, @Res() res: Response) {
    const result = await this.authService.signIn(request);
    return res.status(200).json({
      token: result.token,
      id: result.id,
      name: result.name,
      email: result.email,
    });
  }

  @Post('register')
  async create(@Body() body: CreateUserDto) {
    await this.userService.create(body);
    return { message: 'User created' };
  }
}
