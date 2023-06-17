import { IsNotEmpty, IsNumberString } from 'class-validator';

export abstract class CreateMovieRequest {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsNumberString()
  note: number;
  @IsNotEmpty()
  userId: string;
}
export abstract class CreateMovie {
  title: string;
  description: string;
  note: number;
  img_url: string;
  userId: string;
}

export abstract class CreateMovieResponse {
  id: string;
  title: string;
  note: number;
  img_url: string;
  description: string;
}
