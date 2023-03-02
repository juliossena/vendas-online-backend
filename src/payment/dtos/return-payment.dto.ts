import { ReturnPaymentStatus } from '../../payment-status/dtos/return-payment-status.dto';
import { PaymentEntity } from '../entities/payment.entity';

export class ReturnPaymentDTO {
  id: number;
  statusId: number;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: ReturnPaymentStatus;

  constructor(payment: PaymentEntity) {
    this.id = payment.id;
    this.statusId = payment.statusId;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.finalPrice;
    this.type = payment.type;
    this.paymentStatus = payment.paymentStatus
      ? new ReturnPaymentStatus(payment.paymentStatus)
      : undefined;
  }
}
