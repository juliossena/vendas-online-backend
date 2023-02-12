import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment-status.service';

@Module({
  providers: [PaymentStatusService],
})
export class PaymentStatusModule {}
