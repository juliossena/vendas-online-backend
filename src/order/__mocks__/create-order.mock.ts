import { paymentPixMock } from '../../payment/__mocks__/payment-pix.mock';
import { addressMock } from '../../address/__mocks__/address.mock';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { paymentCreditCardMock } from '../../payment/__mocks__/payment-credit-card.mock';

export const createOrderPixMock: CreateOrderDTO = {
  addressId: addressMock.id,
  codePix: paymentPixMock.code,
  datePayment: '2020-01-01',
};

export const createOrderCreditCardMock: CreateOrderDTO = {
  addressId: addressMock.id,
  amountPayments: paymentCreditCardMock.amountPayments,
};
