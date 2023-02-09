import { IsNumber } from 'class-validator';

export class InsertCartDTO {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
