import { Controller, Post, Body } from '@nestjs/common';
import { AuthUser } from 'src/dtos/UserDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
