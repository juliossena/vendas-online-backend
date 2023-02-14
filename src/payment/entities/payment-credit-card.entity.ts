import { CreateOrderDTO } from '../../order/dtos/create-order.dto';
import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
  @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDTO: CreateOrderDTO,
  ) {
    super(statusId, price, discount, finalPrice);
    this.amountPayments = createOrderDTO?.amountPayments || 0;
  }
}
