import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './context/user/user.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './context/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddleware } from './middleware/JwtMiddleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RouterModule.register([{ path: '/api', module: UserModule }]),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('api');
  }
}
