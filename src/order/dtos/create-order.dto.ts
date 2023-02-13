import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsNumber()
  addressId: number;

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
