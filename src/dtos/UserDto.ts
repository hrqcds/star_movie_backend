import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MinLength,
} from 'class-validator';

export abstract class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export abstract class UpdateUser {
  @IsOptional()
  name: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @MinLength(6)
  password: string;
}

export abstract class QueryUser {
  @IsNotEmpty()
  @IsNumberString()
  take: number;
  @IsNotEmpty()
  @IsNumberString()
  skip: number;
  @IsOptional()
  name?: string;
  @IsOptional()
  email?: string;
}

export abstract class AuthUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
