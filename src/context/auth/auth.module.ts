import { Module } from '@nestjs/common';

import { IUserRepository } from 'src/repositories/IUserRepository';
import { UserPrismaRepository } from 'src/repositories/implementations/UserPrismaRepository';
import { PrismaService } from 'src/database/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    { provide: IUserRepository, useClass: UserPrismaRepository },
  ],
})
export class AuthModule {}
