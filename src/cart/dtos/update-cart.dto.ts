import { IsNumber } from 'class-validator';

export class UpdateCartDTO {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
