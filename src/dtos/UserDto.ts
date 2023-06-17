import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export abstract class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export abstract class UpdateUser {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export abstract class QueryUser {
  @IsNotEmpty()
  take: number;
  @IsNotEmpty()
  skip: number;
  @IsOptional()
  name?: string;
  @IsOptional()
  email?: string;
}
