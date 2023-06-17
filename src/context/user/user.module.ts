import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IUserRepository } from 'src/repositories/IUserRepository';
import { UserPrismaRepository } from 'src/repositories/implementations/UserPrismaRepository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    { provide: IUserRepository, useClass: UserPrismaRepository },
  ],
})
export class UserModule {}
