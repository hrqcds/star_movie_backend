import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './context/user/user.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './context/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddleware } from './middleware/JwtMiddleware';
import { JwtService } from '@nestjs/jwt';
import { MovieModule } from './context/movie/movie.module';
import { PostModule } from './context/post/post.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MovieModule,
    PostModule,
    RouterModule.register([
      { path: '/api', module: UserModule },
      { path: '/api', module: MovieModule },
      { path: '/api', module: PostModule },
    ]),
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
