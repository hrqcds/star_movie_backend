import { IsNotEmpty, MinLength } from 'class-validator';

export abstract class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export abstract class UpdateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export abstract class QueryUserDto {
  take: number;
  skip: number;
  name: string;
  email: string;
}
