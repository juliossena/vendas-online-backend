import { IsString } from 'class-validator';

export class UpdateCategory {
  @IsString()
  name: string;
}
