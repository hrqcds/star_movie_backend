import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './context/user/user.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    RouterModule.register([{ path: '/api', module: UserModule }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
