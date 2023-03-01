import { PaymentStatusEntity } from '../../payment-status/entities/payment-status.entity';
import { PaymentEntity } from '../entities/payment.entity';

export class ReturnPaymentDTO {
  id: number;
  statusId: number;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: PaymentStatusEntity;

  constructor(payment: PaymentEntity) {
    this.id = payment.id;
    this.statusId = payment.statusId;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.finalPrice;
    this.type = payment.type;
    this.paymentStatus = payment.paymentStatus;
  }
}
