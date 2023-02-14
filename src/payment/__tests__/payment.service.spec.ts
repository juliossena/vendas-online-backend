import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import {
  createOrderCreditCardMock,
  createOrderPixMock,
} from '../../order/__mocks__/create-order.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { PaymentService } from '../payment.service';
import { paymentMock } from '../__mocks__/payment.mock';
import { paymentPixMock } from '../__mocks__/payment-pix.mock';
import { PaymentPixEntity } from '../entities/payment-pix.entity';
import { PaymentCreditCardEntity } from '../entities/payment-credit-card.entity';
import { paymentCreditCardMock } from '../__mocks__/payment-credit-card.mock';
import { BadRequestException } from '@nestjs/common';
import { cartProductMock } from '../../cart-product/__mocks__/cart-product.mock';
import { PaymentType } from '../../payment-status/enums/payment-type.enum';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: Repository<PaymentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(PaymentEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(paymentMock),
          },
        },
        PaymentService,
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<Repository<PaymentEntity>>(
      getRepositoryToken(PaymentEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(paymentRepository).toBeDefined();
  });

  it('should save payment pix in DB', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');
    const payment = await service.createPayment(
      createOrderPixMock,
      [productMock],
      cartMock,
    );

    const savePayment: PaymentPixEntity = spy.mock
      .calls[0][0] as PaymentPixEntity;

    expect(payment).toEqual(paymentMock);
    expect(savePayment.code).toEqual(paymentPixMock.code);
    expect(savePayment.datePayment).toEqual(paymentPixMock.datePayment);
  });

  it('should save payment credit card in DB', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');
    const payment = await service.createPayment(
      createOrderCreditCardMock,
      [productMock],
      cartMock,
    );

    const savePayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    expect(payment).toEqual(paymentMock);
    expect(savePayment.amountPayments).toEqual(
      paymentCreditCardMock.amountPayments,
    );
  });

  it('should return exception in not send data', async () => {
    expect(
      service.createPayment(
        {
          addressId: createOrderCreditCardMock.addressId,
        },
        [productMock],
        cartMock,
      ),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should return final price 0 in cartProduct undefined', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');
    await service.createPayment(
      createOrderCreditCardMock,
      [productMock],
      cartMock,
    );

    const savePayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    expect(savePayment.finalPrice).toEqual(0);
  });

  it('should return final price send cartProduct', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');
    await service.createPayment(createOrderCreditCardMock, [productMock], {
      ...cartMock,
      cartProduct: [cartProductMock],
    });

    const savePayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    expect(savePayment.finalPrice).toEqual(186420.5);
  });

  it('should return all data in save payment', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');
    await service.createPayment(createOrderCreditCardMock, [productMock], {
      ...cartMock,
      cartProduct: [cartProductMock],
    });

    const savePayment: PaymentCreditCardEntity = spy.mock
      .calls[0][0] as PaymentCreditCardEntity;

    const paymentCreditCard: PaymentCreditCardEntity =
      new PaymentCreditCardEntity(
        PaymentType.Done,
        186420.5,
        0,
        186420.5,
        createOrderCreditCardMock,
      );

    expect(savePayment).toEqual(paymentCreditCard);
  });
});
