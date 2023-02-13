import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsOptional()
  @IsNumber()
  amountPayments?: number;

  @IsOptional()
  @IsString()
  codePix?: string;

  @IsOptional()
  @IsString()
  datePayment?: string;
}
