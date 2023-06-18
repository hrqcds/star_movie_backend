import { IsNotEmpty, IsNumber } from 'class-validator';

export abstract class CreatePost {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  user_name: string;
  @IsNotEmpty()
  moviesId: string;
  @IsNotEmpty()
  @IsNumber()
  note: number;
}
