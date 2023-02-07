import { IsString } from 'class-validator';

export class CreateCategory {
  @IsString()
  name: string;
}
