import { HttpException, Injectable } from '@nestjs/common';
import { AuthUser } from 'src/dtos/UserDto';
import { IUserRepository } from 'src/repositories/IUserRepository';
import { ComparePassword } from 'src/utils/HashPassword';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async signIn({ email, password }: AuthUser) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const result = ComparePassword(password, user.password);

    if (!result) {
      throw new HttpException('Users or Password is Incorrect', 400);
    }

    const token = sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );

    return {
      token,
      name: user.name,
      email: user.email,
    };
  }
}
